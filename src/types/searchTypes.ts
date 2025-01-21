export enum SearchInputValueProps {
    SEARCH_LIST = 'SEARCH_LIST'
}

export interface SearchListPayload {
    searchInput: string
}

export type SearchListAction = {
    type: SearchInputValueProps.SEARCH_LIST
    payload: SearchListPayload
}

export interface SearchListFunc {
    (payload: SearchListPayload) : SearchListAction
}

export interface SearchListState {
    [search_input: string]: string
}