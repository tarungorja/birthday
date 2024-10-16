from typing import List
from fastapi import APIRouter, Depends
from app.auth.jwt_bearer import JWTBearer
from app.core.decorators import log_time_taken
from app.data_validators.schemas.response_schemas.common_schemas import CategoryModel
from app.services.categories_service import get_all_categories_db
from app.data_validators.example_responses.category_response import category_data_response
categories_api_router = APIRouter(prefix="/v1/categories", tags=['Categories'], dependencies=[Depends(JWTBearer())])


@categories_api_router.get("", responses=category_data_response)  # type: ignore
@log_time_taken
async def fetch_all_categories() -> List[CategoryModel]:
    return get_all_categories_db()
