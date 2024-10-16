import { ActionTypes } from '../enums/actionTypes';
export const setSelectedBatteryIds = (batteryIds: IBatteryData[]) => {
    return {
        type: ActionTypes.SET_SELECTED_BATTERY_IDS,
        payload: batteryIds,
    };
};
