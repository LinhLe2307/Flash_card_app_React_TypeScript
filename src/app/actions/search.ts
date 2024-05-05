import { SearchInputValueProps, SearchListSaga, SearchInputListSuccess } from "../../shared/types/searchTypes"

export const searchInputList: SearchListSaga = (payload) => {
    return {
        type: SearchInputValueProps.SEARCH_LIST,
        payload: payload
    }
} 
export const searchInputListSuccess: SearchInputListSuccess = (list) => {
    return {
        type: SearchInputValueProps.SEARCH_LIST_SUCCESS,
        payload: list
    }
} 
export const searchInputListFailure = () => {
    return {
        type: SearchInputValueProps.SEARCH_LIST_FAILURE
    }
} 