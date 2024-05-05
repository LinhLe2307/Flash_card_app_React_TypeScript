import { PayloadAction } from '@reduxjs/toolkit'
import { call, takeLatest, put } from 'redux-saga/effects'
import { searchInputListSuccess, searchInputListFailure } from '../actions/search'
import { SearchListPayloadSaga, SearchInputValueProps } from '../../shared/types/searchTypes'
import { UserProps } from '../../user/types/userTypes'

function* getSearchList(action: PayloadAction<SearchListPayloadSaga>): any {
    try {
        const sendRequest = action.payload.sendRequest;
        const searchInput = action.payload.searchInput;
        const usersResponse = yield call(sendRequest, 
            `/api/users`, 
            'GET', 
            null, 
            {
                'Content-Type': 'application/json'
            }
        );
        const list = usersResponse.users.filter((user: UserProps) => `${user.firstName} ${user.lastName}`.indexOf(searchInput) !== -1)

        yield put(searchInputListSuccess(list));
    } catch(error) {
        yield put(searchInputListFailure());
    }
}

function* searchSaga() {
    yield takeLatest(SearchInputValueProps.SEARCH_LIST, getSearchList)
}

export default searchSaga