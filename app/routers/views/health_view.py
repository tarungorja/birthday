from typing import List
from fastapi import APIRouter, Depends, Query, Request
import pandas as pd
from app.auth.jwt_bearer import JWTBearer
from app.core.decorators import log_time_taken
from app.data_validators.schemas.response_schemas.health_schemas import BatteryDegradationCapacity, GraphSeriesModel, HealthAggregationsOutput, HealthAvgAggregationsSchema, HealthBMSSoH, BatteryDegradationCycles
from app.services.views.health_view_service import get_aggregations, get_avg_aggregations, get_degradation_capacity, get_bms_soh, get_degradation_cycles
from app.data_validators.example_responses.health_responses import health_view_aggregated_data_response,  health_view_avg_aggregated_data_response, health_soh_graph_data_response,health_capacity_graph_data_response, helath_cycles_graph_data_response

health_view_v1_api_router = APIRouter(prefix="/v1/views/health", tags=['Views'], dependencies=[Depends(JWTBearer())])


@health_view_v1_api_router.get('', responses=health_view_aggregated_data_response)  # type: ignore
@log_time_taken
async def get_battery_health_aggregations(request: Request, battery_uid: str) -> HealthAggregationsOutput:
    eid = request.session.get("eid")
    return get_aggregations(eid, battery_uid)


@health_view_v1_api_router.get('/avg-aggregations', responses=health_view_avg_aggregated_data_response)  # type: ignore
@log_time_taken
async def get_health_avg_aggregations(battery_uid: str,
                                      from_date: str = Query(description="Format : yyyy-mm-dd"),
                                      to_date: str = Query(description="Format : yyyy-mm-dd")) -> HealthAvgAggregationsSchema:
    health_avg_aggregated_metrics = get_avg_aggregations(battery_uid, from_date, to_date)
    return health_avg_aggregated_metrics


@health_view_v1_api_router.get("/bms_soh", summary='Get Battery SoH', responses=health_soh_graph_data_response)  # type: ignore
@log_time_taken
async def get_battery_health_soh(battery_uid: str) -> HealthBMSSoH:
    BmS_Soh = get_bms_soh(battery_uid)
    return BmS_Soh


@health_view_v1_api_router.get("/battery_degradation_capacity", summary='Get Battery Degradation Capacity Graph Data', responses=health_capacity_graph_data_response)  # type: ignore
@log_time_taken
async def get_battery_degradation_capacity(battery_uid: str) -> BatteryDegradationCapacity:
    batter_degradation = get_degradation_capacity(battery_uid)
    return batter_degradation


@health_view_v1_api_router.get("/battery_degradation_cycles", summary='Get Battery Degradation Cycles Graph Data', responses=helath_cycles_graph_data_response)  # type: ignore
@log_time_taken
async def get_battery_degradation_cycles(battery_uid: str) -> BatteryDegradationCycles:
    batter_degradation = get_degradation_cycles(battery_uid)
    return batter_degradation
