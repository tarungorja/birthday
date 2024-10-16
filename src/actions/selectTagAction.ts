import { ActionTypes } from '../enums/actionTypes';
export const setTags = (tagsData: IReactSelect[]) => {
    return {
        type: ActionTypes.SET_TAGS,
        payload: tagsData,
    };
};
