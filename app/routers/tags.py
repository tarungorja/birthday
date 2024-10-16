from typing import List
from fastapi import APIRouter, Depends
from app.auth.jwt_bearer import JWTBearer
from app.core.decorators import log_time_taken
from app.data_validators.schemas.response_schemas.common_schemas import TagsModel
from app.services.tags_service import get_all_tags_db
from app.data_validators.example_responses.tags_response import tags_data_response

tags_api_router = APIRouter(prefix="/v1/tags", tags=['Tags'], dependencies=[Depends(JWTBearer())])


@tags_api_router.get("", responses=tags_data_response)  # type: ignore
@log_time_taken
async def fetch_all_tags() -> List[TagsModel]:
    return get_all_tags_db()
