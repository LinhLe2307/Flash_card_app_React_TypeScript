import { all } from 'redux-saga/effects';
import imageSaga from './imageSaga';
import formSaga from './formSaga';
import searchSaga from './searchSaga';

export default function* rootSaga() {
    yield all([
        imageSaga(),
        formSaga(),
        searchSaga()
    ])
  }