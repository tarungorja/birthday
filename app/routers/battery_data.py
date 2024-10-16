from typing import List
from fastapi import APIRouter, Depends, Query, Request
from app.core.decorators import log_time_taken
from app.data_validators.schemas.response_schemas.batteries_schemas import BatteryAlertsInput, BatteryAlertsOutput, BatteryMetadataOutput, BatteryModelsOutput, BatterySearchModel, NewBatteryAlertsInput, Specifications
from app.services.battery_data_service import get_all_batteries_metadata, get_battery_metadata, push_new_battery_alerts_codes_info, get_searched_batteries_info, get_battery_models_info, get_battery_alerts_info, update_battery_alerts_info
from app.data_validators.example_responses.battery_response import battery_metadata_response, battery_search_data_response, battery_models_data_response, battery_alerts_data_response, new_battery_alerts_data_response
from app.auth.jwt_bearer import JWTBearer
battery_info_api_router = APIRouter(prefix="/v1/batteries", tags=['Batteries'], dependencies=[Depends(JWTBearer())])


@battery_info_api_router.get("/metadata", summary="Get Battery/Batteries Metadata", responses=battery_metadata_response)  # type: ignore
@log_time_taken
async def get_all_devices_metadata(request: Request, battery_uid: str = Query(None),
                                   page: int = Query(1, description="Page number(Greater than 0)", gt=0),
                                   page_size: int = Query(10, description="Items per page(Greater than 0)", gt=0)) -> List[BatteryMetadataOutput]:
    eid = request.session.get("eid")
    if (battery_uid):
        battery_metadata = get_battery_metadata(eid, battery_uid)
        return battery_metadata
    else:
        metadata_documents = get_all_batteries_metadata(eid, page, page_size)
        return metadata_documents


@battery_info_api_router.get("/search", responses=battery_search_data_response)  # type: ignore
@log_time_taken
async def get_searched_devices_metadata(request: Request, search: str = Query(min_length=3, description="Should have more than 3 characters"),
                                        page: int = Query(1, description="Page number(Greater than 0)", gt=0),
                                        page_size: int = Query(10, description="Items per page(Greater than 0)", gt=0)) -> List[BatterySearchModel]:
    eid = request.session.get("eid")
    metadata_docs = get_searched_batteries_info(eid, search, page, page_size)
    return metadata_docs


@battery_info_api_router.get("/models", deprecated=True, responses=battery_models_data_response)  # type: ignore
@log_time_taken
async def get_battery_models_data(model_no: str) -> BatteryModelsOutput:
    battery_models = get_battery_models_info(model_no)
    return battery_models


@battery_info_api_router.get("/alerts", deprecated=True, responses=battery_alerts_data_response)  # type: ignore
@log_time_taken
async def get_battery_alerts(revision: int = Query(None, description="revision(Greater than or equal to 0)", ge=0),
                             code: str = Query(regex="^[sf]\d{3}$", description='Format: s001 or f001')) -> List[BatteryAlertsOutput]:
    battery_alerts = get_battery_alerts_info(revision, code)
    return battery_alerts


@battery_info_api_router.post("/update-alerts", deprecated=True, responses=new_battery_alerts_data_response)  # type: ignore
@log_time_taken
async def update_battery_alerts_using_code(alert: BatteryAlertsInput,
                                           code: str = Query(regex="^[sf]\d{3}$", description='Format: s001 or f001')) -> BatteryAlertsOutput:
    updated_battery_alerts = update_battery_alerts_info(alert,  code)
    return updated_battery_alerts


@battery_info_api_router.post("/push-alerts", deprecated=True, responses=new_battery_alerts_data_response)  # type: ignore
@log_time_taken
async def push_new_battery_alerts(alert: NewBatteryAlertsInput) -> BatteryAlertsOutput:
    new_battery_alerts = push_new_battery_alerts_codes_info(alert)
    return new_battery_alerts
