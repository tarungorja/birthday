
from typing import List
from app.data_validators.schemas.response_schemas.batteries_schemas import BatteryAlertsOutput, BatteryMetadataOutput, BatteryModelsOutput, BatterySearchModel, Specifications
from app.utils.view_utils import set_default_no_data


def transform_battery_meta_info(battery_metadata) -> List[BatteryMetadataOutput]:
    response_docs = []
    for metadata in battery_metadata:
        response_doc = BatteryMetadataOutput(
            bat_uid=metadata['bat_uid'],
            asset_name=metadata['asset_name'],
            model=metadata['model'],
            chemistry=metadata['chemistry'],
            manufacturer=metadata['manufacturer'],
            battery_type=metadata['battery_type'],
            comissioned_on=metadata['comissioned_on'],
            used_in='Telecom Site',
            location=metadata['location'],
            nominal_energy_kwh=str(metadata['nominal_energy_kwh'])+'kWh',
            eid=metadata['eid'],
        )
        response_docs.append(response_doc.model_dump(mode='json'))

    return response_docs


def transform_searched_batteries(searched_batteries) -> List[BatterySearchModel]:
    response_docs = []
    for battery in searched_batteries:
        response_doc = BatterySearchModel(
            bat_uid=battery['bat_uid'],
            asset_name=battery['asset_name'],
            model=battery['model']
        )
        response_docs.append(response_doc)
    return response_docs


def transform_battery_models_info(battery_models) -> BatteryModelsOutput:
    model_specifications = battery_models.get('specifications', None)
    return BatteryModelsOutput(
        capacity_ah=set_default_no_data(battery_models.get('capacity_ah', None)),
        nominal_voltage_volts=set_default_no_data(battery_models.get('nominal_voltage_volts', None)),
        manufacturer=set_default_no_data(battery_models.get('manufacturer', None)),
        type=set_default_no_data(battery_models.get('type', None)),
        model=set_default_no_data(battery_models.get('model_no', None)),
        specifications=Specifications(
            min_charging_temp=set_default_no_data(model_specifications.get('min_charging_temp', None)),
            max_charging_temp=set_default_no_data(model_specifications.get('max_charging_temp', None)),
            avg_charging_temp=set_default_no_data(model_specifications.get('avg_charging_temp', None)),
            min_discharging_temp=set_default_no_data(model_specifications.get('min_discharging_temp', None)),
            max_discharging_temp=set_default_no_data(model_specifications.get('max_discharging_temp', None)),
            avg_discharging_temp=set_default_no_data(model_specifications.get('avg_discharging_temp', None)),
            min_storage_temp=set_default_no_data(model_specifications.get('min_storage_temp', None)),
            max_storage_temp=set_default_no_data(model_specifications.get('max_storage_temp', None)),
            avg_storage_temp=set_default_no_data(model_specifications.get('avg_storage_temp', None)),
            max_discharge_current_amp=set_default_no_data(model_specifications.get('max_discharge_current_amp', None)),
            max_charging_current_amp=set_default_no_data(model_specifications.get('max_charging_current_amp', None)),
            ideal_charging_current_amp=set_default_no_data(model_specifications.get('ideal_charging_current_amp', None)),
            ideal_discharging_current_amp=set_default_no_data(model_specifications.get('ideal_discharging_current_amp', None), absolute=1),
            recommended_charging_current_amp=set_default_no_data(model_specifications.get('recommended_charging_current_amp', None)),
            charge_voltage_volts=set_default_no_data(model_specifications.get('charge_voltage_volts', None)),
            cycle_life_cycles=set_default_no_data(model_specifications.get('cycle_life_cycles', None)),
            dod=set_default_no_data(model_specifications.get('dod', None)),
            calendar_life_years=set_default_no_data(model_specifications.get('calendar_life_years', None)),
            round_trip_efficiency_per=set_default_no_data(model_specifications.get('round_trip_efficiency_per', None)),
            ideal_temp=set_default_no_data(model_specifications.get('ideal_temp', None)),
            min_soc=set_default_no_data(model_specifications.get('min_soc', None)),
            max_soc=set_default_no_data(model_specifications.get('max_soc', None)),
            min_cell_voltage=set_default_no_data(model_specifications.get('min_cell_voltage', None)),
            max_cell_voltage=set_default_no_data(model_specifications.get('max_cell_voltage', None)),
            min_pack_voltage=set_default_no_data(model_specifications.get('min_pack_voltage', None)),
            max_pack_voltage=set_default_no_data(model_specifications.get('max_pack_voltage', None)),
            min_charging_crate=set_default_no_data(model_specifications.get('min_charging_crate', None)),
            max_charging_crate=set_default_no_data(model_specifications.get('max_charging_crate', None)),
            avg_charging_crate=set_default_no_data(model_specifications.get('avg_charging_crate', None)),
            min_discharging_crate=set_default_no_data(model_specifications.get('min_discharging_crate', None), absolute=1),
            max_discharging_crate=set_default_no_data(model_specifications.get('max_discharging_crate', None), absolute=1),
            avg_discharging_crate=set_default_no_data(model_specifications.get('avg_discharging_crate', None), absolute=1),
        )
    )


def transform_battery_alerts(battery_alerts) -> List[BatteryAlertsOutput]:
    transformed_alerts = []
    for alert in battery_alerts:
        battery_alerts_data = BatteryAlertsOutput(
            title=alert['title'],
            description=alert['description'],
            type=alert['type'],
            revision=alert['revision'],
            code=alert['code'],
        )
        transformed_alerts.append(battery_alerts_data)
    return transformed_alerts


def transform_update_battery_alerts(battery_alerts) -> BatteryAlertsOutput:
    battery_alerts_data = BatteryAlertsOutput(
        title=battery_alerts['title'],
        description=battery_alerts['description'],
        type=battery_alerts['type'],
        revision=battery_alerts['revision'],
        code=battery_alerts['code'],
    )
    return battery_alerts_data
