import { ActionTypes } from '../enums/actionTypes';
import { IAction } from '../interfaces/Action';

const initialState: string = '';

function selectedBatteryIdReducer(
    state: string = initialState,
    action: IAction<string>
): string {
    switch (action.type) {
        case ActionTypes.SET_SELECTED_BATTERY_ID:
            return action.payload;
        default:
            return state;
    }
}

export default selectedBatteryIdReducer;
