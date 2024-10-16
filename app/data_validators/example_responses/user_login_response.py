user_login_response_data = {
    "user": "visionpacks@ril.com",
    "access_token": {
        "scheme": "Bearer",
        "credentials": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoidmlzaW9ucGFja3NAcmlsLmNvbSIsImVpZCI6ImJtcyIsImV4cCI6MTcyMzMwMzcwNi4zMjQ0MDQyfQ.gxyH7x3Od807wIR5_9ZCw1rTlou2FP7y0DsP30m8fdQ"
    }
}

user_login_response = {
    200: {
        "description": "Item requested by email and password",
        "content": {
            "application/json": {
                "example": user_login_response_data
            }
        }
    },
    401: {
        "description": "Unauthorized",
        "content": {
            "application/json": {
                "example": {
                    "detail": "Invalid login credentials!!"
                }
            }
        }
    }
}
