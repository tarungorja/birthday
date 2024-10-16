import { get } from '../utilities/apiUtil';
import config from '../configuration/AppConfig';

export async function getCategoryData() {
    const response = await get(`${config.CATEGORY_DATA_URL}`);
    return response;
}
