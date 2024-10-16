import axios, { AxiosResponse } from 'axios';
import config from '../configuration/AppConfig';
import { intercept } from './interceptorUtil';
const api = axios.create({
    baseURL: config.API_BASE_URL,
});
intercept(api);
export const get = async (url: string) => {
    const response = await api.get(url);
    return response?.data;
};

export const post = async <T>(url: string, body: T): Promise<AxiosResponse> => {
    const response: AxiosResponse = await api.post(url, body);
    return response;
};
