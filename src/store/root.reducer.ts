import { combineReducers } from 'redux';

import { managersInitialState, managersReducer } from './managers/managers.reducer';
import { IState } from './types';

const initialState: IState = {
    managers: managersInitialState,
};

const rootReducer = combineReducers({
    managers: managersReducer,
});

export { rootReducer, initialState };
