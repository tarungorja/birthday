from fastapi import Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from app.core.custom_exceptions import AlreadyExistsException, DateFormatException, DateRangeException, MissingRequiredParamsException, NegativeIntException, NoDataException


async def date_format_exception_handler(request: Request, exc: DateFormatException):
    return JSONResponse(
        status_code=400,
        content={"detail": f"{exc.name}({exc.date}) is not in the correct format: yyyy-mm-dd"},
    )


async def missing_param_exception_handler(request: Request, exc: MissingRequiredParamsException):
    return JSONResponse(
        status_code=400,
        content={'detail':  f"Missing required parameters: {exc.missing_params}"},
    )


async def negative_int_exception_handler(request: Request, exc: NegativeIntException):
    return JSONResponse(
        status_code=400,
        content={'detail':  f"value of {exc.name} is out of bounds"},
    )


async def date_range_exception_handler(request: Request, exc: DateRangeException):
    return JSONResponse(
        status_code=400,
        content={'detail':  f"from_date({exc.from_date}) should be less than to_date({exc.to_date})"}
    )


async def no_data_exception_handler(request: Request, ecx: NoDataException):
    return JSONResponse(
        status_code=202,
        content={'detail':  f'no data found for the given parameters: {ecx.parameters}'}
    )


async def validation_exception_handler(request: Request, exc: RequestValidationError):
    errors = exc.errors()
    formatted_errors = []
    error_code: int = 422
    for error in errors:
        if (error['loc'][1] in ['page', 'page_size']):
            formatted_error = "{} input should be a valid integer".format(error["loc"][1])
            error_code = 400
        else:
            formatted_error = f'{error["loc"][1]} {error["msg"]}'
        formatted_errors.append(formatted_error)

    return JSONResponse(
        status_code=error_code,
        content={"detail": formatted_errors}
    )


async def value_already_existing_exception_handler(request: Request, exc: AlreadyExistsException):
    return JSONResponse(
        status_code=409,
        content={'detail': exc.message}
    )
