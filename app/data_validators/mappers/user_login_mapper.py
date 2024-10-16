from app.data_validators.schemas.response_schemas.login_response import AccessTokenModel, loginResponseModel


def login_response_mapper(user_email: str, token: str) -> loginResponseModel:
    return loginResponseModel(
        user=user_email,
        access_token=AccessTokenModel(
            scheme='Bearer',
            credentials=token
        )
    )
