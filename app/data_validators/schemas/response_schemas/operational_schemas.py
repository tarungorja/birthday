import datetime
from pydantic import BaseModel
from typing import List
from app.data_validators.schemas.response_schemas.warranty_schemas import BatteryUsageRecommendations


class OperationalValues(BaseModel):
    charge_cycle_count: str
    discharge_cycle_count: str
    cumulative_energy_consumed_kwh: str
    cumulative_energy_discharged_kwh: str
    total_charge_duration_hrs: str
    total_discharge_duration_hrs: str


class OperationalThresholds(BaseModel):
    best_Crate_to_use: str
    best_SOC_limits: str
    temperature_limits: str


class OperationalAggregations(BaseModel):
    operational_values: OperationalValues
    operational_thresholds: OperationalThresholds
    stress_factors: List[str]
    battery_usage_recommendations: List[BatteryUsageRecommendations]


class OperationalAvgAggregations(BaseModel):
    charge_cycle_count: str
    discharge_cycle_count: str
    cumulative_energy_consumed_kwh: str
    cumulative_energy_discharged_kwh: str
    total_charge_duration_hrs: str
    total_discharge_duration_hrs: str


class OperationalSocRange(BaseModel):
    x: datetime.date
    y: float
    start_soc: int
    end_soc: int


class ChargingCyclesSeries(BaseModel):
    name : str
    data : List[tuple[float,int]]

class DischargingCyclesSeries(BaseModel):
    name : str
    data : List[tuple[float,int]]