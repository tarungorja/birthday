from app.core.database import daily_summaries_instance, aggregated_metrics_instance, usage_recommendation_instance, signals_instance
from app.data_validators.mappers.views_mappers.safety_view_mappers import safety_aggregations_mapper, safety_avg_aggregations_mapper, safety_incidents_mapper, hourly_temp_mapper
from app.data_validators.schemas.response_schemas.safety_schemas import SafetyAggregatedMetricsSchema, SafetyAvgAggregatedMetricsSchema, SafetyIncidentsDataSchema, HourlyTempDataSchema, SafetyIncidentsSchema
from pprint import pprint

async def get_aggregations(battery_uid: str) -> SafetyAggregatedMetricsSchema:
    safety_aggregated_metrics =  aggregated_metrics_instance.find_one_bat_uid(battery_uid)
    over_temp_incidents_count = await signals_instance.get_over_temperature_incidents_count(battery_uid)
    over_charging_incidents_count = await signals_instance.get_over_charging_incidents_count(battery_uid)
    safety_incidents_count = await signals_instance.get_alerts_count_by_module(battery_uid, module='safety')
    recent_temp_range = daily_summaries_instance.get_battery_operated_temperature(battery_uid)
    safety_aggregated_metrics['max_temperature'] = recent_temp_range['max_temperature']
    safety_aggregated_metrics['min_temperature'] = recent_temp_range['min_temperature']    
    usage_recommendations =  usage_recommendation_instance.fetch_usage_recommendations('safety', battery_uid, 4)
    return safety_aggregations_mapper(safety_aggregated_metrics, usage_recommendations, over_charging_incidents_count, over_temp_incidents_count,safety_incidents_count)


async def get_avg_aggregations(battery_uid: str, from_date: str, to_date: str) -> SafetyAvgAggregatedMetricsSchema:
    safety_aggregated_metrics = daily_summaries_instance.get_safety_avg_aggregated_metrics(battery_uid, from_date, to_date) 
    over_temp_incidents_count = await signals_instance.get_over_temperature_incidents_count(battery_uid, from_date, to_date)
    over_charging_incidents_count = await signals_instance.get_over_charging_incidents_count(battery_uid, from_date, to_date)
    safety_incidents_count = await signals_instance.get_alerts_count_by_module(battery_uid,'safety', from_date, to_date)
    return safety_avg_aggregations_mapper(safety_aggregated_metrics[0], over_temp_incidents_count, over_charging_incidents_count, safety_incidents_count)


def get_safety_incidents_data(battery_uid: str) -> SafetyIncidentsSchema:
    signal_date_limits = daily_summaries_instance.get_battery_operated_range(battery_uid)
    safety_incidents_graph_data = signals_instance.get_safety_signal_incidents_graph_data(battery_uid)
    return safety_incidents_mapper(safety_incidents_graph_data, signal_date_limits)


def get_hourly_temperature(battery_uid: str) -> HourlyTempDataSchema:
    hourly_temperature_metrics = daily_summaries_instance.get_hourly_temperature_data(battery_uid)
    return hourly_temp_mapper(hourly_temperature_metrics)
