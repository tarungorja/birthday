import { ActionTypes } from '../enums/actionTypes';
import { IAction } from '../interfaces/Action';

function selectCategoryReducer(
    state: Array<IReactSelect> = [],
    action: IAction<IReactSelect[]>
): IReactSelect[] | [] {
    switch (action.type) {
        case ActionTypes.SET_CATEGORY:
            return [...action.payload];
        default:
            return state;
    }
}

export default selectCategoryReducer;
