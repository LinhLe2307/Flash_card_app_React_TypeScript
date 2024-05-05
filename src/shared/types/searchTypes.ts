import { SendRequestProps } from './sharedTypes'
import { UserProps } from '../../user/types/userTypes'
export enum SearchInputValueProps {
    SEARCH_LIST = 'SEARCH_LIST',
    SEARCH_LIST_SUCCESS = 'SEARCH_LIST_SUCCESS',
    SEARCH_LIST_FAILURE = 'SEARCH_LIST_FAILURE'
}

export interface SearchListPayloadSaga {
    sendRequest: SendRequestProps,
    searchInput: string
}

export interface SearchListSaga {
    (payload: SearchListPayloadSaga) : {
        type:  SearchInputValueProps.SEARCH_LIST,
        payload: SearchListPayloadSaga
    }
}

export type SearchListAction = {
    type: SearchInputValueProps.SEARCH_LIST_SUCCESS 
    payload: UserProps[]
} | {
    type: SearchInputValueProps.SEARCH_LIST
    payload: SearchListPayloadSaga
}

export interface SearchInputListSuccess {
    (list: SearchListAction): {
        type: SearchInputValueProps.SEARCH_LIST_SUCCESS,
        payload: SearchListAction
    }
}


export interface SearchListState {
    [filter_list: string]: UserProps[]
}