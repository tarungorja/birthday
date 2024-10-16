from datetime import datetime
from app.core.database import meta_data_instance, daily_summaries_instance, aggregated_metrics_instance, usage_recommendation_instance, signals_instance
from app.data_validators.mappers.views_mappers.warranty_view_mappers import warranty_aggregations_mapper, warranty_avg_aggregations_mapper, warranty_bms_soh_mapper, warranty_equivalent_cycles_mapper
from app.data_validators.schemas.response_schemas.warranty_schemas import WarrantyAggregatedMetricsSchema, WarrantyAvgAggregatedMetricsSchema, WarrantyBmsSoh, WarrantyEquivalentCycles
from dateutil.relativedelta import relativedelta

async def get_aggregations(eid, battery_uid: str) -> WarrantyAggregatedMetricsSchema:
    warranty_aggregated_metrics = meta_data_instance.get_warranty_metadata_bat_uid(eid, battery_uid)
    aggregated_metrics = aggregated_metrics_instance.find_one_bat_uid(battery_uid)
    warranty_alerts_count = await signals_instance.get_alerts_count_by_module(battery_uid, 'warranty')
    usage_recommendations = usage_recommendation_instance.fetch_usage_recommendations('warranty', battery_uid, 4)
    if (warranty_aggregated_metrics['warranty_end_date'] > datetime.now()):
        warranty_aggregated_metrics['status'] = 'Active'
    else:
        warranty_aggregated_metrics['status'] = 'Expired'
    warranty_aggregated_metrics['warranty_life_span'] = relativedelta(warranty_aggregated_metrics['warranty_end_date'],warranty_aggregated_metrics['warranty_start_date']).years
    warranty_aggregated_metrics['calender_life'] = relativedelta(datetime.now(),warranty_aggregated_metrics['warranty_start_date']).years
    warranty_aggregated_metrics['warranty_start_date'] = warranty_aggregated_metrics['warranty_start_date'].strftime('%d/%m/%Y')
    warranty_aggregated_metrics['warranty_end_date'] = warranty_aggregated_metrics['warranty_end_date'].strftime('%d/%m/%Y')
    return warranty_aggregations_mapper(warranty_aggregated_metrics, aggregated_metrics, usage_recommendations, warranty_alerts_count)


def get_avg_aggregations(battery_uid: str, from_date: str, to_date: str) -> WarrantyAvgAggregatedMetricsSchema:
    warranty_aggregated_metrics = daily_summaries_instance.get_warranty_avg_aggregations(battery_uid, from_date, to_date)
    return warranty_avg_aggregations_mapper(warranty_aggregated_metrics[0])


def get_bms_soh(eid, battery_uid: str) -> WarrantyBmsSoh:
    warranty_bms_soh_data = daily_summaries_instance.get_bms_soh(battery_uid)
    warranty_meta_data = meta_data_instance.get_warranty_metadata_bat_uid(eid, battery_uid)
    return warranty_bms_soh_mapper(warranty_bms_soh_data, warranty_meta_data)


def get_warranty_equivalent_cycles(eid, battery_uid: str) -> WarrantyEquivalentCycles:
    warranty_equivalent_cycles_data = aggregated_metrics_instance.get_warranty_equivalent_cycles(battery_uid)
    warranty_meta_data = meta_data_instance.get_warranty_metadata_bat_uid(eid, battery_uid)
    return warranty_equivalent_cycles_mapper(warranty_equivalent_cycles_data, warranty_meta_data)
