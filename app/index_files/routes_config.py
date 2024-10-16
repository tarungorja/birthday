from fastapi import FastAPI
from app.routers.user import user_api_router
from app.routers.release_info import release_info_api_router
from app.routers.battery_data import battery_info_api_router
from app.routers.feeds import battery_feeds_api_router
from app.routers.auc import battery_auc_api_router
from app.routers.signals import battery_signals_api_router
from app.routers.views.health_view import health_view_v1_api_router
from app.routers.views.operational_view import operational_view_v1_api_router
from app.routers.views.safety_view import safety_view_v1_api_router
from app.routers.views.warranty_view import warranty_view_v1_api_router
from app.routers.categories import categories_api_router
from app.routers.tags import tags_api_router
from app.routers.release_notes import release_notes_router


def include_routers(app: FastAPI):
    app.include_router(user_api_router)
    app.include_router(release_info_api_router)
    app.include_router(battery_info_api_router)
    app.include_router(battery_feeds_api_router)
    app.include_router(battery_auc_api_router)
    app.include_router(battery_signals_api_router)
    app.include_router(health_view_v1_api_router)
    app.include_router(operational_view_v1_api_router)
    app.include_router(safety_view_v1_api_router)
    app.include_router(warranty_view_v1_api_router)
    app.include_router(categories_api_router)
    app.include_router(tags_api_router)
    app.include_router(release_notes_router)
