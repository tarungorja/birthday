
import { post } from '../utilities/apiUtil';
import config from '../configuration/AppConfig';
import { AxiosResponse } from 'axios';

export async function logIn(email: string, password: string) {
    const logInCred: ILogInCred = { email: email, password: password };
    const response: AxiosResponse = await post(config.LOG_IN_URL, logInCred);
    return response;
}