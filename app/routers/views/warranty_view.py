import logging
from fastapi import APIRouter, Depends,  Query, Request
import pandas as pd
from app.auth.jwt_bearer import JWTBearer
from app.core.decorators import log_time_taken
from app.data_validators.schemas.response_schemas.warranty_schemas import WarrantyAggregatedMetricsSchema, WarrantyAvgAggregatedMetricsSchema, WarrantyBmsSoh, WarrantyEquivalentCycles
from app.services.views.warranty_view_service import get_aggregations, get_avg_aggregations, get_bms_soh, get_warranty_equivalent_cycles
from app.data_validators.example_responses.warranty_response import warranty_view_aggregated_data_response, warranty_view_avg_aggregated_data_response, warranty_bms_soh_response, warranty_equivalent_cycles_response

warranty_view_v1_api_router = APIRouter(prefix="/v1/views/warranty", tags=['Views'], dependencies=[Depends(JWTBearer())])


@warranty_view_v1_api_router.get('', responses=warranty_view_aggregated_data_response)  # type: ignore
@log_time_taken
async def get_battery_warranty_aggregated_metrics(request: Request, battery_uid: str) -> WarrantyAggregatedMetricsSchema:
    eid = request.session.get("eid")
    warranty_aggregated_metrics = await get_aggregations(eid, battery_uid)
    return warranty_aggregated_metrics


@warranty_view_v1_api_router.get('/avg-aggregations', responses=warranty_view_avg_aggregated_data_response)  # type: ignore
@log_time_taken
async def get_battery_warranty_avg_aggregated_metrics(battery_uid: str,
                                                      from_date: str = Query(description="Format : yyyy-mm-dd"),
                                                      to_date: str = Query(description="Format : yyyy-mm-dd")) -> WarrantyAvgAggregatedMetricsSchema:
    warranty_aggregated_metrics = get_avg_aggregations(battery_uid, from_date, to_date)
    return warranty_aggregated_metrics


@warranty_view_v1_api_router.get('/bms-soh', responses=warranty_bms_soh_response)  # type: ignore
@log_time_taken
async def get_battery_warranty_bms_soh_graph_data(request: Request, battery_uid: str) -> WarrantyBmsSoh:
    eid = request.session.get("eid")
    warranty_bms_soh_graph_data_metrics = get_bms_soh(eid, battery_uid)
    return warranty_bms_soh_graph_data_metrics


@warranty_view_v1_api_router.get('/equivalent-cycles-count', responses=warranty_equivalent_cycles_response)  # type: ignore
@log_time_taken
async def get_battery_equivalent_cycles_count_graph_data(request: Request, battery_uid: str) -> WarrantyEquivalentCycles:
    eid = request.session.get("eid")
    warranty_equivalent_cycles_count_graph_data_metrics = get_warranty_equivalent_cycles(eid, battery_uid)
    return warranty_equivalent_cycles_count_graph_data_metrics
