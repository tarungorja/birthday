from datetime import datetime
from bson import ObjectId
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from starlette.middleware.sessions import SessionMiddleware
from app.core.database import meta_data_instance, auc_instance
import json


def detect_duplicates(pairs):
    seen = set()
    duplicates = []
    for key, value in pairs:
        if key in seen:
            duplicates.append(key)
        else:
            seen.add(key)
    return duplicates


def query_params_exceptions(query_param, param_value, errors_400: list, errors_404: list):
    # if query_param in ['module', 'categories', 'certificate_id', 'code',
    #                    'feed_id', 'model_no', 'revision', 'signal_id', 'sort', 'tags']:
    if not param_value:
        return query_param

    elif query_param == 'batteries':
        batteries_count = 0
        param_value = str(param_value).split(',')
        for battery in param_value:
            if battery:
                batteries_count += 1
        if batteries_count == 0:
            return query_param
        for battery in param_value:
            if not meta_data_instance.check_if_battery_exists_db(battery):
                errors_404.append(f"{battery} not found.")
                return

    elif query_param == 'battery_uid':
        if not meta_data_instance.check_if_battery_exists_db(param_value):
            errors_404.append(f"{param_value} not found.")
            return

    elif query_param == 'certificate_id':
        if not auc_instance.check_if_certificate_id_exists(param_value):
            errors_404.append(f"Certificate with the certificate_id not found.")

    elif query_param in {'from_date', 'to_date', 'release_date'}:
        try:
            datetime.strptime(param_value, '%Y-%m-%d')
        except:
            errors_400.append(f'{query_param} is not in the valid format: yyyy-mm-dd')
            return

    elif query_param in {'feed_id', 'signal_id'}:
        if not ObjectId.is_valid(param_value):
            errors_400.append(f"Invalid {query_param}.")
            return


def add_middleware(app: FastAPI):
    @app.middleware('http')
    async def check_params(request: Request, call_next):
        query_params = request.query_params
        from_date = query_params.get('from_date')
        to_date = query_params.get('to_date')

        missing_params = []
        errors_400 = []
        errors_404 = []

        try:
            # Checking for duplicate params exception
            duplicates = [key for key in query_params.keys() if len(query_params.getlist(key)) > 1]
            if duplicates:
                errors_400.append(f"Duplicate query parameters found: {', '.join(duplicates)}.")
            if (request.url.path == '/v1/user/login'):
                body = await request.body()
                body_duplicates = json.loads(body, object_pairs_hook=detect_duplicates)
                if body_duplicates:
                    errors_400.append(f"Duplicate parameters found in request body:{body_duplicates}")

            # Checking for missing params and param_value exceptions
            for query_param, param_value in query_params.items():
                missing_param = query_params_exceptions(query_param, param_value, errors_400, errors_404)
                if param_value != None and missing_param:
                    missing_params.append(missing_param)
            if (missing_params):
                errors_400.append(f"Missing required parameters: {missing_params}.")

            # Checking if the give date-range is crt or wrong
            if from_date and to_date:
                try:
                    start_date = datetime.strptime(from_date, '%Y-%m-%d')
                    end_date = datetime.strptime(to_date, '%Y-%m-%d')
                    if (start_date > end_date):
                        errors_400.append(f"from_date({from_date}) should be less than to_date({to_date}).")
                except:
                    pass
            if errors_400:
                raise HTTPException(status_code=400, detail=errors_400)
            if errors_404:
                raise HTTPException(status_code=404, detail=errors_404)
        except HTTPException as err:
            return JSONResponse(content={"detail": err.detail}, status_code=err.status_code)

        return await call_next(request)

    app.add_middleware(SessionMiddleware, secret_key="some-secret-key")
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
