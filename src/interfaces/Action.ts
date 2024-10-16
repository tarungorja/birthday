import { ActionTypes } from "../enums/actionTypes";

export interface IAction<T> {
    type: ActionTypes;
    payload: T;
}
