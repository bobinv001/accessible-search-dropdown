import { call, put, takeEvery } from 'redux-saga/effects';
import { getManagersList } from '../../services/managers';
import { ResponseType } from '../../services/types';
import { ManagerActions } from './constants';
import { errorFetchingManagers, setManagers } from './managers.actions';

function* handleFetchManagers() {
    const { responseType, data } = yield call(getManagersList);

    if (responseType === ResponseType.API_SUCCESS) {
        yield put(setManagers(data));
    } else {
        yield put(errorFetchingManagers());
    }
}

export const managersSagas = [takeEvery(ManagerActions.FETCH_MANAGERS_SAGA, handleFetchManagers)];
