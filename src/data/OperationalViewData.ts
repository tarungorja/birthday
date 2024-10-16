
export const operationalAggregatedNoData: IOperationalAvgAggregations = {
    charge_cycle_count: '-',
    discharge_cycle_count: '-',
    cumulative_energy_consumed_kwh: '-',
    cumulative_energy_discharged_kwh: '-',
    total_charge_duration_hrs: '-',
    total_discharge_duration_hrs: '-',
};

export const operationalViewNoData: IOperationalViewData = {

    operational_values: operationalAggregatedNoData,
    operational_thresholds: {
        best_Crate_to_use: '-',
        best_SOC_limits: '-',
        temperature_limits: '-',
    },
    stress_factors: [],
    battery_usage_recommendations: [
        {
            title: '-',
            recommendation: '-'
        },
        {
            title: '-',
            recommendation: '-'
        },
        {
            title: '-',
            recommendation: '-'
        },
        {
            title: '-',
            recommendation: '-'
        }
    ],
};
