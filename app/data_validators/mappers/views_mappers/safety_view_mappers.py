from app.data_validators.schemas.response_schemas.safety_schemas import SafetyAggregatedMetricsSchema, SafetyAggregatedValuesSchema, SafetyAvgAggregatedMetricsSchema, SafetyIncidentsMetricsSchema, SafetyIncidentsDataSchema, HourlyTempDataSchema, HourlyTempMetricSchema, SafetyIncidentsSchema
from app.utils.view_utils import set_default_no_data, get_indian_season, division_utils
from typing import List
import numpy as np


def safety_aggregations_mapper(safety_aggregated_metrics, usage_recommedations, over_charging_incidents_count, over_temp_incidents_count,safety_incidents_count) -> SafetyAggregatedMetricsSchema:
    efficiency = division_utils(safety_aggregated_metrics['cumulative_energy_discharged_kwh'], safety_aggregated_metrics['cumulative_energy_consumed_kwh']*100)
    if efficiency > 90:
        efficiency_meter = 'High'
    elif 80 <= efficiency <= 90:
        efficiency_meter = 'Medium'
    else:
        efficiency_meter = 'Low'
    transformed_safety_aggregated_metrics = SafetyAggregatedMetricsSchema(
        temperature_celsius_min=set_default_no_data(safety_aggregated_metrics['temperature_celsius']['min'], '°C'),
        temperature_celsius_max=set_default_no_data(safety_aggregated_metrics['temperature_celsius']['max'], '°C'),
        cell_voltage_diff=set_default_no_data(safety_aggregated_metrics['cell_voltage_mv']['max'] - safety_aggregated_metrics['cell_voltage_mv']['min'], ' mV'),
        season=set_default_no_data(get_indian_season()),
        # not there in DB or yet to calculate
        avg_temp_deviation_charging='Up by 3°C',
        avg_temp_deviation_discharging='Up by 1°C',
        overcharging_incidents='25',
        safety_aggregated_values=SafetyAggregatedValuesSchema(
            operated_temp_range='30°C - 40°C',
            avg_cell_voltage_diff='4800 mV',
            over_temp_incidents=set_default_no_data(over_temp_incidents_count),
            over_charging_incidents=set_default_no_data(over_charging_incidents_count),
            bms_safety_alerts=set_default_no_data(safety_incidents_count),
        ),
        battery_usage_recommendations=usage_recommedations,
        temperature_range=set_default_no_data(safety_aggregated_metrics['min_temperature'], '°C') + ' - ' + set_default_no_data(safety_aggregated_metrics['max_temperature'], '°C'),
        cell_status=set_default_no_data(safety_aggregated_metrics['cell_status']),
        efficiency=efficiency_meter,
        criticality='Low',
        safety_condition='Safe',)

    return transformed_safety_aggregated_metrics


def safety_avg_aggregations_mapper(safety_avg_aggregated_metrics, over_temp_incidents_count, over_charging_incidents_count, safety_incidents_count) -> SafetyAvgAggregatedMetricsSchema:
    transformed_safety_avg_aggregated_metrics = SafetyAvgAggregatedMetricsSchema(
        operated_temp_range=set_default_no_data(safety_avg_aggregated_metrics['avg_temperature_min'], '°C') + ' - ' + set_default_no_data(safety_avg_aggregated_metrics['avg_temperature_max'], '°C'),
        avg_cell_voltage_diff=set_default_no_data(safety_avg_aggregated_metrics['avg_cell_voltage_max'] - safety_avg_aggregated_metrics['avg_cell_voltage_min'], ' mV'),
        # not there in DB or not yet calculated
        over_temp_incidents=set_default_no_data(over_temp_incidents_count),
        over_charging_incidents=set_default_no_data(over_charging_incidents_count),
        bms_safety_alerts=set_default_no_data(safety_incidents_count),
    )
    return transformed_safety_avg_aggregated_metrics


def safety_incidents_mapper(safety_incidents_graph_data, signal_date_limits) -> SafetyIncidentsSchema:
    safety_incidents_data = {'x': [], 'y': [], 'z': [], 'customdata': []}
    for data in safety_incidents_graph_data:
        safety_incidents_data_point = SafetyIncidentsMetricsSchema(
            x=data['signal_date'].strftime('%Y-%m-%d'),
            y=data['number_of_incidents'],
            z=data['number_of_incidents'],
            severity=data['severity'],
            signal_id=str(data['signal_id']),
            signal_title=data['signal_title']
        )
        safety_incidents_data['x'].append(safety_incidents_data_point.x)
        safety_incidents_data['y'].append(safety_incidents_data_point.y)
        safety_incidents_data['z'].append(safety_incidents_data_point.z)
        safety_incidents_data['customdata'].append([safety_incidents_data_point.signal_id,
                                                    safety_incidents_data_point.signal_title,
                                                    safety_incidents_data_point.severity])
    return SafetyIncidentsSchema(
        safety_incidents_chart_data=safety_incidents_data, 
        latest_date=signal_date_limits['battery_latest_date'].strftime('%Y-%m-%d'), 
        initial_date =signal_date_limits['battery_initial_date'].strftime('%Y-%m-%d'), 
    )


def hourly_temp_mapper(hourly_temperature_data) -> HourlyTempDataSchema:
    hourly_temp_data = {'x': [], 'y': ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'], 'z': []}
    for data in hourly_temperature_data:
        hourly_temp_data_point = HourlyTempMetricSchema(
            summary_date=data['summary_date'].strftime('%Y-%m-%d'),
            max_temperature_hourly=data['max_temperature_hourly']
        )
        hourly_temp_data['x'].append(hourly_temp_data_point.summary_date)
        hourly_temp_data['z'].append(hourly_temp_data_point.max_temperature_hourly)
    hourly_data_transpose = np.array(hourly_temp_data['z']).T
    hourly_temp_data['z'] = hourly_data_transpose.tolist()
    return hourly_temp_data
