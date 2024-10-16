class DateFormatException(Exception):
    def __init__(self, date: str, name: str):
        self.date = date
        self.name = name


class DateRangeException(Exception):
    def __init__(self, from_date, to_date):
        self.to_date = to_date
        self.from_date = from_date


class MissingRequiredParamsException(Exception):
    def __init__(self, missing_params: list):
        self.missing_params = missing_params


class NegativeIntException(ValueError):
    def __init__(self, name):
        self.name = name


class NoDataException(Exception):
    def __init__(self, **parameters):
        self.parameters = parameters


class AlreadyExistsException(Exception):
    def __init__(self, msg) -> None:
        self.message = msg
