import { ActionTypes } from '../enums/actionTypes';
export const setCategory = (tagsData: IReactSelect[]) => {
    return {
        type: ActionTypes.SET_CATEGORY,
        payload: tagsData,
    };
};
