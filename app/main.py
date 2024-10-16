from typing import Dict
from fastapi import FastAPI
from app.index_files.exception_config import add_exception_handlers
from app.index_files.middleware_config import add_middleware
from app.index_files.routes_config import include_routers
from app.config.log_config import configure_logging

app = FastAPI()
configure_logging()

add_middleware(app)
include_routers(app)
add_exception_handlers(app)


@app.get("/")
async def get_home_page() -> Dict[str, str]:
    return {
        "message": "This is the Battery-Analytics Saas"
    }
