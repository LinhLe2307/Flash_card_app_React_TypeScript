import { all } from 'redux-saga/effects';
import imageSaga from './imageSaga';

export default function* rootSaga() {
    yield all([
        imageSaga()
    ])
  }