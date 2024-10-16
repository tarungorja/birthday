import { get } from '../utilities/apiUtil';
import config from '../configuration/AppConfig';

export async function getBatteryList(pageNo: number) {
    const response = await get(`${config.BATTERY_DATA_URL}?page=${pageNo}&page_size=10`);
    if (response) {
        return response;
    } else {
        return [];
    }
}

export async function getBatteryMeta(batteryUId?: string) {
    const response = await get(config.BATTERY_DATA_URL + `?battery_uid=${batteryUId}`);
    return response[0];
}

export async function getSearchedBatteries(assetName: string) {
    const response = await get(config.BATTERY_SEARCH_URL + `?search=${assetName}&page=1&page_size=100`);
    if (response) {
        return response;
    } else {
        return [];
    }
}
