from datetime import datetime, timedelta
import typing

from app.core.custom_exceptions import DateFormatException

# date_pattern = '^\d{4}-(0?[1-9]|1[0-2])-(0?[1-9]|[12]\d|3[01])$'


def custom_strftime(format, date_time):
    return date_time.strftime(format).replace('{S}', str(date_time.day) + ('th' if 4 <= date_time.day % 100 <= 20 else {1: 'st', 2: 'nd', 3: 'rd'}.get(date_time.day % 10, 'th')))


def from_date_converter(from_date):
    pattern = "%Y-%m-%d %H:%M:%S"
    from_date_str = "%s %s" % (from_date, "00:30:00")
    start_date = datetime.strptime(from_date_str, pattern)
    start_date = start_date
    return start_date


def to_date_converter(to_date):
    pattern = "%Y-%m-%d %H:%M:%S"
    to_date_str = "%s %s" % (to_date, "23:59:59")
    end_date = datetime.strptime(to_date_str, pattern)
    end_date = end_date
    return end_date


def operational_summaries_date_filter_query(filter_query, from_date, to_date):
    pattern = "%Y-%m-%d %H:%M:%S"
    delta = 1
    from_date_str = "%s %s" % (from_date, "05:30:00")
    to_date_str = "%s %s" % (to_date, "05:30:00")
    from_date = datetime.strptime(from_date_str, pattern)
    from_date = from_date - timedelta(days=delta)
    to_date = datetime.strptime(to_date_str, pattern)
    filter_query['summary_date'] = {'$in': [to_date, from_date]}
    return filter_query


def set_feed_date_filter_query(from_date, to_date, filter_query):
    pattern = "%Y-%m-%d %H:%M:%S"
    delta = 5.5
    start_date_str = "%s %s" % (from_date, "00:00:00")
    end_date_str = "%s %s" % (to_date, "23:59:59")
    if from_date:
        try:
            start_date = datetime.strptime(start_date_str, pattern)
            start_date = start_date - timedelta(hours=delta)
        except:
            raise DateFormatException(date=from_date, name='from_date')
    if to_date:
        try:
            end_date = datetime.strptime(end_date_str, pattern)
            end_date = end_date - timedelta(hours=delta)
        except:
            raise DateFormatException(date=to_date, name='to_date')
    if from_date and to_date:
        filter_query["feed_date"] = {"$gte": start_date, "$lte": end_date}
    elif from_date:
        filter_query["feed_date"] = {"$gte": start_date}
    elif to_date:
        filter_query["feed_date"] = {"$lte": end_date}

    return filter_query


def set_date_filter_query(from_date, to_date):
    pattern = "%Y-%m-%d %H:%M:%S"
    delta = 5.5
    start_date_str = "%s %s" % (from_date, "00:00:00")
    end_date_str = "%s %s" % (to_date, "23:59:59")
    if from_date:
        try:
            start_date = datetime.strptime(start_date_str, pattern)
            start_date = start_date - timedelta(hours=delta)
        except:
            raise DateFormatException(date=from_date, name='from_date')
    if to_date:
        try:
            end_date = datetime.strptime(end_date_str, pattern)
            end_date = end_date - timedelta(hours=delta)
        except:
            raise DateFormatException(date=to_date, name='to_date')
    if from_date and to_date:
        return {"$gte": start_date, "$lte": end_date}
    elif from_date:
        return {"$gte": start_date}
    elif to_date:
        return {"$lte": end_date}
    

def convert_to_IST(GMT_date : datetime) -> datetime:                     ## Function to handle the MongoDB time 
    IST_date = GMT_date + timedelta(hours=5, minutes=30)
    return IST_date

def convert_from_date_to_GMT(IST_date : str) -> datetime:
    pattern = "%Y-%m-%d %H:%M:%S"
    delta = 5.5
    start_date_str = "%s %s" % (IST_date, "00:00:00")
    try:
        start_date = datetime.strptime(start_date_str, pattern)
        start_date = start_date - timedelta(hours=delta)
    except:
        raise DateFormatException(date=IST_date, name='from_date')
    
    return start_date

def convert_to_date_to_GMT(IST_date : str) -> datetime:
    pattern = "%Y-%m-%d %H:%M:%S"
    delta = 5.5
    end_date_str = "%s %s" % (IST_date, "23:59:59")
    try:
        end_date = datetime.strptime(end_date_str, pattern)
        end_date = end_date - timedelta(hours=delta)
    except:
        raise DateFormatException(date=IST_date, name='to_date')
    
    return end_date
