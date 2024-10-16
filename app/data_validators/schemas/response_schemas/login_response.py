from pydantic import BaseModel


class AccessTokenModel(BaseModel):
    scheme: str
    credentials: str


class loginResponseModel(BaseModel):
    user: str
    access_token: AccessTokenModel
