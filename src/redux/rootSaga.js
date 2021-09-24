//all allows to resolve effects in parallel, and call allows to call funcions
import { all, call} from 'redux-saga/effects';

import userSagas from './User/user.sagas';

export default function* rootSaga(){
    //here we pass the sagas
    yield all([call(userSagas)])
}