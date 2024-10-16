from typing import List
import pandas as pd
from app.core.database import aggregated_metrics_instance, daily_summaries_instance, battery_models_instance, meta_data_instance
from app.data_validators.mappers.views_mappers.health_view_mappers import health_aggregations_mapper, health_avg_aggregations_mapper, operated_limits_mapper, \
    target_performance_mapper, bms_soh_mapper, transform_degradation_capacity, transform_health_graphs, capacity_metrics_mapper, transform_degradation_cycles, cycles_metrics_mapper
from app.data_validators.schemas.response_schemas.health_schemas import BatteryDegradationCapacity, DataPointModel, GraphSeriesModel, HealthAggregationsOutput, HealthAvgAggregationsSchema, HealthBMSSoH, BatteryDegradationCycles
from app.utils.model_utils import predict_test_data_offline_soh
from app.utils.view_utils import is_within_range, get_capacity_of_last_month, get_soh_vs_last_month, get_cycles_vs_last_month, set_default_no_data


def get_bms_soh(battery_uid: str) -> HealthBMSSoH:
    bms_soh_data = daily_summaries_instance.get_bms_soh(battery_uid)
    bms_soh_data_metrics = bms_soh_mapper(bms_soh_data)
    actual_values = bms_soh_data_metrics
    if (len(bms_soh_data) > 30):
        soh_df = pd.DataFrame(bms_soh_data)
        soh_df['summary_date'] = soh_df['summary_date'].apply(lambda x: x.strftime('%Y-%m-%d'))
        future_df = predict_test_data_offline_soh(soh_df)
        predicted_values = [DataPointModel(x=row['summary_date'], y=row['predicted_soh']) for index, row in future_df.iterrows()]
        latest_soh = actual_values[-1]
        soh_vs_last_month = get_soh_vs_last_month(battery_uid, latest_soh.y)
        return transform_health_graphs(actual_values, predicted_values,soh_vs_last_month)
    return transform_health_graphs(actual_values, [],0.0)


def get_degradation_capacity(battery_uid: str) -> BatteryDegradationCapacity:
    capacity_ah = meta_data_instance.fetch_capacity_ah(battery_uid)
    bms_soh_data = daily_summaries_instance.get_bms_soh(battery_uid)
    soh_df = pd.DataFrame(bms_soh_data)
    soh_df['summary_date'] = soh_df['summary_date'].apply(lambda x: x.strftime('%Y-%m-%d'))
    future_soh_df = predict_test_data_offline_soh(soh_df)
    battery_capacity_data_metrics = capacity_metrics_mapper(bms_soh_data, capacity_ah)
    future_soh_df = future_soh_df.rename(columns={'predicted_soh': 'bms_soh'})
    battery_capacity_predictions = capacity_metrics_mapper(future_soh_df.to_dict(orient='records'), capacity_ah)
    actual_values = battery_capacity_data_metrics
    latest_capacity_ah = actual_values[-1]
    capacity_vs_last_month = get_capacity_of_last_month(battery_uid, latest_capacity_ah.y, capacity_ah)
    predicted_values = battery_capacity_predictions
    return transform_degradation_capacity(actual_values, predicted_values, int(latest_capacity_ah.y), capacity_vs_last_month)


def get_degradation_cycles(battery_uid: str) -> BatteryDegradationCycles:
    battery_degradation_cycles_data = aggregated_metrics_instance.fetch_battery_degradation_cycles(battery_uid)
    battery_degradation_cycles_metrics = cycles_metrics_mapper(battery_degradation_cycles_data)
    if(battery_degradation_cycles_metrics):
        print(battery_degradation_cycles_metrics[-1])
        current_cycles_count = battery_degradation_cycles_metrics[-1].y
        cycles_vs_last_month = get_cycles_vs_last_month(battery_uid,current_cycles_count)
        return transform_degradation_cycles(battery_degradation_cycles_metrics, cycles_vs_last_month)
    return transform_degradation_cycles(battery_degradation_cycles_metrics, cycles_vs_last_month)

def get_aggregations(eid, battery_uid: str) -> HealthAggregationsOutput:
    health_aggregated_metrics = aggregated_metrics_instance.find_one_bat_uid(battery_uid)
    recent_temp_range = daily_summaries_instance.get_battery_operated_temperature(battery_uid)
    battery_model = meta_data_instance.get_battery_model_bat_UID(battery_uid)
    operated_limits = {
        'pack_voltage_range': '-',
        'temperature_range': '-',
        'soc_range': '-',
        'cell_voltage_range': '-',
    }
    battery_models_metrics = battery_models_instance.find_one(model=battery_model['model'])
    temp_min = min(battery_models_metrics['specifications']['min_charging_temp'], battery_models_metrics['specifications']['min_discharging_temp'])
    temp_max = max(battery_models_metrics['specifications']['max_charging_temp'], battery_models_metrics['specifications']['max_discharging_temp'])
    min_soc = battery_models_metrics['specifications']['min_soc']
    max_soc = battery_models_metrics['specifications']['max_soc']
    min_cell_voltage = battery_models_metrics['specifications'].get('min_cell_voltage', None)
    max_cell_voltage = battery_models_metrics['specifications'].get('max_cell_voltage', None)
    min_pack_voltage = battery_models_metrics['specifications']['min_pack_voltage']
    max_pack_voltage = battery_models_metrics['specifications']['max_pack_voltage']

    if (is_within_range(temp_min, temp_max, health_aggregated_metrics['temperature_celsius']['min'], health_aggregated_metrics['temperature_celsius']['max'])):
        operated_limits['temperature_range'] = 'With in Limits'
    else:
        operated_limits['temperature_range'] = 'Beyond Limits'
    if (is_within_range(min_soc, max_soc, health_aggregated_metrics['soc_per']['min'], health_aggregated_metrics['soc_per']['max'])):
        operated_limits['soc_range'] = 'With in Limits'
    else:
        operated_limits['soc_range'] = 'Beyond Limits'
    if(min_cell_voltage and max_cell_voltage):
        if (is_within_range(min_cell_voltage, max_cell_voltage, health_aggregated_metrics['cell_voltage_mv']['min'], health_aggregated_metrics['cell_voltage_mv']['max'])):
            operated_limits['cell_voltage_range'] = 'With in Limits'
        else:
            operated_limits['cell_voltage_range'] = 'Beyond Limits'
    if (is_within_range(min_pack_voltage, max_pack_voltage, health_aggregated_metrics['pack_voltage_volts']['min'], health_aggregated_metrics['pack_voltage_volts']['max'])):
        operated_limits['pack_voltage_range'] = 'With in Limits'
    else:
        operated_limits['pack_voltage_range'] = 'Beyond Limits'

    target_performance_metrics = battery_models_metrics['specifications']
    health_aggregated_metrics['max_temperature'] = recent_temp_range['max_temperature']
    health_aggregated_metrics['min_temperature'] = recent_temp_range['min_temperature']    

    return HealthAggregationsOutput(health_aggregated_metrics=health_aggregations_mapper(eid, health_aggregated_metrics), operated_limits=operated_limits_mapper(operated_limits), target_performance_metrics=target_performance_mapper(target_performance_metrics))


def get_avg_aggregations(battery_uid: str, from_date: str, to_date: str) -> HealthAvgAggregationsSchema:
    health_avg_aggregated_metrics = daily_summaries_instance.fetch_health_avg_aggregations(battery_uid, from_date, to_date)
    return health_avg_aggregations_mapper(battery_uid, health_avg_aggregated_metrics)
