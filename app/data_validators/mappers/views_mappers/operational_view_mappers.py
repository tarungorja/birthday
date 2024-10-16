from typing import List
from app.data_validators.schemas.response_schemas.health_schemas import DataPointModel
from app.data_validators.schemas.response_schemas.operational_schemas import OperationalAggregations, OperationalAvgAggregations,  OperationalSocRange, OperationalThresholds, OperationalValues, ChargingCyclesSeries, DischargingCyclesSeries
from app.data_validators.schemas.response_schemas.warranty_schemas import BatteryUsageRecommendations
from app.utils.view_utils import division_utils, set_default_no_data


def operational_aggregations_mapper(operational_aggregated_metrics, usage_recommendations) -> OperationalAggregations:
    return OperationalAggregations(

        operational_values=OperationalValues(
            charge_cycle_count=set_default_no_data(operational_aggregated_metrics['charge_cycle_count']),
            discharge_cycle_count=set_default_no_data(operational_aggregated_metrics['discharge_cycle_count']),
            cumulative_energy_consumed_kwh=set_default_no_data(operational_aggregated_metrics['cumulative_energy_consumed_kwh'], ' kWh'),
            cumulative_energy_discharged_kwh=set_default_no_data(operational_aggregated_metrics['cumulative_energy_discharged_kwh'], ' kWh'),
            total_charge_duration_hrs=set_default_no_data(operational_aggregated_metrics['total_charge_duration_hrs'], ' Hrs'),
            total_discharge_duration_hrs=set_default_no_data(operational_aggregated_metrics['total_discharge_duration_hrs'], ' Hrs'),
        ),

        # not there in DB
        operational_thresholds=OperationalThresholds(
            best_Crate_to_use='0.3 - 1C',
            best_SOC_limits='20 - 80%',
            temperature_limits='25°C-40°C'
        ),
        stress_factors=['Longer resting hours',
                        'Over Charging 5 times',
                        'High temperature detected for 6 hrs',
                        'Higher C-Rate detected',
                        '0.9V cell voltage difference'
                        ],
        battery_usage_recommendations=[BatteryUsageRecommendations(title=records['title'], recommendation=records['recommendation']) for records in usage_recommendations]
    )


def operational_avg_aggregations_mapper(oldest_doc, latest_doc) -> OperationalAvgAggregations:
    return OperationalAvgAggregations(
        charge_cycle_count=set_default_no_data(latest_doc['charge_cycle_count'] - oldest_doc['charge_cycle_count']),
        discharge_cycle_count=set_default_no_data(latest_doc['discharge_cycle_count'] - oldest_doc['discharge_cycle_count']),
        cumulative_energy_consumed_kwh=set_default_no_data(latest_doc['cumulative_energy_consumed_kwh'] - oldest_doc['cumulative_energy_consumed_kwh'], ' kWh'),
        cumulative_energy_discharged_kwh=set_default_no_data(latest_doc['cumulative_energy_discharged_kwh'] - oldest_doc['cumulative_energy_discharged_kwh'], ' kWh'),
        total_charge_duration_hrs=set_default_no_data(latest_doc['total_charge_duration_hrs'] - oldest_doc['total_charge_duration_hrs'], ' Hrs'),
        total_discharge_duration_hrs=set_default_no_data(latest_doc['total_discharge_duration_hrs'] - oldest_doc['total_discharge_duration_hrs'], ' Hrs')
    )


def operational_soc_range_mapper(operational_soc_range_graph_data) -> List[OperationalSocRange]:
    soc_range_data = []
    for data in operational_soc_range_graph_data:
        soc_range_data.append(OperationalSocRange(
            x=data['summary_date'].strftime('%Y-%m-%d'),
            y=data['duration_hrs'],
            start_soc=data['start_soc'],
            end_soc=data['end_soc']
        ))
    return soc_range_data


def operational_valued_soc_mapper(operational_valued_soc_graph_data) -> List[DataPointModel]:
    valued_soc_data = []
    for data in operational_valued_soc_graph_data:
        soc_utilized = data['start_soc']-data['end_soc']
        if soc_utilized == 0:
            soc_utilized = 1
        backup_time = round(division_utils(data['duration_hrs']*60, soc_utilized), 2)
        valued_soc_data.append(DataPointModel(x=data['summary_date'].strftime('%Y-%m-%d'), y=backup_time))
    return valued_soc_data


def operational_cycles_mapper(operational_charging_cycles_data) -> List[ChargingCyclesSeries]:
    soc_above_80_series = {'name': 'End_SoC', 'data': []}
    soc_below_80_series = {'name': 'End_SoC', 'data': []}
    for data in operational_charging_cycles_data:
        if data['end_soc'] > 80:
            soc_above_80_series['data'].append([data['summary_date'].timestamp()*1000, data['end_soc']])
        else:
            soc_below_80_series['data'].append([data['summary_date'].timestamp()*1000, data['end_soc']])
    return [soc_below_80_series, soc_above_80_series]
