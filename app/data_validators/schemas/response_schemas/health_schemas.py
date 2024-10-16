import datetime
from typing import List, Union
from pydantic import BaseModel


class HealthAggregationsSchema(BaseModel):
    bat_uid: str
    bms_soh: str
    cumulative_energy_discharged_kwh: str
    equivalent_cycles_count: str
    pack_voltage_min_volts: str
    pack_voltage_max_volts: str
    temperature_min_celsius: str
    temperature_max_celsius: str
    temperature_avg_celsius: str
    soc_min_per: str
    soc_max_per: str
    cell_voltage_min_mv: str
    cell_voltage_max_mv: str
    discharging_min_crate: str
    discharging_max_crate: str
    discharging_avg_crate: str
    charging_min_crate: str
    charging_max_crate: str
    charging_avg_crate: str
    variation_of: str
    avg_consumption: str
    milage: str
    range: str
    remaining_energy: str
    season: str
    temperature_range: str
    cell_status: str
    criticality: str
    efficiency: str
    safety_condition: str


class HealthAvgAggregationsSchema(BaseModel):
    battery_uid: str
    SoH_drop: str
    avg_discharging_hrs: str
    avg_charging_hrs: str
    avg_standby_hrs: str
    avg_min_soc: str
    avg_max_soc: str
    avg_min_temp: str
    avg_max_temp: str
    avg_avg_temp: str
    avg_min_C_rate_charging: str
    avg_max_C_rate_charging: str
    avg_avg_C_rate_charging: str
    avg_min_C_rate_discharging: str
    avg_max_C_rate_discharging: str
    avg_avg_C_rate_discharging: str
    SoC_start_charging: str
    SoC_end_charging: str
    SoH_drop_last_10Kwh: str
    SoH_drop_last_100Kwh: str


class TargetPerformanceSchema(BaseModel):
    min_temp: str
    max_temp: str
    avg_temp: str
    min_soc: str
    max_soc: str
    charging_min_crate: str
    charging_max_crate: str
    charging_avg_crate: str
    discharging_min_crate: str
    discharging_max_crate: str
    discharging_avg_crate: str


class OperatedLimits(BaseModel):
    pack_voltage_range: str
    temperature_range: str
    soc_range: str
    cell_voltage_range: str


class HealthAggregationsOutput(BaseModel):
    health_aggregated_metrics: HealthAggregationsSchema
    operated_limits: OperatedLimits
    target_performance_metrics: TargetPerformanceSchema


class DataPointModel(BaseModel):
    x: datetime.date
    y:  float


class GraphSeriesModel(BaseModel):
    name: str
    data: List[DataPointModel]


class BatteryDegradationCapacity(BaseModel):
    health_capacity_graph_data: List[GraphSeriesModel]
    latest_capacity_ah: str
    capacity_vs_last_month: float

class HealthBMSSoH(BaseModel):
    health_soh_graph_data: List[GraphSeriesModel]
    soh_vs_last_month: float

class BatteryDegradationCycles(BaseModel):
    health_cycles_graph_data: List[GraphSeriesModel]
    cycles_vs_last_month: float