from typing import List
from app.data_validators.schemas.response_schemas.health_schemas import BatteryDegradationCapacity, GraphSeriesModel, DataPointModel, HealthAvgAggregationsSchema, HealthAggregationsSchema, TargetPerformanceSchema, OperatedLimits, HealthBMSSoH, BatteryDegradationCycles
from app.utils.view_utils import division_utils, set_default_no_data, get_indian_season
from app.core.database import battery_models_instance, meta_data_instance


def bms_soh_mapper(health_bms_soh_data) -> List[DataPointModel]:
    health_bms_soh_metrics = []
    for data in health_bms_soh_data:
        x_value = data['summary_date'].strftime('%Y-%m-%d')
        y_value = data['bms_soh']
        health_bms_soh_metrics.append(DataPointModel(x=x_value, y=y_value))
    return health_bms_soh_metrics


def transform_health_graphs(actual_values, predicted_values, releative_soh) -> HealthBMSSoH:
    health_graphs_response = []
    health_graphs_response.append(GraphSeriesModel(name='Actual', data=actual_values))
    health_graphs_response.append(GraphSeriesModel(name='Predicted', data=predicted_values))
    return HealthBMSSoH(health_soh_graph_data=health_graphs_response, soh_vs_last_month=releative_soh)


def capacity_metrics_mapper(bms_soh_data, capacity_ah) -> List[DataPointModel]:
    health_capacity_metrics = []
    for data in bms_soh_data:
        x_value = data['summary_date'].strftime('%Y-%m-%d')
        y_value = data['bms_soh']*capacity_ah/100
        health_capacity_metrics.append(DataPointModel(x=x_value, y=y_value))
    return health_capacity_metrics


def transform_degradation_capacity(actual_values, predicted_values, latest_capacity_ah, capacity_vs_last_month) -> BatteryDegradationCapacity:
    health_graphs_response = []
    health_graphs_response.append(GraphSeriesModel(name='Actual', data=actual_values))
    health_graphs_response.append(GraphSeriesModel(name='Predicted', data=predicted_values))
    return BatteryDegradationCapacity(health_capacity_graph_data=health_graphs_response, latest_capacity_ah=set_default_no_data(latest_capacity_ah, units='Ah'), capacity_vs_last_month=capacity_vs_last_month)


def cycles_metrics_mapper(battery_degradation_cycles_data) -> List[DataPointModel]:
    battery_degradation_cycles = []
    for data in battery_degradation_cycles_data:
        x_value = data['summary_date'].strftime('%Y-%m-%d')
        y_value = data['equivalent_cycles_count']
        battery_degradation_cycles.append(DataPointModel(x=x_value, y=y_value))
    return battery_degradation_cycles


def transform_degradation_cycles(battery_degradation_cycles_data, cycles_vs_last_month) -> BatteryDegradationCycles:
    health_graphs_response = []
    health_graphs_response.append(GraphSeriesModel(name='Battery Degradation Cycles', data=battery_degradation_cycles_data))
    return BatteryDegradationCycles(health_cycles_graph_data=health_graphs_response, cycles_vs_last_month=cycles_vs_last_month)


def operated_limits_mapper(operated_limits) -> OperatedLimits:
    transformed_operated_limits = OperatedLimits(
        pack_voltage_range=set_default_no_data(operated_limits['pack_voltage_range']),
        temperature_range=set_default_no_data(operated_limits['temperature_range']),
        soc_range=set_default_no_data(operated_limits['soc_range']),
        cell_voltage_range=set_default_no_data(operated_limits['cell_voltage_range']),
    )
    return transformed_operated_limits


def target_performance_mapper(target_performance) -> TargetPerformanceSchema:
    target_performance_metrics = TargetPerformanceSchema(
        min_temp=set_default_no_data(target_performance.get('min_storage_temp', None), '°C'),
        max_temp=set_default_no_data(target_performance.get('max_storage_temp', None), '°C'),
        avg_temp=set_default_no_data(target_performance.get('avg_storage_temp', None), '°C'),
        min_soc=set_default_no_data(target_performance.get('min_soc',  None), '%'),
        max_soc=set_default_no_data(target_performance.get('max_soc',  None), '%'),
        charging_avg_crate=set_default_no_data(target_performance.get('avg_charging_crate', None), "C"),
        charging_min_crate=set_default_no_data(target_performance.get('min_charging_crate', None), "C"),
        charging_max_crate=set_default_no_data(target_performance.get('max_charging_crate', None), "C"),
        discharging_min_crate=set_default_no_data(target_performance.get('min_discharging_crate', None), "C", absolute=1),
        discharging_max_crate=set_default_no_data(target_performance.get('max_discharging_crate', None), "C", absolute=1),
        discharging_avg_crate=set_default_no_data(target_performance.get('avg_discharging_crate', None), "C", absolute=1),
    )
    return target_performance_metrics


def health_aggregations_mapper(eid, health_aggregated_metrics) -> HealthAggregationsSchema:
    model = meta_data_instance.get_metadata_bat_uid(eid, health_aggregated_metrics['bat_uid'])[0]['model']
    nominal_values = battery_models_instance.get_metric_value(model, ['capacity_ah', 'nominal_voltage_volts'])
    efficiency = division_utils(health_aggregated_metrics['cumulative_energy_discharged_kwh'], health_aggregated_metrics['cumulative_energy_consumed_kwh']*100)
    if efficiency > 90:
        efficiency_meter = 'High'
    elif 80 <= efficiency <= 90:
        efficiency_meter = 'Medium'
    else:
        efficiency_meter = 'Low'

    transformed_health_aggregated_metrics = HealthAggregationsSchema(
        bat_uid=set_default_no_data(health_aggregated_metrics['bat_uid']),
        bms_soh=set_default_no_data(health_aggregated_metrics['bms_soh'], '%'),
        cumulative_energy_discharged_kwh=set_default_no_data(health_aggregated_metrics['cumulative_energy_discharged_kwh'], ' kWh'),
        equivalent_cycles_count=set_default_no_data(round(health_aggregated_metrics['equivalent_cycles_count']), ),
        pack_voltage_min_volts=set_default_no_data(health_aggregated_metrics['pack_voltage_volts']['min'], 'V'),
        pack_voltage_max_volts=set_default_no_data(health_aggregated_metrics['pack_voltage_volts']['max'], 'V'),
        temperature_max_celsius=set_default_no_data(health_aggregated_metrics['temperature_celsius']['max'], '°C'),
        temperature_min_celsius=set_default_no_data(health_aggregated_metrics['temperature_celsius']['min'], '°C'),
        temperature_avg_celsius=set_default_no_data(health_aggregated_metrics['temperature_celsius']['avg'], '°C'),
        soc_min_per=set_default_no_data(health_aggregated_metrics['soc_per']['min'], '%'),
        soc_max_per=set_default_no_data(health_aggregated_metrics['soc_per']['max'], '%'),
        cell_voltage_min_mv=set_default_no_data(health_aggregated_metrics['cell_voltage_mv']['min'], ' mv'),
        cell_voltage_max_mv=set_default_no_data(health_aggregated_metrics['cell_voltage_mv']['max'], ' mv'),
        discharging_min_crate=set_default_no_data(health_aggregated_metrics['discharging_rate_crate']['min'], 'C', absolute=1),
        discharging_max_crate=set_default_no_data(health_aggregated_metrics['discharging_rate_crate']['max'], 'C', absolute=1),
        discharging_avg_crate=set_default_no_data(health_aggregated_metrics['discharging_rate_crate']['avg'], 'C', absolute=1),
        charging_min_crate=set_default_no_data(health_aggregated_metrics['charging_rate_crate']['min'], 'C'),
        charging_max_crate=set_default_no_data(health_aggregated_metrics['charging_rate_crate']['max'], 'C'),
        charging_avg_crate=set_default_no_data(health_aggregated_metrics['charging_rate_crate']['avg'], 'C'),
        season=set_default_no_data(get_indian_season()),
        avg_consumption=set_default_no_data(health_aggregated_metrics['avg_consumption'], 'kW', round_off=2),
        milage=set_default_no_data(division_utils(nominal_values['capacity_ah']*nominal_values['nominal_voltage_volts'], (health_aggregated_metrics['avg_consumption']*1000))),
        range=set_default_no_data(health_aggregated_metrics['avg_consumption']*health_aggregated_metrics['bms_soh']),
        remaining_energy=set_default_no_data(nominal_values['nominal_voltage_volts']*nominal_values['capacity_ah']*health_aggregated_metrics['bms_soh']/1000, 'kWh'),
        cell_status=set_default_no_data(health_aggregated_metrics['cell_status']),
        efficiency=set_default_no_data(efficiency_meter),
        temperature_range=set_default_no_data(health_aggregated_metrics['min_temperature'] , '°C') + ' - ' + set_default_no_data(health_aggregated_metrics['max_temperature'] , '°C') ,
        variation_of='+/-2%',
        criticality='Low',
        safety_condition='Safe',
    )
    return transformed_health_aggregated_metrics


def health_avg_aggregations_mapper(battery_uid, avg_aggregated_metrics) -> HealthAvgAggregationsSchema:
    transformed_health_avg_aggregated_metrics = HealthAvgAggregationsSchema(
        battery_uid=battery_uid,
        SoH_drop=set_default_no_data(avg_aggregated_metrics['bms_soh_to_date']-avg_aggregated_metrics['bms_soh_from_date'], '%'),
        avg_discharging_hrs=set_default_no_data(avg_aggregated_metrics['avg_discharging_hrs'], units=' hrs', absolute=1),
        avg_charging_hrs=set_default_no_data(avg_aggregated_metrics['avg_charging_hrs'], ' hrs'),
        avg_standby_hrs=set_default_no_data(avg_aggregated_metrics['avg_standby_hrs'], ' hrs'),
        avg_min_soc=set_default_no_data(avg_aggregated_metrics['avg_soc_per_min']),
        avg_max_soc=set_default_no_data(avg_aggregated_metrics['avg_soc_per_max']),
        avg_min_temp=set_default_no_data(avg_aggregated_metrics['avg_temperature_min'], '°C'),
        avg_max_temp=set_default_no_data(avg_aggregated_metrics['avg_temperature_max'], '°C'),
        avg_avg_temp=set_default_no_data(avg_aggregated_metrics['avg_temperature_avg'], '°C'),
        avg_min_C_rate_charging=set_default_no_data(avg_aggregated_metrics['avg_C_rate_min_charging']),
        avg_max_C_rate_charging=set_default_no_data(avg_aggregated_metrics['avg_C_rate_max_charging']),
        avg_avg_C_rate_charging=set_default_no_data(avg_aggregated_metrics['avg_C_rate_avg_charging']),
        avg_min_C_rate_discharging=set_default_no_data(avg_aggregated_metrics['avg_C_rate_min_discharging'], absolute=1),
        avg_max_C_rate_discharging=set_default_no_data(avg_aggregated_metrics['avg_C_rate_max_discharging'], absolute=1),
        avg_avg_C_rate_discharging=set_default_no_data(avg_aggregated_metrics['avg_C_rate_avg_discharging'], absolute=1),

        # below metrics are not there in the DB
        SoC_start_charging='0',
        SoC_end_charging='0',
        SoH_drop_last_10Kwh='0',
        SoH_drop_last_100Kwh=' 0',
    )
    return transformed_health_avg_aggregated_metrics
