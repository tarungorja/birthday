import { ActionTypes } from '../enums/actionTypes';
import { IAction } from '../interfaces/Action';

export default function batteriesSearchReducer(
    state: boolean = false,
    action: IAction<boolean>
): boolean {
    switch (action.type) {
        case ActionTypes.SET_SEARCH_CLICKED:
            return action.payload;
        default:
            return state;
    }
}
