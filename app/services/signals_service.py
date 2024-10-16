from typing import List
from app.core.database import signals_instance, test_signals_instance, battery_models_instance, meta_data_instance
from datetime import timedelta
import pandas as pd
from app.data_validators.mappers.signal_mappers import transform_signal_event_data, transform_signal_tree_plot, transform_signals
from app.data_validators.schemas.response_schemas.signals_schemas import SignalTreeNode, SignalsEventDataSchema, SignalsSchema


def get_signals(eid, module, battery_uid,  from_date, to_date, page, page_size) -> List[SignalsSchema]:
    signals_docs = signals_instance.get_signals_module(eid, module, battery_uid, from_date, to_date, skip=(page - 1) * page_size, limit=page_size)
    return transform_signals(signals_docs)


def get_signal_event_data(signal_id) -> SignalsEventDataSchema:
    signal_event_data = signals_instance.get_signal_event_data_objectID(signal_id)
    signal_event_data['signal_date'] = (signal_event_data['signal_date'] + timedelta(hours=5, minutes=30)).strftime("%Y-%m-%d")
    df = pd.DataFrame(signal_event_data['event_data'])
    for event in signal_event_data['event_data']:
        event['event_time'] = (event['event_time'] + timedelta(hours=5, minutes=30))
        if event['battery_status'].lower() in ['stand by', 'idle']:
            event['battery_status'] = 0
        elif event['battery_status'].lower() == 'charging':
            event['battery_status'] = 1
        elif event['battery_status'].lower() == 'over-charging':
            event['battery_status'] = 2
        elif event['battery_status'].lower() == 'discharging':
            event['battery_status'] = -1
    signal_event_data['temperature_range'] = '{} - {}'.format(df['max_cell_temperature'].max(), df['max_cell_temperature'].min())
    signal_event_data['max_voltage'] = df['pack_voltage'].max()
    battery_status = df['battery_status'].unique().tolist()
    signal_event_data['battery_status'] = ''
    for status in battery_status:
        signal_event_data['battery_status'] = signal_event_data['battery_status']+status+', '
    if signal_event_data['battery_status'].endswith(', '):
        signal_event_data['battery_status'] = signal_event_data['battery_status'][:-2]
    max_current = df['current'].max()
    min_current = df['current'].min()
    signal_event_data['max_current'] = float(max_current)
    signal_event_data['min_current'] = float(min_current)
    return transform_signal_event_data(signal_event_data)


def signal_tree_format(node_signal):
    children = []
    if 'children' in node_signal:
        for children_id in node_signal['children']:
            children.append(signal_tree_format(test_signals_instance.get_signal_id(children_id)))
    return {
        "id": str(node_signal['_id']),
        "name": node_signal['event_details']['title'],
        "attributes": {
            "Date": (node_signal['signal_date'] + timedelta(hours=5, minutes=30)),
            "Description": node_signal['event_details']['description'],
        },
        "children": children
    }


def get_signal_tree_data(eid, bat_uid, from_date, to_date, sort) -> List[SignalTreeNode]:
    sort_order = 1 if sort == 'asc' else -1
    node_signals = test_signals_instance.get_node_signals_bat_uid(eid, bat_uid, from_date, to_date, sort_order)
    tree_plot_data = []
    for node_signal in node_signals:
        tree_plot_data.append(signal_tree_format(node_signal))
    return transform_signal_tree_plot(tree_plot_data)


def get_signal_tree_data_with_signal_id(eid, signal_id, bat_uid):
    signal = test_signals_instance.get_node_signal_of_signal(signal_id, eid, bat_uid)
    if signal is None:
        return []
    if 'level' in signal and signal['level'] != 'node' and signal['_id'] != signal_id:
        get_signal_tree_data_with_signal_id(eid, signal['_id'], bat_uid)
    # elif signal is not None and signal['level'] == 'node' :
    #     return [signal_tree_format(signal)]
    else:
        return [signal_tree_format(signal)]
