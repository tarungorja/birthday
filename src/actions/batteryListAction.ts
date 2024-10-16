import { ActionTypes } from '../enums/actionTypes';
export const setBatteries = (batteries: Array<IBatteryData>) => {
    return {
        type: ActionTypes.SET_BATTERIES,
        payload: batteries,
    };
};
