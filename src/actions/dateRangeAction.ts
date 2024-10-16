import { ActionTypes } from '../enums/actionTypes';
export const setDateRange = (dateRange: IDateRange) => {
    return {
        type: ActionTypes.SET_DATE_RANGE,
        payload: dateRange,
    };
};
