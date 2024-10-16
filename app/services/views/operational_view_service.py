from typing import List
from app.core.database import aggregated_metrics_instance, daily_summaries_instance, usage_recommendation_instance
from app.data_validators.mappers.views_mappers.operational_view_mappers import operational_aggregations_mapper, operational_avg_aggregations_mapper, operational_cycles_mapper, operational_soc_range_mapper, operational_valued_soc_mapper
from app.data_validators.schemas.response_schemas.health_schemas import DataPointModel
from app.data_validators.schemas.response_schemas.operational_schemas import OperationalAggregations, OperationalAvgAggregations, OperationalSocRange, ChargingCyclesSeries


def get_aggregations(battery_uid: str) -> OperationalAggregations:
    operational_aggregated_metrics = aggregated_metrics_instance.find_one_bat_uid(battery_uid)
    usage_recommendations = usage_recommendation_instance.fetch_usage_recommendations('operational', battery_uid, 5)
    return operational_aggregations_mapper(operational_aggregated_metrics, usage_recommendations)


def get_avg_aggregations(battery_uid: str, from_date: str, to_date: str) -> OperationalAvgAggregations:
    operational_aggregated_metrics = aggregated_metrics_instance.get_operational_avg_aggregation_metrics(battery_uid, from_date, to_date)
    return operational_avg_aggregations_mapper(operational_aggregated_metrics[0], operational_aggregated_metrics[1])


def get_soc_range_metrics(battery_uid: str) -> List[OperationalSocRange]:
    operational_soc_range_graph_data = daily_summaries_instance.get_soc_range_metrics(battery_uid)
    return operational_soc_range_mapper(operational_soc_range_graph_data)


def get_operational_valued_soc_metrics(battery_uid: str) -> List[DataPointModel]:
    operational_valued_soc_graph_data = daily_summaries_instance.get_operational_valued_soc_metrics(battery_uid)
    return operational_valued_soc_mapper(operational_valued_soc_graph_data)


def get_operational_charging_cycles(battery_uid: str) -> List[ChargingCyclesSeries]:
    operational_charging_cycles_graph_data = daily_summaries_instance.get_operational_charging_cycles(battery_uid)
    return operational_cycles_mapper(operational_charging_cycles_graph_data)


def get_operational_discharging_cycles(battery_uid: str) -> List[ChargingCyclesSeries]:
    operational_discharging_cycles_graph_data = daily_summaries_instance.get_operational_discharging_cycles(battery_uid)
    return operational_cycles_mapper(operational_discharging_cycles_graph_data)
