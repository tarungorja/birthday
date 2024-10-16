import { get } from '../utilities/apiUtil';
import config from '../configuration/AppConfig';

export async function getSignalsData(moduleName: string, page: number, fromDate: string, toDate: string,) {
    if (fromDate && toDate) {
        const response = await get(`${config.SIGNAL_DATA_URL}?module=${moduleName}&from_date=${fromDate}&to_date=${toDate}&page=${page}&page_size=10`);
        return response;
    }
    const response = await get(`${config.SIGNAL_DATA_URL}?module=${moduleName}&page=${page}&page_size=10`);
    return response;
}

export async function getSignalEventData(object_id?: string) {
    const response = await get(`${config.SIGNAL_EVENT_DATA_URL}?signal_id=${object_id}`);
    return response;
}

export async function getBatterySignalsData(batteryUid?: string) {
    const response = await get(`${config.SIGNAL_DATA_URL}?battery_uid=${batteryUid}`);
    return response;
}

export async function getSignalTreeData(bat_uid: string, signalId: string) {
    const response = await get(`${config.SIGNAL_TREE_DATA_URL}?battery_uid=${bat_uid}&signal_id=${signalId}`);
    return response;
}

export async function getSignalTreeDataWithDateRange(bat_uid: string, signalId: string, fromDate: string, toDate: string, sort: string) {
    const response = await get(`${config.SIGNAL_TREE_DATA_URL}?battery_uid=${bat_uid}&from_date=${fromDate}&to_date=${toDate}&signal_id=${signalId}&sort=${sort}`);
    return response;
}