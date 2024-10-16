from fastapi import Request, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.auth.jwt_handler import decodeJWT


class JWTBearer(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super(JWTBearer, self).__init__(auto_error=auto_error)

    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super(JWTBearer, self).__call__(request)
        if credentials:
            if not credentials.scheme == "Bearer":
                raise HTTPException(status_code=401, detail="Invalid authentication scheme.")
            if not self.verify_jwt(request, credentials.credentials):
                raise HTTPException(status_code=401, detail="Invalid token or expired token.")
            return credentials.credentials
        else:
            raise HTTPException(status_code=401, detail="Invalid authorization code.")

    def verify_jwt(self, request: Request, jwtoken: str):
        payload = decodeJWT(jwtoken)
        if not payload:
            raise HTTPException(status_code=401, detail="Invalid Authorization token!!")
        eid = payload["eid"]
        request.session["eid"] = eid
        return True
