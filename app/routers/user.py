from fastapi import APIRouter
from app.auth.jwt_handler import signJWT
from app.core.decorators import log_time_taken
from app.data_validators.schemas.request_schemas.user import UserLoginSchema
from app.data_validators.schemas.response_schemas.login_response import loginResponseModel
from app.data_validators.example_responses.user_login_response import user_login_response


user_api_router = APIRouter(prefix="/v1/user", tags=['User'])


@user_api_router.post("/login", responses=user_login_response)  # type: ignore
@log_time_taken
async def login_and_generate_token(user: UserLoginSchema) -> loginResponseModel:
    return signJWT(user)
