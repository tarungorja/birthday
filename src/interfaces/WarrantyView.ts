interface IWarrantyViewProps {
    warrantyGraphState: IWarrantyGraphState;
    setGraphState: (data: IWarrantyGraphState) => void;
    batteryMeta: IBatteryData | undefined;
    generatingAUC: boolean;
    AUCMetaData?: IAucList;
    generateNewAUC: () => void;
    dateRange: [string, string];
    openAUCPage: (batteryData: IBatteryData | undefined) => void;
    warrantyAggregations: IWarrantyAggregations | undefined;
    chartSeries: IWarrantyGraphSeries[];
    warrantyChartOptions: ApexCharts.ApexOptions;
    warrantyAvgAggregations?: IWarrantyAvgAggregations;
    showDefaultKPIs: boolean;
}

interface IWarrantyViewPageGraphProps {
    warrantyGraphState: IWarrantyGraphState;
    setGraphState: (data: IWarrantyGraphState) => void;
    chartSeries: IWarrantyGraphSeries[];
    warrantyChartOptions: ApexCharts.ApexOptions;
}

interface IWarrantyAvgAggregations {
    avg_SoH: string;
    avg_min_soc: string;
    avg_max_soc: string;
    avg_min_C_rate_charging: string;
    avg_max_C_rate_charging: string;
    avg_min_C_rate_discharging: string;
    avg_max_C_rate_discharging: string;
    avg_equivalent_cycles: string;
    charging_temp_range: string;
    discharging_temp_range: string;
    avg_cell_voltage_diff: string;
}

interface IBatteryUsageRecommendations {
    title: string;
    recommendation: string;
}

interface IWarrantyAggregations {
    warranty_start_date: string;
    warranty_end_date: string;
    status: string;
    calender_life: string;
    total_warranty_life_span: string;
    total_expected_life_span: string;
    total_warranty_alerts: string;
    soc_min_per: string;
    soc_max_per: string;
    bms_soh: string;
    equivalent_cycles_count: string;
    charging_crate_min: string;
    charging_crate_max: string;
    charging_crate_avg: string;
    discharging_crate_min: string;
    discharging_crate_max: string;
    discharging_crate_avg: string;
    charging_temp_range: string;
    discharging_temp_range: string;
    charging_crate: string;
    discharging_crate: string;
    cell_voltage_diff: string;
    battery_usage_recommendations: IBatteryUsageRecommendations[];
}
interface IWarrantyGraphSeries {
    name: string;
    data: {
        x: string;
        y: number;
    }[];
}
interface IWarrantyChartSoHData {
    warranty_bms_soh_graph_series: IWarrantyGraphSeries[];
    warranty_start_date: number;
    warranty_end_date: number;
}

interface IWarrantyChartEquivalentCyclesData {
    warranty_equivalent_cycles_count_series: IWarrantyGraphSeries[];
    warranty_start_date: number;
    warranty_end_date: number;
}
interface IWarrantyGraphState {
    category: string;
    model: string;
}