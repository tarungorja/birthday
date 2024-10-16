import { get } from '../utilities/apiUtil';
import config from '../configuration/AppConfig';
import { warrantyAggregationsNoData, warrantyAvgAggregationsNoData } from '../data/WarrantyViewData';

export async function getWarrantyAggregations(selectedBattery: string | undefined) {
    const response = await get(`${config.WARRANTY_VIEW_DATA_URL}?battery_uid=${selectedBattery}`);
    return response ? response : warrantyAggregationsNoData;
}

export async function getWarrantyAvgAggregations(
    selectedBattery: string | undefined,
    fromDate: string,
    toDate: string
) {
    if (fromDate != '' && toDate != '') {
        const response = await get(
            `${config.WARRANTY_AVG_AGGREGATIONS_URL}?battery_uid=${selectedBattery}&from_date=${fromDate}&to_date=${toDate}`
        );
        return response ? response : warrantyAvgAggregationsNoData;
    }
}

export async function getWarrantyBMSSoHGraphData(selectedBattery: string | undefined) {
    const response = await get(`${config.WARRANTY_BMS_SOH_GRAPH_DATA_URL}?battery_uid=${selectedBattery}`);
    return response ? response :
        {
            warranty_bms_soh_graph_series: [{ name: 'BMS_SoH', data: [] }],
            warranty_start_date: '',
            warranty_end_date: ''
        };
}

export async function getWarrantyEquivalentCyclesData(selectedBattery: string | undefined) {
    const response = await get(`${config.WARRANTY_EQUIVALENT_CYCLES_GRAPH_DATA_URL}?battery_uid=${selectedBattery}`);
    return response ? response :
        {
            warranty_equivalent_cycles_count_series: [{ name: 'Equivalent Cycles', data: [] }],
            warranty_start_date: '',
            warranty_end_date: ''
        };
}