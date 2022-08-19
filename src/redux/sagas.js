import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import appSagas from './app/saga';

export default function* rootSaga() {
  yield all([authSagas(), appSagas()]);
}
