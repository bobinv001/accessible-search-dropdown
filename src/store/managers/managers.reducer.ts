import { Reducer } from 'redux';
import { ManagerActions } from './constants';
import { ReduceActions } from './managers.actions';
import { FetchStatus, IManagersState } from './types';

export const managersInitialState: IManagersState = {
    list: [],
    status: FetchStatus.NOT_LOADED,
};

export const managersReducer: Reducer<IManagersState, ReduceActions> = (state = managersInitialState, action): IManagersState => {
    switch (action.type) {
        case ManagerActions.SET_MANAGERS: {
            return {
                ...state,
                list: [...action.payload.managers],
                status: FetchStatus.SUCCESS,
            };
        }
        case ManagerActions.ERROR_FETCHING_MANAGERS: {
            return {
                ...state,
                list: [],
                status: FetchStatus.ERROR,
            };
        }
        default: {
            return state;
        }
    }
};
