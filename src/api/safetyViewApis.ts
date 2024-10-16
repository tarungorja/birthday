import { get } from '../utilities/apiUtil';
import config from '../configuration/AppConfig';
import { safetyAggregationsNoData, safetyAvgAggregationsNoData } from '../data/SafetyViewData';

export async function getSafetyAggregations(selectedBattery: string | undefined) {
    const response = await get(`${config.SAFETY_VIEW_DATA_URL}?battery_uid=${selectedBattery}`);
    return response ? response : safetyAggregationsNoData;
}

export async function getSafetyAvgAggregations(selectedBattery: string | undefined, fromDate: string, toDate: string) {
    if (fromDate != '' && toDate != '') {
        const response = await get(
            `${config.SAFETY_AVG_AGGREGATIONS_URL}?battery_uid=${selectedBattery}&from_date=${fromDate}&to_date=${toDate}`
        );
        return response ? response : safetyAvgAggregationsNoData;
    }
}

export async function getSafetyIncidentsMetrics(selectedBattery: string | undefined) {
    const response = await get(`${config.SAFETY_INCIDENTS_DATA_URL}?battery_uid=${selectedBattery}`);
    return response ? response : {
        safety_incidents_chart_data: { x: [], y: [], z: [], customdata: [] },
        latest_signal_date: '2024-10-04',
        oldest_signal_date: '2023-04-06'
    };
}

export async function getHourlyTempMetrics(selectedBattery: string | undefined) {
    const response = await get(`${config.SAFETY_HOURLY_TEMPERATURE_DATA_URL}?battery_uid=${selectedBattery}`);
    return response ? response : { x: [], y: [], z: [] };
}