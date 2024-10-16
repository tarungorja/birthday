import { get } from '../utilities/apiUtil';
import config from '../configuration/AppConfig';

export async function getReleaseNotes(version?: string) {
    if (version) {
        const response = await get(config.RELEASE_NOTES_URL + `?version=${version}`);
        return response;
    }
    const response = await get(config.RELEASE_NOTES_URL);
    return response;
}
