# This file is responsible for signing , encoding , decoding and returning JWTS
import time
import jwt
from fastapi import HTTPException
from decouple import config
from app.data_validators.mappers.user_login_mapper import login_response_mapper
from app.data_validators.schemas.request_schemas.user import UserLoginSchema
from app.data_validators.schemas.response_schemas.login_response import loginResponseModel, AccessTokenModel
from app.core.database import users_instance


JWT_SECRET = config("JWT_SECRET")
JWT_ALGORITHM = config("JWT_ALGORITHM")


def check_user_db(user: UserLoginSchema):
    user_details = users_instance.check_user(user)
    return user_details

# function used for signing the JWT string


def signJWT(user: UserLoginSchema) -> loginResponseModel:
    user_exist, eid = check_user_db(user)
    if not user_exist:
        raise HTTPException(status_code=401, detail="Invalid login credentials!!")

    user_email = user.email
    payload = {
        "user_email": user_email,
        "eid": eid,
        "exp": time.time() + 3600
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)  # type: ignore

    return login_response_mapper(user_email, token)


def decodeJWT(token: str) -> dict:
    try:
        return jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])  # type: ignore
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired!")
    except jwt.InvalidSignatureError:
        raise HTTPException(status_code=401, detail="Invalid token signature!")
    except jwt.PyJWTError:  # General exception for other JWT-related errors
        raise HTTPException(status_code=401, detail="Invalid Authorization token!!")
