
from typing import List, Literal, Optional
from fastapi import APIRouter, Depends, Query, Request
from app.auth.jwt_bearer import JWTBearer
from app.core.decorators import log_time_taken
from app.data_validators.schemas.response_schemas.signals_schemas import SignalTreeNode, SignalsEventDataSchema, SignalsSchema
from app.services.signals_service import get_signal_event_data, get_signal_tree_data_with_signal_id, get_signals, get_signal_tree_data
from app.data_validators.example_responses.signals_response import signals_data_response, signal_event_data_response, signal_tree_data_response

battery_signals_api_router = APIRouter(prefix="/v1/signals", tags=['Signals'], dependencies=[Depends(JWTBearer())])


@battery_signals_api_router.get("", responses=signals_data_response)  # type: ignore
@log_time_taken
async def fetch_all_signals(request: Request, module: Optional[Literal["safety", "health", "operational", "warranty"]] = None,
                            battery_uid: str = Query(None),
                            from_date: str = Query(None, description="Format : yyyy-mm-dd"),
                            to_date: str = Query(None, description="Format : yyyy-mm-dd"),
                            page: int = Query(1, description="Page number(Greater than 0)", gt=0),
                            page_size: int = Query(10, description="Items per page(Greater than 0)", gt=0)
                            ) -> List[SignalsSchema]:
    eid = request.session.get("eid")
    return get_signals(eid, module, battery_uid, from_date, to_date, page, page_size)


@battery_signals_api_router.get('/data', responses=signal_event_data_response)  # type: ignore
@log_time_taken
async def fetch_signal_event_data_by_signal_id(signal_id: str) -> SignalsEventDataSchema:
    return get_signal_event_data(signal_id)


@battery_signals_api_router.get('/tree-plot/data', responses=signal_tree_data_response)  # type: ignore
@log_time_taken
async def fetch_signal_tree_plot_by_signal_id(request: Request, battery_uid: str, signal_id: str,
                                              sort: Literal["asc", "desc"] = Query('asc'),
                                              from_date: str = Query(None, description="Format : yyyy-mm-dd"),
                                              to_date: str = Query(None, description="Format : yyyy-mm-dd")) -> List[SignalTreeNode]:
    eid = request.session.get("eid")
    if from_date is not None and to_date is not None:
        return get_signal_tree_data(eid, battery_uid, from_date, to_date, sort)
    else:
        return get_signal_tree_data_with_signal_id(eid, signal_id, battery_uid)
