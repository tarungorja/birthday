import { AxiosError, AxiosInstance } from 'axios';

export function intercept(api: AxiosInstance) {
    api.interceptors.request.use((config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `${token}`;
        }
        return config;
    });

    api.interceptors.response.use(
        (response) => {
            return response;
        },
        (error: AxiosError) => {
            return Promise.reject(error);
        }
    );
}

