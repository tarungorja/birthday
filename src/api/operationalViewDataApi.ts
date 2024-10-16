import { get } from '../utilities/apiUtil';
import config from '../configuration/AppConfig';
import { operationalViewNoData, operationalAggregatedNoData } from '../data/OperationalViewData';

export async function getOperationalViewData(selectedBattery: string | undefined) {
    const response = await get(
        `${config.OPERATIONAL_VIEW_DATA_URL}?battery_uid=${selectedBattery}`
    );
    return response ? response : operationalViewNoData;
}
export async function getOperationalAvgAggregations(selectedBattery: string | undefined, fromDate: string, toDate: string) {
    const response = await get(
        `${config.OPERATIONAL_AVG_AGGREGATIONS_DATA_URL}?battery_uid=${selectedBattery}&from_date=${fromDate}&to_date=${toDate}`
    );
    return response ? response : operationalAggregatedNoData;
}
export async function getOperationalSOCRangeGraphData(selectedBattery: string | undefined) {
    const response = await get(
        `${config.OPERATIONAL_SOC_RANGE_GRAPH_DATA_URL}?battery_uid=${selectedBattery}`
    );
    return response;
}
export async function getOperationalValuedSOCGraphData(selectedBattery: string | undefined) {
    const response = await get(
        `${config.OPERATIONAL_VALUED_SOC_GRAPH_DATA_URL}?battery_uid=${selectedBattery}`
    );
    return response;
}
export async function getOperationalChargingCyclesData(selectedBattery: string | undefined) {
    const response = await get(
        `${config.OPERATIONAL_CHARGING_CYCLES_GRAPH_DATA_URL}?battery_uid=${selectedBattery}`
    );
    return response;
}
export async function getOperationalDischargingCyclesData(selectedBattery: string | undefined) {
    const response = await get(
        `${config.OPERATIONAL_DISCHARGING_CYCLES_GRAPH_DATA_URL}?battery_uid=${selectedBattery}`
    );
    return response;
}
