from functools import wraps
from datetime import datetime
import logging


# def handle_query_params_exceptions(func):
#     @wraps(func)
#     async def wrapper(**params):
#         Checking for missing params and param_value exceptions
#         missing_params = []
#         for query_param, param_value in params.items():
#             if (param_value != None):
#                 missing_param = query_params_exceptions(query_param, param_value)
#                 if missing_param:
#                     missing_params.append(missing_param)
#         if (missing_params):
#             raise MissingRequiredParamsException(missing_params)

#         # Checking if the give date-range is crt or wrong
#         required_keys = {'from_date', 'to_date'}
#         if required_keys.issubset(params) and params['from_date'] != None and params['to_date'] != None:
#             start_date = datetime.strptime(params['from_date'], '%Y-%m-%d')
#             end_date = datetime.strptime(params['to_date'], '%Y-%m-%d')
#             if (start_date > end_date):
#                 raise DateRangeException(from_date=params['from_date'], to_date=params['to_date'])

#         return await func(**params)
#     return wrapper


def log_time_taken(func):
    @wraps(func)
    async def wrapper(*args, **kwargs):
        start_time = datetime.now()
        result = await func(*args, **kwargs)
        end_time = datetime.now()
        elapsed_time = (end_time - start_time).total_seconds()

        # Extracting function name and arguments to log
        func_name = func.__name__
        logging.info(f'Time taken {elapsed_time:.2f} seconds for {func_name} with args: {args} kwargs: {kwargs}')

        return result
    return wrapper
