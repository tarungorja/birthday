from pydantic import BaseModel
from typing import List

from app.data_validators.schemas.response_schemas.health_schemas import GraphSeriesModel


class BatteryUsageRecommendations(BaseModel):
    title: str
    recommendation: str


class WarrantyAggregatedMetricsSchema(BaseModel):
    warranty_start_date: str
    warranty_end_date: str
    status: str
    calender_life: str
    total_warranty_life_span: str
    total_expected_life_span: str
    total_warranty_alerts: str
    soc_min_per: str
    soc_max_per: str
    bms_soh: str
    equivalent_cycles_count: str
    charging_crate_min: str
    charging_crate_max: str
    charging_crate_avg: str
    discharging_crate_min: str
    discharging_crate_max: str
    discharging_crate_avg: str
    charging_temp_range: str
    discharging_temp_range: str
    charging_crate: str
    discharging_crate: str
    cell_voltage_diff: str
    battery_usage_recommendations: List[BatteryUsageRecommendations]


class WarrantyAvgAggregatedMetricsSchema(BaseModel):
    avg_SoH: str
    avg_min_soc: str
    avg_max_soc: str
    avg_min_C_rate_charging: str
    avg_max_C_rate_charging: str
    avg_min_C_rate_discharging: str
    avg_max_C_rate_discharging: str
    avg_equivalent_cycles: str
    charging_temp_range: str
    discharging_temp_range: str
    avg_cell_voltage_diff: str


class WarrantyBmsSoh(BaseModel):
    warranty_bms_soh_graph_series: List[GraphSeriesModel]
    warranty_start_date: float
    warranty_end_date: float


class WarrantyEquivalentCycles(BaseModel):
    warranty_equivalent_cycles_count_series: List[GraphSeriesModel]
    warranty_start_date: float
    warranty_end_date: float
