import { get } from '../utilities/apiUtil';
import config from '../configuration/AppConfig';
import { healthAvgAggregationsNoData, healthViewNodata } from '../data/HealthViewData';

export async function getHealthAggregations(selectedBattery: string | undefined) {
    const response = await get(`${config.HEALTH_VIEW_DATA_URL}?battery_uid=${selectedBattery}`);
    return response ? response : healthViewNodata;
}

export async function getHealthSOHData(selectedBattery: string | undefined) {
    const response = await get(`${config.HEALTH_VIEW_BMS_SOH_DATA_URL}?battery_uid=${selectedBattery}`);
    return response
        ? response
        : {
            health_soh_graph_data: [
                { name: 'Actual', data: [] },
                { name: 'Predicted', data: [] },
            ],
            soh_vs_last_month: 0.0
        };
}

export async function getBatteryDegradationCapacityData(selectedBattery: string | undefined) {
    const response = await get(`${config.HEALTH_VIEW_BATTERY_DEGRADATION_CAPACITY_DATA_URL}?battery_uid=${selectedBattery}`);
    return response
        ? response
        : {
            health_capacity_graph_data: [
                { name: 'Actual', data: [] },
                { name: 'Predicted', data: [] },
            ],
            latest_capacity_ah: '-',
            capacity_vs_last_month: 0.0,
        };
}

export async function getBatteryDegradationCyclesData(selectedBattery: string | undefined) {
    const response = await get(`${config.HEALTH_VIEW_BATTERY_DEGRADATION_CYCLES_DATA_URL}?battery_uid=${selectedBattery}`);
    return response
        ? response
        : {
            health_cycles_graph_data: [
                { name: 'Battery Degradation Cycles', data: [] },
            ],
            cycles_vs_last_month: 0.0
        };
}


export async function getHealthAvgAggregations(selectedBattery: string | undefined, fromDate: string, toDate: string) {
    if (fromDate != '' && toDate != '') {
        const response = await get(
            `${config.HEALTH_AVG_AGGREGATIONS_URL}?battery_uid=${selectedBattery}&from_date=${fromDate}&to_date=${toDate}`
        );
        return response ? response : healthAvgAggregationsNoData;
    }
}
