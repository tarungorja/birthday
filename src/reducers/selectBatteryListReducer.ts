import { ActionTypes } from '../enums/actionTypes';
import { IAction } from '../interfaces/Action';

const initialState: IBatteryData[] = [];

function selectedBatteryListReducer(
    state: IBatteryData[] = initialState,
    action: IAction<IBatteryData[]>
): IBatteryData[] {
    switch (action.type) {
        case ActionTypes.SET_SELECTED_BATTERY_IDS:
            return action.payload;
        default:
            return state;
    }
}

export default selectedBatteryListReducer;
