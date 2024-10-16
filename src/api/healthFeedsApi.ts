import { get } from '../utilities/apiUtil';
import config from '../configuration/AppConfig';

export async function getHealthFeeds(
    moduleName: string,
    fromDate: string,
    toDate: string,
    pageNo: number
): Promise<IHealthFeeds[]> {
    if (fromDate && toDate) {
        const response = await get(
            `${config.HEALTH_FEEDS_URL}?module=${moduleName}&from_date=${fromDate}&to_date=${toDate}&page=${pageNo}&page_size=5`
        );
        return response;
    } else {
        const response = await get(`${config.HEALTH_FEEDS_URL}?module=${moduleName}&page=${pageNo}&page_size=5`);
        return response;
    }
}

export async function getHealthFeedsByBatteryIds(
    moduleName: string,
    selectedBatteryList: IBatteryData[],
    fromDate: string,
    toDate: string,
    pageNo: number
) {
    let batteries = '';
    for (let i = 0; i < selectedBatteryList.length; i++) {
        batteries = batteries + '&batteries=' + selectedBatteryList[i].bat_uid;
    }
    if (fromDate && toDate) {
        const response = await get(
            `${config.HEALTH_FEEDS_BY_BATTERY_ID_URL}/?module=${moduleName}${batteries}&from_date=${fromDate}&to_date=${toDate}&page=${pageNo}&page_size=5`
        );
        return response;
    } else {
        const response = await get(
            `${config.HEALTH_FEEDS_BY_BATTERY_ID_URL}/?module=${moduleName}${batteries}&page=${pageNo}&page_size=5`
        );
        return response;
    }
}

export async function getFeeds(
    moduleName: string,
    selectedBatteryList: IBatteryData[],
    fromDate: string,
    toDate: string,
    pageNo: number,
    categories: IReactSelect[],
    tags: IReactSelect[]
) {
    let url = `${config.FEEDS_URL}?module=${moduleName}&page=${pageNo}&page_size=5`;
    if (selectedBatteryList.length) {
        url += '&batteries=';
        for (let i = 0; i < selectedBatteryList.length; i++) {
            url += selectedBatteryList[i].bat_uid + ',';
        }
        url = url.slice(0, -1);
    }
    if (fromDate && toDate) {
        url += `&from_date=${fromDate}&to_date=${toDate}`;
    }
    if (categories.length) {
        url += '&categories=';
        for (let i = 0; i < categories.length; i++) {
            url += categories[i].value + ',';
        }
    }
    if (tags.length) {
        url += '&tags=';
        for (let i = 0; i < tags.length; i++) {
            url += tags[i].value + ',';
        }
    }
    const response = await get(url);
    if (response) {
        return response;
    }
    return [];
}

export async function getFeedPlots(feed_id: string) {
    const response = await get(`${config.FEED_PLOT_URL}?feed_id=${feed_id}`);
    return response;
}
