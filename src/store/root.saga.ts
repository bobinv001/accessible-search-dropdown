import { all } from 'redux-saga/effects';

import { managersSagas } from './managers/managers.saga';

function* rootSaga() {
    return yield all([...managersSagas]);
}

export { rootSaga };
