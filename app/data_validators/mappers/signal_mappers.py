import datetime
import math
from typing import List

import pandas as pd
from app.data_validators.schemas.response_schemas.signals_schemas import Attributes, EventDataEntry, EventDetails, SignalTreeNode, SignalsEventDataSchema, SignalsSchema


def transform_signals(signals) -> List[SignalsSchema]:
    signals_response = []
    for signal_doc in signals:
        signal_doc['_id'] = str(signal_doc['_id'])
        signals_response.append(
            SignalsSchema(
                id=signal_doc['_id'],
                bat_uid=signal_doc['bat_uid'],
                bat_name=signal_doc['bat_name'],
                category=signal_doc['category'],
                category_id=signal_doc['category_id'],
                signal_date=signal_doc['signal_date'],
                severity=signal_doc['severity'],
                event_details=signal_doc['event_details'],
                module=signal_doc['module'],
                eid=signal_doc['eid'],
                level=signal_doc['level']
            )
        )
    return signals_response


def transform_signal_event_data(signal_event_data) :
    transformed_signal_event_data = SignalsEventDataSchema(
        bat_uid=signal_event_data['bat_uid'],
        bat_name=signal_event_data['bat_name'],
        category=signal_event_data['category'],
        category_id=signal_event_data['category_id'],
        signal_date=signal_event_data['signal_date'],
        severity=signal_event_data['severity'],
        event_details=EventDetails(
            title=signal_event_data['event_details']['title'],
            description=signal_event_data['event_details']['description']
        ),
        module=signal_event_data['module'],
        eid=signal_event_data['eid'],
        event_data = [
            EventDataEntry(
                current=entry.get('current'),
                pack_voltage=entry.get('pack_voltage'),
                soC=entry.get('soC'),
                max_cell_temperature=entry.get('max_cell_temperature'),
                battery_status=entry.get('battery_status'),
                event_time=entry.get('event_time')
            )
            for entry in signal_event_data['event_data']
        ],
        level=signal_event_data['level'],
        temperature_range=signal_event_data['temperature_range'],
        max_voltage=signal_event_data['max_voltage'],
        battery_status=signal_event_data['battery_status'],
        max_current=signal_event_data['max_current'],
        min_current=signal_event_data['min_current']
    )
    return transformed_signal_event_data

def transform_signal_tree_plot(tree_plot_data) -> List[SignalTreeNode]:
    def transform_node(data: dict) -> SignalTreeNode:
        return SignalTreeNode(
            id=data['id'],
            name=data['name'],
            attributes=Attributes(
                Date=data['attributes']['Date'],
                Description=data['attributes']['Description']
            ),
            children=[transform_node(child) for child in data['children']]
        )

    return [transform_node(node) for node in tree_plot_data]
