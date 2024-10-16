from pydantic import BaseModel
from datetime import datetime


class BatteryMetadataOutput(BaseModel):
    bat_uid: str
    asset_name: str
    model: str
    chemistry: str
    manufacturer: str
    battery_type: str
    comissioned_on: str
    used_in: str
    location: str
    nominal_energy_kwh: str
    eid: str


class BatterySearchModel(BaseModel):
    bat_uid: str
    asset_name: str
    model: str


class BatteryAlertsOutput(BaseModel):
    title: str
    description: str
    type: str
    revision: int
    code: str


class BatteryAlertsInput(BaseModel):
    title: str
    description: str


class NewBatteryAlertsInput(BaseModel):
    title: str
    description: str
    code: str


class Specifications(BaseModel):
    min_charging_temp: str
    max_charging_temp: str
    avg_charging_temp: str
    min_discharging_temp: str
    max_discharging_temp: str
    avg_discharging_temp: str
    min_storage_temp: str
    max_storage_temp: str
    avg_storage_temp: str
    max_discharge_current_amp: str
    max_charging_current_amp: str
    ideal_charging_current_amp: str
    ideal_discharging_current_amp: str
    recommended_charging_current_amp: str
    charge_voltage_volts: str
    cycle_life_cycles: str
    dod: str
    calendar_life_years: str
    round_trip_efficiency_per: str
    ideal_temp: str
    min_soc: str
    max_soc: str
    min_cell_voltage: str
    max_cell_voltage: str
    min_pack_voltage: str
    max_pack_voltage: str
    min_charging_crate: str
    max_charging_crate: str
    avg_charging_crate: str
    min_discharging_crate: str
    max_discharging_crate: str
    avg_discharging_crate: str


class BatteryModelsOutput(BaseModel):
    capacity_ah: str
    nominal_voltage_volts: str
    manufacturer: str
    type: str
    model: str
    specifications: Specifications
