import { ActionTypes } from '../enums/actionTypes';
import { IAction } from '../interfaces/Action';

function selectTagReducer(
    state: Array<IReactSelect> = [],
    action: IAction<IReactSelect[]>
): IReactSelect[] | [] {
    switch (action.type) {
        case ActionTypes.SET_TAGS:
            return [...action.payload];
        default:
            return state;
    }
}

export default selectTagReducer;
