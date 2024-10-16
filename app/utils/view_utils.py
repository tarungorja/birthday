from datetime import datetime,date, timedelta
from typing import Union
from app.core.database import daily_summaries_instance, aggregated_metrics_instance
from app.utils.date_utils import convert_from_date_to_GMT, convert_to_date_to_GMT
import math 


def set_default_no_data(value, units='', round_off=1, absolute=0):
    if str(value) in ['inf', '-inf'] or value == None:
        return '-'
    if isinstance(value, float):
        if math.isnan(value):
            return '-'
        if value.is_integer() or round_off == 0:
            value = int(value)
        else:
            value = round(value, round_off)
        if str(value) == '0.0':
            value = 0
        if (absolute):
            value = abs(value)
        return str(value)+units
    elif isinstance(value, int) or value:
        if (absolute):
            value = abs(value)
        return str(value)+units
    else:
        return '-'


def division_utils(value1, value2):
    if (value2 in ['inf', '-inf', 0] or value2 == None or value1 == None):
        return 0
    else:
        return value1/value2


def is_within_range(lower_bound, upper_bound, metric_value_1=None, metric_value_2=None):
    if (metric_value_1 and metric_value_2):
        return lower_bound <= round(metric_value_1, 1) <= upper_bound and lower_bound <= round(metric_value_2, 1) <= upper_bound
    elif metric_value_1:
        return lower_bound <= round(metric_value_1, 1) <= upper_bound
    elif metric_value_2:
        return lower_bound <= round(metric_value_2, 1) <= upper_bound


def get_indian_season() -> Union[str, None]:
    seasons = {
        "Spring": [(2, 15), (4, 14)],
        "Summer": [(4, 15), (6, 14)],
        "Monsoon": [(6, 15), (8, 14)],
        "Autumn": [(8, 15), (10, 14)],
        "Pre-winter": [(10, 15), (12, 14)],
        "Winter": [(12, 15), (2, 14)],
    }

    today = datetime.now()
    current_month = today.month
    current_day = today.day

    for season, (start, end) in seasons.items():
        start_month, start_day = start
        end_month, end_day = end

        if start_month < end_month or (start_month == end_month and start_day <= end_day):
            if (current_month > start_month or (current_month == start_month and current_day >= start_day)) and \
               (current_month < end_month or (current_month == end_month and current_day <= end_day)):
                return season
        else:
            if (current_month > start_month or (current_month == start_month and current_day >= start_day)) or \
               (current_month < end_month or (current_month == end_month and current_day <= end_day)):
                return season

    return None

def get_last_month_bms_soh(battery_uid, last_day_previous_month):
    first_day_of_previous_month = last_day_previous_month.replace(day=1)
    bms_soh_last_month = daily_summaries_instance.get_bms_soh_last_month(battery_uid, convert_from_date_to_GMT(first_day_of_previous_month.strftime('%Y-%m-%d')), convert_to_date_to_GMT(last_day_previous_month.strftime('%Y-%m-%d')))
    if(bms_soh_last_month):
        return bms_soh_last_month[0]['bms_soh']
    return None

def get_capacity_of_last_month(battery_uid, latest_capacity_ah, battery_capacity_ah) -> float :
    today = date.today()
    first_day_of_current_month = today.replace(day=1)
    last_day_of_previous_month = first_day_of_current_month - timedelta(days=1)
    bms_soh_last_month = get_last_month_bms_soh(battery_uid, last_day_of_previous_month)
    if(bms_soh_last_month) :
        capacity_last_month = bms_soh_last_month * battery_capacity_ah
        capacity_last_month = capacity_last_month/100
        capacity_vs_last_month = latest_capacity_ah - capacity_last_month
        if str(capacity_vs_last_month) == '0.0':
            return 0
        return capacity_vs_last_month
    return 0

def get_soh_vs_last_month(battery_uid, latest_soh) -> float:
    today = date.today()
    first_day_of_current_month = today.replace(day=1)
    last_day_of_previous_month = first_day_of_current_month - timedelta(days=1)
    bms_soh_last_month = get_last_month_bms_soh(battery_uid, last_day_of_previous_month)
    if(bms_soh_last_month):
        bms_vs_last_month = latest_soh - bms_soh_last_month
        if str(bms_vs_last_month) == '0.0':
            return 0
        return bms_vs_last_month
    return 0

def get_cycles_vs_last_month(battery_uid, current_cycles) -> float:
    today = date.today()
    first_day_of_current_month = today.replace(day=1)
    last_day_of_previous_month = first_day_of_current_month - timedelta(days=1)
    first_day_previous_month = last_day_of_previous_month.replace(day=1)
    cycles_data_last_month = aggregated_metrics_instance.get_equivalent_cycles_last_month(battery_uid, convert_from_date_to_GMT(first_day_previous_month.strftime('%Y-%m-%d')), convert_from_date_to_GMT(last_day_of_previous_month.strftime('%Y-%m-%d')))
    if(cycles_data_last_month):
        cycles_vs_last_month = current_cycles - cycles_data_last_month[0]['equivalent_cycles_count']
        if str(cycles_vs_last_month) == '0.0':
            return 0
        return cycles_vs_last_month
    return 0

def set_year_units(total_year):
    return ' years' if total_year > 1 else ' year'