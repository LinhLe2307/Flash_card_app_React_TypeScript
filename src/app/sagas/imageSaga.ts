import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";

import photoApi from "../../shared/api/photoApi";
import { FetchImagePayload } from "../../shared/types/imageTypes";
import { fetchImageFailure, fetchImageSuccess, searchingButtonImage } from "../actions/image";

function* getImages(action: PayloadAction<FetchImagePayload>) {
    try {
        const response:AxiosResponse = yield call(
            photoApi.getImage,
            action.payload.searchKeyword
        )
        yield put(searchingButtonImage({
            inputId: action.payload.inputId 
        }))
        yield put(fetchImageSuccess({
            photos: response.data.results,
            inputId: action.payload.inputId
        }))

    } catch(error) {
        yield put(fetchImageFailure())
    }
}

function* imageSaga () {
    yield takeLatest('FETCH_IMAGE_REQUEST', getImages)
}

export default imageSaga