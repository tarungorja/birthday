import { get, post } from '../utilities/apiUtil';
import config from '../configuration/AppConfig';


export async function getAUCListByBatteryId(batteryUId: string | undefined) {
    const response = await get(
        `${config.BATTERY_AUC_LIST_URL}?battery_uid=${batteryUId}`
    );
    return response;
}

export async function downloadAUC(batteryUId: string  | undefined, certificateId: string  | undefined) {
    const response = await get(
        `${config.BATTERY_AUC_DOWNLOAD_URL}?battery_uid=${batteryUId}&certificate_id=${certificateId}`
    );
    return response;
}

export async function generateAUC(batteryUId: string  | undefined) {
    const response = await post(
        `${config.BATTERY_AUC_GENERATE_URL}?battery_uid=${batteryUId}`, batteryUId
    );
    return response;
}

