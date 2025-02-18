import { SearchInputValueProps, SearchListFunc } from "../../types/searchTypes"

export const searchInputList: SearchListFunc = (payload) => {
    return {
        type: SearchInputValueProps.SEARCH_LIST,
        payload: payload
    }
}