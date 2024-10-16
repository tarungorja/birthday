interface IOperationalViewProps {
    batteryMeta: IBatteryData | undefined;
    generatingAUC: boolean;
    AUCMetaData?: IAucList;
    generateNewAUC: () => void;
    batteryOperationalData?: IOperationalViewData;
    avgAggregationsData: IOperationalAvgAggregations | undefined;
    dateRange: [string, string];
    openAUCPage: (batteryData: IBatteryData | undefined) => void;
    socRangeGraphSeries: ISOCRangeGraphData[];
    valuedSOCGraphSeries: IValuedSOCGraphData[];
    operationalViewGraphState: IOperationalViewGraphState;
    setGraphState: (data: IOperationalViewGraphState) => void;
    options: ApexCharts.ApexOptions;
    chargingCyclesGraphData: IChargingCyclesGraphSeries[];
    dischargingCyclesGraphData: IChargingCyclesGraphSeries[];
}

interface IBatteryUsageRecommendations {
    title: string;
    recommendation: string;
}
interface IOperationalViewData {
    operational_values: IOperationalAvgAggregations;
    operational_thresholds: {
        best_Crate_to_use: string;
        best_SOC_limits: string;
        temperature_limits: string;
    };
    stress_factors: [string] | [];
    battery_usage_recommendations: IBatteryUsageRecommendations[];
}

interface IOperationalAvgAggregations {
    charge_cycle_count: string;
    discharge_cycle_count: string;
    cumulative_energy_consumed_kwh: string;
    cumulative_energy_discharged_kwh: string;
    total_charge_duration_hrs: string;
    total_discharge_duration_hrs: string;
}
interface IOperationalViewGraphProps {
    socRangeGraphSeries: ISOCRangeGraphData[];
    valuedSOCGraphSeries: IValuedSOCGraphData[];
    operationalViewGraphState: IOperationalViewGraphState;
    options: ApexCharts.ApexOptions;
    setGraphState: (data: IOperationalViewGraphState) => void;
}
interface IChargingCycleData {
    x: number;
    y: number;
}
interface IDischargingCycleData {
    x: number;
    y: number;
}
interface ISOCRangeGraphData {
    x: string;
    y: number;
    start_soc: number;
    end_soc: number;
}

interface IValuedSOCGraphData {
    x: string;
    y: number;
}

interface IOperationalViewGraphState {
    category?: string;
    model?: string;
}
interface IChargingCyclesGraphSeries {
    name: string;
    data: IChargingCycleData[];
}