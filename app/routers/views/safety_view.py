from fastapi import APIRouter, Depends,  Query
from app.auth.jwt_bearer import JWTBearer
from app.core.decorators import log_time_taken
from app.data_validators.schemas.response_schemas.safety_schemas import SafetyAggregatedMetricsSchema, SafetyAvgAggregatedMetricsSchema
from app.services.views.safety_view_service import get_aggregations, get_avg_aggregations, get_safety_incidents_data, get_hourly_temperature
from app.data_validators.example_responses.safety_responses import safety_view_aggregated_data_response, safety_view_avg_aggregated_data_response, safety_view_incidents_chart_data_response

safety_view_v1_api_router = APIRouter(prefix="/v1/views/safety", tags=['Views'], dependencies=[Depends(JWTBearer())])


@safety_view_v1_api_router.get('', responses=safety_view_aggregated_data_response)  # type: ignore
@log_time_taken
async def get_battery_safety_aggregations(battery_uid: str) -> SafetyAggregatedMetricsSchema:
    safety_aggregated_metrics = await get_aggregations(battery_uid)
    return safety_aggregated_metrics


@safety_view_v1_api_router.get('/avg-aggregations', responses=safety_view_avg_aggregated_data_response)  # type: ignore
@log_time_taken
async def get_battery_safety_avg_aggregations(battery_uid: str,
                                              from_date: str = Query(description="Format : yyyy-mm-dd"),
                                              to_date: str = Query(description="Format : yyyy-mm-dd")) -> SafetyAvgAggregatedMetricsSchema:
    safety_aggregated_metrics = await get_avg_aggregations(battery_uid, from_date, to_date)
    return safety_aggregated_metrics


@safety_view_v1_api_router.get('/safety-incidents', responses=safety_view_incidents_chart_data_response)  # type: ignore
@log_time_taken
async def get_safety_incidents(battery_uid: str):
    safety_incidents_metrics = get_safety_incidents_data(battery_uid)
    return safety_incidents_metrics


@safety_view_v1_api_router.get('/hourly-temperature-data')  # type: ignore
@log_time_taken
async def get_hourly_temperature_data(battery_uid: str):
    hourly_temp_metrics = get_hourly_temperature(battery_uid)
    return hourly_temp_metrics
