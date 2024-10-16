from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from app.core.custom_exceptions import AlreadyExistsException, DateFormatException, DateRangeException, MissingRequiredParamsException, NegativeIntException, NoDataException
from app.core.exceptions import date_format_exception_handler, date_range_exception_handler, missing_param_exception_handler, negative_int_exception_handler, no_data_exception_handler, validation_exception_handler, value_already_existing_exception_handler


def add_exception_handlers(app: FastAPI):
    app.add_exception_handler(DateFormatException, date_format_exception_handler)
    app.add_exception_handler(MissingRequiredParamsException, missing_param_exception_handler)
    app.add_exception_handler(NegativeIntException, negative_int_exception_handler)
    app.add_exception_handler(DateRangeException, date_range_exception_handler)
    app.add_exception_handler(NoDataException, no_data_exception_handler)
    app.add_exception_handler(RequestValidationError, validation_exception_handler)
    app.add_exception_handler(AlreadyExistsException, value_already_existing_exception_handler)
