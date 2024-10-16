from datetime import datetime
from typing import List
from app.core.custom_exceptions import AlreadyExistsException
from app.core.database import meta_data_instance, battery_models_instance, battery_alerts_instance
from app.data_validators.mappers.battery_data_mappers import transform_battery_alerts, transform_battery_meta_info, transform_battery_models_info, transform_searched_batteries, transform_update_battery_alerts
from app.data_validators.schemas.response_schemas.batteries_schemas import BatteryAlertsOutput, BatteryMetadataOutput, BatteryModelsOutput, BatterySearchModel


def get_battery_metadata(eid, battery_uid: str) -> List[BatteryMetadataOutput]:
    battery_metadata = meta_data_instance.get_metadata_bat_uid(eid, battery_uid)
    return transform_battery_meta_info(battery_metadata)


def get_all_batteries_metadata(eid, page: int, page_size: int) -> List[BatteryMetadataOutput]:
    batteries_metadata = meta_data_instance.get_all_batteries_metadata(eid, skip=(page - 1) * page_size, limit=page_size)
    return transform_battery_meta_info(batteries_metadata)


def get_searched_batteries_info(eid, search, page, page_size) -> List[BatterySearchModel]:
    searched_batteries = meta_data_instance.get_search_batteries_metadata(eid, search, skip=(page - 1) * page_size, limit=page_size)
    return transform_searched_batteries(searched_batteries)


def get_battery_models_info(model: str) -> BatteryModelsOutput:
    battery_models = battery_models_instance.find_one(model)
    return transform_battery_models_info(battery_models)


def get_battery_alerts_info(revision, code: str) -> List[BatteryAlertsOutput]:
    if (revision != None and code != None):
        battery_alerts = battery_alerts_instance.get_battery_alerts(revision, code)
    else:
        battery_alerts = battery_alerts_instance.get_battery_alerts_code(code)
    return transform_battery_alerts(battery_alerts)


def update_battery_alerts_info(alert, code) -> BatteryAlertsOutput:
    if (code[0] == 's'):
        type = 'signals'
    elif (code[0] == 'f'):
        type = 'feeds'
    battery_alert_revisions = battery_alerts_instance.get_no_of_revisions_code(code)
    updated_battery_alert = {
        'title': alert.title,
        'description': alert.description,
        'revision': battery_alert_revisions,
        'code': code,
        'type': type,
        'created_at': datetime.now(),
        'updated_at': datetime.now(),
    }
    battery_alerts_instance.update_battery_alerts(updated_battery_alert)
    updated_battery_alert.pop('updated_at')
    updated_battery_alert.pop('_id')

    return transform_update_battery_alerts(updated_battery_alert)


def push_new_battery_alerts_codes_info(alert) -> BatteryAlertsOutput:
    if (battery_alerts_instance.get_no_of_revisions_code(alert.code) > 0):
        raise AlreadyExistsException(f'Alerts with {alert.code} already exists.')
    if (alert.code[0] == 's'):
        type = 'signals'
    elif (alert.code[0] == 'f'):
        type = 'feeds'
    alert_doc = {
        'title': alert.title,
        'description': alert.description,
        'revision': 0,
        'code': alert.code,
        'type': type,
        'created_at': datetime.now(),
        'updated_at': datetime.now(),
    }
    battery_alerts_instance.create_battery_alerts(alert_doc)
    alert_doc.pop('updated_at')
    alert_doc.pop('_id')
    return transform_update_battery_alerts(alert_doc)
