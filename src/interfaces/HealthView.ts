interface IDummyViewPageGraphProps {
    dateRange: {
        from: string;
        to: string;
    };
    setDateRange: (dateRange: { from: string; to: string; }) => void;
}

interface IChartContext {
    xaxis: {
        min: number;
        max: number;
    };
}

interface IHealthViewData {
    health_aggregated_metrics: IHealthAggregations;
    operated_limits: IOperatedLimits;
    target_performance_metrics: ITargetPerformanceMetrics;
}
interface ITargetPerformanceMetrics {
    min_temp: string;
    max_temp: string;
    avg_temp: string;
    min_soc: string;
    max_soc: string;
    charging_min_crate: string;
    charging_max_crate: string;
    charging_avg_crate: string;
    discharging_min_crate: string;
    discharging_max_crate: string;
    discharging_avg_crate: string;
}
interface IOperatedLimits {
    pack_voltage_range: string;
    temperature_range: string;
    soc_range: string;
    cell_voltage_range: string;
}
interface IHealthAggregations {
    bat_uid: string;
    bms_soh: string;
    cumulative_energy_discharged_kwh: string;
    equivalent_cycles_count: string;
    pack_voltage_min_volts: string;
    pack_voltage_max_volts: string;
    temperature_min_celsius: string;
    temperature_max_celsius: string;
    temperature_avg_celsius: string;
    soc_min_per: string;
    soc_max_per: string;
    cell_voltage_min_mv: string;
    cell_voltage_max_mv: string;
    discharging_min_crate: string;
    discharging_max_crate: string;
    discharging_avg_crate: string;
    charging_min_crate: string;
    charging_max_crate: string;
    charging_avg_crate: string;
    variation_of: string;
    avg_consumption: string;
    milage: string;
    range: string;
    remaining_energy: string;
    season: string;
    temperature_range: string;
    cell_status: string;
    criticality: string;
    efficiency: string;
    safety_condition: string;
}

interface IHealthViewGraphData {
    [date: string]: number;
}

interface IChartSeries {
    name: string;
    data: { x: string; y: number; }[];
}

interface IHealthAvgAggregations {
    battery_uid: string;
    SoH_drop: string;
    avg_discharging_hrs: string;
    avg_charging_hrs: string;
    avg_standby_hrs: string;
    avg_min_soc: string;
    avg_max_soc: string;
    avg_min_temp: string;
    avg_max_temp: string;
    avg_avg_temp: string;
    avg_min_C_rate_charging: string;
    avg_max_C_rate_charging: string;
    avg_avg_C_rate_charging: string;
    avg_min_C_rate_discharging: string;
    avg_max_C_rate_discharging: string;
    avg_avg_C_rate_discharging: string;
    SoC_start_charging: string;
    SoC_end_charging: string;
    SoH_drop_last_10Kwh: string;
    SoH_drop_last_100Kwh: string;
}

interface IHealthViewPageProps {
    healthGraphState: IHealthViewGraphState;
    setGraphState: (data: IHealthViewGraphState) => void;
    healthAggregations: IHealthAggregations | undefined;
    operatedLimits?: IOperatedLimits;
    targetPerformanceMetrics?: ITargetPerformanceMetrics;
    batteryMeta: IBatteryData | undefined;
    dateRange: [string, string];
    AUCMetaData?: IAucList;
    generateNewAUC: () => void;
    generatingAUC: boolean;
    chartSeries: IChartSeries[];
    chartOption: ApexCharts.ApexOptions;
    openAUCPage: (batteryData: IBatteryData | undefined) => void;
    healthAvgAggregations?: IHealthAvgAggregations;
    showDefaultKPIs: boolean;
    capacityAh: ICapacityChartData;
    soHVsLastMonth: number;
    cyclesVsLastMonth: number;
}
interface IHealthViewGraphState {
    category?: string;
    subCategory?: string;
    model?: string;
}
interface IHealthViewPageGraphProps {
    healthGraphState: IHealthViewGraphState;
    setGraphState: (data: IHealthViewGraphState) => void;
    bmsSOH: string | undefined;
    equivalentCycles: string | undefined;
    capacityAh: ICapacityChartData;
    seriesOne: IChartSeries[];
    chartOption: ApexCharts.ApexOptions;
    soHVsLastMonth: number;
    cyclesVsLastMonth: number;
}
interface IHealthViewSohData {
    health_soh_graph_data: IChartSeries[];
    soh_vs_last_month: number;
}
interface IHealthViewCapacityData {
    health_capacity_graph_data: IChartSeries[];
    latest_capacity_ah: string;
    capacity_vs_last_month: number;
}
interface IHealthViewCyclesData {
    health_cycles_graph_data: IChartSeries[];
    cycles_vs_last_month: number;
}
interface ICapacityChartData {
    capacityLatest: string;
    capacityVsLastMonth: number;
}