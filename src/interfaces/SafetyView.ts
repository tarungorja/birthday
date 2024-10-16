interface ISafetyViewProps {
    batteryMeta: IBatteryData | undefined;
    generatingAUC: boolean;
    AUCMetaData?: IAucList;
    generateNewAUC: () => void;
    dateRange: [string, string];
    openAUCPage: (batteryData: IBatteryData | undefined) => void;
    safetyAvgAggregations?: ISafetyAvgAggregations;
    safetyAggregations?: ISafetyAggregations;
    handleRelayout: (event: Plotly.PlotRelayoutEvent) => void;
    showDefaultKPIs: boolean;
    safetyViewGraphState: ISafetyViewGraphState;
    setGraphState: (graphState: ISafetyViewGraphState) => void;
    safetyViewGraphData: IHeatMapData | ISafetyIncidentsChartData;
    safetyViewGraphLayout: Partial<Plotly.Layout>;
    handleNavigation: (eventData: Readonly<Plotly.PlotMouseEvent>) => void;
}
interface ISafetyDailySummaries {
    avg_min_temp: number;
    avg_max_temp: number;
    avg_over_temp_incidents: number;
    avg_over_charging_incidents: number;
    avg_BMS_safety_alerts: number;
    avg_cell_voltage_diff: number;
    operated_temp_range: string;
}

interface IBatteryUsageRecommendations {
    title: string;
    recommendation: string;
}
interface ISafetyAggregations {
    temperature_celsius_min: string;
    temperature_celsius_max: string;
    cell_voltage_diff: string;
    avg_temp_deviation_charging: string;
    avg_temp_deviation_discharging: string;
    overcharging_incidents: string;
    safety_aggregated_values: {
        operated_temp_range: string;
        avg_cell_voltage_diff: string;
        over_temp_incidents: string;
        over_charging_incidents: string;
        bms_safety_alerts: string;
    };
    battery_usage_recommendations: IBatteryUsageRecommendations[];
    season: string;
    temperature_range: string;
    cell_status: string;
    criticality: string;
    efficiency: string;
    safety_condition: string;
}

interface ISafetyAvgAggregations {
    operated_temp_range: string;
    avg_cell_voltage_diff: string;
    over_temp_incidents: string;
    over_charging_incidents: string;
    bms_safety_alerts: string;
}

// interface ISafetyIncidentsDatapoint {
//     x: string;
//     y: number;
//     z: number;
//     signal_id: string;
//     signal_title: string;
//     severity: string;                    will remove after confirming plotly 
// }
interface ISafetyIncidentsData {
    x: string[],
    y: number[],
    z: number[];
    customdata: [string, string, string][] | [];
}
interface ISafetyIncidentsChartData {
    x: string[];
    y: number[];
    mode: string;
    marker: {
        size: number[];
        sizeref: number;
        sizemode: string;
    };
    customdata: [string, string, string][];
    hovertemplate: string;
}

interface ISafetyViewGraphState {
    category: string;
    model: string;
}

interface ISafetyViewPageGraphProps {
    safetyViewGraphState: ISafetyViewGraphState;
    setGraphState: (graphState: ISafetyViewGraphState) => void;
    safetyViewGraphData: ISafetyIncidentsChartData | IHeatMapData;
    safetyViewGraphLayout: Partial<Plotly.Layout>;
    handleRelayout: (event: Plotly.PlotRelayoutEvent) => void;
    handleNavigation: (eventData: Readonly<Plotly.PlotMouseEvent>) => void;
}

interface ISafetyIncidents {
    safety_incidents_chart_data: ISafetyIncidentsData;
    latest_date: string;
    initial_date: string;
}