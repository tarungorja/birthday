from typing import List
from fastapi import APIRouter, Depends, Query
from app.auth.jwt_bearer import JWTBearer
from app.core.decorators import log_time_taken
from app.data_validators.schemas.response_schemas.health_schemas import DataPointModel
from app.data_validators.schemas.response_schemas.operational_schemas import OperationalAggregations, OperationalAvgAggregations, OperationalSocRange,  ChargingCyclesSeries
from app.services.views.operational_view_service import get_aggregations, get_avg_aggregations, get_operational_charging_cycles, get_soc_range_metrics, get_operational_valued_soc_metrics, get_operational_discharging_cycles
from app.data_validators.example_responses.operational_responses import operational_view_aggregated_data_response, operational_view_avg_aggregated_data_response, operational_view_soc_range_graph_data_response, operational_view_valued_soc_graph_data_response, operational_view_charging_cycles_graph_data_response, operational_view_discharging_cycles_graph_data_response

operational_view_v1_api_router = APIRouter(prefix="/v1/views/operational", tags=['Views'], dependencies=[Depends(JWTBearer())])


@operational_view_v1_api_router.get('', responses=operational_view_aggregated_data_response)  # type: ignore
@log_time_taken
async def get_operational_aggregations(battery_uid: str) -> OperationalAggregations:
    operational_aggregated_metrics = get_aggregations(battery_uid)
    return operational_aggregated_metrics


@operational_view_v1_api_router.get('/avg-aggregations', responses=operational_view_avg_aggregated_data_response)  # type: ignore
@log_time_taken
async def get_operational_avg_aggregations(battery_uid: str,
                                           from_date: str = Query(description="Format : yyyy-mm-dd"),
                                           to_date: str = Query(description="Format : yyyy-mm-dd")) -> OperationalAvgAggregations:
    operational_avg_aggregated_metrics = get_avg_aggregations(battery_uid, from_date, to_date)
    return operational_avg_aggregated_metrics


@operational_view_v1_api_router.get('/soc_range_graph_data', responses=operational_view_soc_range_graph_data_response)  # type: ignore
@log_time_taken
async def get_operational_soc_range_graph_data(battery_uid: str) -> List[OperationalSocRange]:
    operational_soc_range_graph_data = get_soc_range_metrics(battery_uid)
    return operational_soc_range_graph_data


@operational_view_v1_api_router.get('/valued_soc_graph_data', responses=operational_view_valued_soc_graph_data_response)  # type: ignore
@log_time_taken
async def get_operational_valued_soc_graph_data(battery_uid: str) -> List[DataPointModel]:
    operational_valued_soc_graph_data = get_operational_valued_soc_metrics(battery_uid)
    return operational_valued_soc_graph_data


@operational_view_v1_api_router.get('/charging_cycles_graph_data', responses=operational_view_charging_cycles_graph_data_response)  # type: ignore
@log_time_taken
async def get_operational_charging_cycles_graph_data(battery_uid: str) -> List[ChargingCyclesSeries]:
    operational_charging_cycles_graph_data = get_operational_charging_cycles(battery_uid)
    return operational_charging_cycles_graph_data


@operational_view_v1_api_router.get('/discharging_cycles_graph_data', responses=operational_view_discharging_cycles_graph_data_response)  # type: ignore
@log_time_taken
async def get_operational_discharging_cycles_graph_data(battery_uid: str) -> List[ChargingCyclesSeries]:
    operational_discharging_cycles_graph_data = get_operational_discharging_cycles(battery_uid)
    return operational_discharging_cycles_graph_data
