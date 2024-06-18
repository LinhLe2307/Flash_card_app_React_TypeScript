import { all } from 'redux-saga/effects';
import imageSaga from './imageSaga';
import formSaga from './formSaga';
export default function* rootSaga() {
    yield all([
        imageSaga(),
        formSaga()
    ])
  }