import { ActionTypes } from '../enums/actionTypes';
import { IAction } from '../interfaces/Action';
function batteryListReducer(
    state: Array<IBatteryData> = [],
    action: IAction<IBatteryData[]>
): IBatteryData[] | [] {
    switch (action.type) {
        case ActionTypes.SET_BATTERIES:
            return [...action.payload];
        default:
            return state;
    }
}

export default batteryListReducer;
