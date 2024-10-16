export const warrantyAggregationsNoData: IWarrantyAggregations = {
    warranty_start_date: '-',
    warranty_end_date: '-',
    status: '-',
    calender_life: '-',
    total_warranty_life_span: '-',
    total_expected_life_span: '-',
    total_warranty_alerts: '-',
    soc_min_per: '-',
    soc_max_per: '-',
    bms_soh: '-',
    equivalent_cycles_count: '-',
    charging_crate_min: '-',
    charging_crate_max: '-',
    charging_crate_avg: '-',
    discharging_crate_min: '-',
    discharging_crate_max: '-',
    discharging_crate_avg: '-',
    charging_temp_range: '-',
    discharging_temp_range: '-',
    charging_crate: '-',
    discharging_crate: '-',
    cell_voltage_diff: '-',
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

export const warrantyAvgAggregationsNoData: IWarrantyAvgAggregations = {
    avg_SoH: '-',
    avg_min_soc: '',
    avg_max_soc: '',
    avg_min_C_rate_charging: '',
    avg_max_C_rate_charging: '',
    avg_min_C_rate_discharging: '',
    avg_max_C_rate_discharging: '',
    avg_equivalent_cycles: '-',
    charging_temp_range: '-',
    discharging_temp_range: '-',
    avg_cell_voltage_diff: '-',
};
