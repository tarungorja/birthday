import { ActionTypes } from '../enums/actionTypes';
import { IAction } from '../interfaces/Action';

const initialState: IDateRange = {
    fromDate: '',
    toDate: '',
};

function dateRangeReducer(
    state: IDateRange = initialState,
    action: IAction<IDateRange>
): IDateRange {
    switch (action.type) {
        case ActionTypes.SET_DATE_RANGE:
            return {
                fromDate: action.payload.fromDate,
                toDate: action.payload.toDate,
            };
        default:
            return state;
    }
}

export default dateRangeReducer;
