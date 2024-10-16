from app.data_validators.schemas.response_schemas.health_schemas import DataPointModel, GraphSeriesModel
from app.data_validators.schemas.response_schemas.warranty_schemas import BatteryUsageRecommendations, WarrantyAvgAggregatedMetricsSchema,  WarrantyAggregatedMetricsSchema, WarrantyBmsSoh, WarrantyEquivalentCycles
from app.utils.view_utils import set_default_no_data, set_year_units


def warranty_aggregations_mapper(warranty_aggregated_metrics, aggregated_metrics, usage_recommendations, warranty_alerts_count) -> WarrantyAggregatedMetricsSchema:   
    transformed_warranty_view_aggregated_metrics = WarrantyAggregatedMetricsSchema(
        warranty_start_date=set_default_no_data(warranty_aggregated_metrics['warranty_start_date']),
        warranty_end_date=set_default_no_data(warranty_aggregated_metrics['warranty_end_date']),
        status=set_default_no_data(warranty_aggregated_metrics['status']),
        soc_min_per=set_default_no_data(aggregated_metrics['soc_per']['min'], '%'),
        soc_max_per=set_default_no_data(aggregated_metrics['soc_per']['max'], '%'),
        bms_soh=set_default_no_data(aggregated_metrics['bms_soh'], '%'),
        equivalent_cycles_count=set_default_no_data(aggregated_metrics['equivalent_cycles_count']),
        charging_crate_min=set_default_no_data(aggregated_metrics['charging_rate_crate']['min']),
        charging_crate_max=set_default_no_data(aggregated_metrics['charging_rate_crate']['max']),
        charging_crate_avg=set_default_no_data(aggregated_metrics['charging_rate_crate']['avg']),
        discharging_crate_min=set_default_no_data(aggregated_metrics['discharging_rate_crate']['min'], absolute=1),
        discharging_crate_max=set_default_no_data(aggregated_metrics['discharging_rate_crate']['max'], absolute=1),
        discharging_crate_avg=set_default_no_data(aggregated_metrics['discharging_rate_crate']['avg'], absolute=1),
        total_warranty_alerts=set_default_no_data(warranty_alerts_count),
        total_warranty_life_span=set_default_no_data(warranty_aggregated_metrics['warranty_life_span'], set_year_units(warranty_aggregated_metrics['warranty_life_span'])),
        calender_life=set_default_no_data(warranty_aggregated_metrics['calender_life'], set_year_units(warranty_aggregated_metrics['calender_life'])),

        total_expected_life_span='4.5 years',
        charging_temp_range='42 °C - 45°C',
        discharging_temp_range='35 °C - 40 °C',
        charging_crate='40C',
        discharging_crate='40C',
        cell_voltage_diff='30C',
        battery_usage_recommendations=[BatteryUsageRecommendations(title=records['title'], recommendation=records['recommendation']) for records in usage_recommendations]
    )
    return transformed_warranty_view_aggregated_metrics


def warranty_avg_aggregations_mapper(warranty_aggregated_metrics) -> WarrantyAvgAggregatedMetricsSchema:
    transformed_warranty_avg_aggregated_metrics = WarrantyAvgAggregatedMetricsSchema(
        avg_SoH=set_default_no_data(warranty_aggregated_metrics['avg_bms_soh'], '%'),
        avg_min_soc=set_default_no_data(warranty_aggregated_metrics['avg_min_soc'], '%'),
        avg_max_soc=set_default_no_data(warranty_aggregated_metrics['avg_max_soc'], '%'),
        avg_min_C_rate_charging=set_default_no_data(warranty_aggregated_metrics['avg_min_C_rate_charging'], 'C'),
        avg_max_C_rate_charging=set_default_no_data(warranty_aggregated_metrics['avg_max_C_rate_charging'], 'C'),
        avg_min_C_rate_discharging=set_default_no_data(warranty_aggregated_metrics['avg_min_C_rate_discharging'], 'C', absolute=1),
        avg_max_C_rate_discharging=set_default_no_data(warranty_aggregated_metrics['avg_max_C_rate_discharging'], 'C', absolute=1),
        avg_equivalent_cycles=set_default_no_data(warranty_aggregated_metrics['avg_equivalent_cycles']),
        charging_temp_range='40°C - 45°C',  # not there in the DB
        discharging_temp_range='35°C - 40°C',  # not there in the DB
        avg_cell_voltage_diff='30 mV',  # not there in the DB
    )
    return transformed_warranty_avg_aggregated_metrics


def warranty_bms_soh_mapper(warranty_bms_soh_metrics, warranty_meta_data) -> WarrantyBmsSoh:
    warranty_graphs_response = []
    graph_values = []
    for data in warranty_bms_soh_metrics:
        x_value = data['summary_date'].strftime('%Y-%m-%d')
        y_value = data['bms_soh']
        graph_values.append(DataPointModel(x=x_value, y=y_value))
    warranty_graphs_response.append(GraphSeriesModel(name='bms_soh', data=graph_values))
    return WarrantyBmsSoh(
        warranty_bms_soh_graph_series=warranty_graphs_response,
        warranty_start_date=warranty_meta_data['warranty_start_date'].timestamp()*1000,
        warranty_end_date=warranty_meta_data['warranty_end_date'].timestamp()*1000
    )


def warranty_equivalent_cycles_mapper(warranty_equivalent_cycles_data, warranty_meta_data) -> WarrantyEquivalentCycles:
    warranty_graphs_response = []
    graph_values = []
    for data in warranty_equivalent_cycles_data:
        x_value = data['summary_date'].strftime('%Y-%m-%d')
        y_value = data['equivalent_cycles_count']
        graph_values.append(DataPointModel(x=x_value, y=y_value))
    warranty_graphs_response.append(GraphSeriesModel(name='Equivalent Cycles', data=graph_values))
    return WarrantyEquivalentCycles(
        warranty_equivalent_cycles_count_series=warranty_graphs_response,
        warranty_start_date=warranty_meta_data['warranty_start_date'].timestamp()*1000,
        warranty_end_date=warranty_meta_data['warranty_end_date'].timestamp()*1000
    )
