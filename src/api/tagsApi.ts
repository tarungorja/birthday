import { get } from '../utilities/apiUtil';
import config from '../configuration/AppConfig';

export async function getTagsData() {
    const response = await get(`${config.TAG_DATA_URL}`);
    return response;
}
