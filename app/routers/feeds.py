from fastapi import APIRouter, Depends, Query, Request
from typing import List, Literal
from app.auth.jwt_bearer import JWTBearer
from app.core.decorators import log_time_taken
from app.data_validators.schemas.response_schemas.feeds_schema import FeedsOutputModel, InteractivePlotDataModel
from app.services.feeds_service import get_feed_plots, get_feeds_by_batteries, get_feeds_by_filters, get_feeds_module
from app.data_validators.example_responses.feeds_response import feed_by_batteries_data_response, feeds_by_filters_data_response, feeds_by_module_data_response, feed_plot_data_response

battery_feeds_api_router = APIRouter(prefix="/v1/feeds", tags=['Feeds'], dependencies=[Depends(JWTBearer())])


@battery_feeds_api_router.get("/", responses=feeds_by_module_data_response, deprecated=True)  # type: ignore
@log_time_taken
async def fetch_feeds_by_module(request: Request, module: str = Query(description="Safety or Health or Operational or Warranty"),
                                from_date: str = Query(None, description="Format : yyyy-mm-dd"),
                                to_date: str = Query(None, description="Format : yyyy-mm-dd"),
                                page: int = Query(1, description="Page number(Greater than 0)", gt=0),
                                page_size: int = Query(10, description="Items per page(Greater than 0)", gt=0)
                                ):
    eid = request.session.get("eid")
    feeds_documents = get_feeds_module(module, eid, from_date, to_date, page, page_size)
    return feeds_documents


@battery_feeds_api_router.get("/batteries/", deprecated=True, responses=feed_by_batteries_data_response)  # type: ignore
@log_time_taken
async def fetch_feeds_by_batteries(request: Request, module: str = Query(description="Safety or Health or Operational or Warranty"),
                                   batteries: List[str] = Query(None),
                                   from_date: str = Query(None, description="Format : yyyy-mm-dd"),
                                   to_date: str = Query(None, description="Format : yyyy-mm-dd"),
                                   page: int = Query(1, description="Page number(Greater than 0)", gt=0),
                                   page_size: int = Query(10, description="Items per page(Greater than 0)", gt=0)
                                   ):
    eid = request.session.get("eid")
    feeds_documents = get_feeds_by_batteries(module, batteries, eid, from_date, to_date, page, page_size)
    return feeds_documents


@battery_feeds_api_router.get("/filters", responses=feeds_by_filters_data_response)  # type: ignore
@log_time_taken
async def fetch_all_feeds(request: Request,
                          module: Literal["safety", "health", "operational", "warranty", "all"],
                          from_date: str = Query(None, description="Format : yyyy-mm-dd"),
                          to_date: str = Query(None, description="Format : yyyy-mm-dd"),
                          batteries: str = Query(None),
                          categories: str = Query(None),
                          tags: str = Query(None),
                          page: int = Query(1, description="Page number(Greater than 0)", gt=0),
                          page_size: int = Query(5, description="Items per page(Greater than 0)", gt=0)
                          ) -> List[FeedsOutputModel]:
    eid = request.session.get("eid")
    feeds_documents = get_feeds_by_filters(eid, module, batteries, from_date, to_date, tags, categories, page, page_size)
    return feeds_documents


@battery_feeds_api_router.get("/interactive-plots", responses=feed_plot_data_response)  # type: ignore
@log_time_taken
async def fetch_feed_plots(feed_id: str) -> InteractivePlotDataModel:
    feed_plots = get_feed_plots(feed_id)
    return feed_plots
