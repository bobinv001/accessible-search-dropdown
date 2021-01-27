import { ManagerActions } from './constants';
import { createAction } from '..';
import { IManager } from '../../services/managers/types';

// Saga actions
export const loadManagers = () => createAction(ManagerActions.FETCH_MANAGERS_SAGA);

// Reduce actions
export const setManagers = (managers: IManager[]) => createAction(ManagerActions.SET_MANAGERS, { managers });

export const errorFetchingManagers = () => createAction(ManagerActions.ERROR_FETCHING_MANAGERS);

export type ReduceActions = ReturnType<typeof setManagers | typeof errorFetchingManagers>;
