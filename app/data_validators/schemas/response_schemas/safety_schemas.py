from pydantic import BaseModel
from typing import List, Optional
import datetime

class SafetyAggregatedValuesSchema(BaseModel):
    operated_temp_range: str
    avg_cell_voltage_diff: str
    over_temp_incidents: str
    over_charging_incidents: str
    bms_safety_alerts: str


class BatteryUsageRecommendationsSchema(BaseModel):
    title: str
    recommendation: str


class SafetyAggregatedMetricsSchema(BaseModel):
    temperature_celsius_min: str
    temperature_celsius_max: str
    cell_voltage_diff: str
    avg_temp_deviation_charging: str
    avg_temp_deviation_discharging: str
    overcharging_incidents: str
    safety_aggregated_values: SafetyAggregatedValuesSchema
    battery_usage_recommendations: List[BatteryUsageRecommendationsSchema]
    season: str
    temperature_range: str
    cell_status: str
    criticality: str
    efficiency: str
    safety_condition: str


class SafetyAvgAggregatedMetricsSchema(BaseModel):
    operated_temp_range: str
    avg_cell_voltage_diff: str
    over_temp_incidents: str
    over_charging_incidents: str
    bms_safety_alerts: str

class SafetyIncidentsMetricsSchema(BaseModel):
    x: str
    y: int
    z: int
    severity: str   
    signal_id: str
    signal_title: str

class SafetyIncidentsDataSchema(BaseModel):
    x: List[str]
    y: List[int]
    z: List[int]
    customdata: List[List[str]]

class HourlyTempDataSchema(BaseModel):
    x: List[str]
    y: List[str]
    z: List[Optional[List[Optional[int]]]]
    
class HourlyTempMetricSchema(BaseModel):
    summary_date: datetime.date
    max_temperature_hourly: List[Optional[int]]

class SafetyIncidentsSchema(BaseModel):
    safety_incidents_chart_data: SafetyIncidentsDataSchema
    latest_date: str
    initial_date: str 

