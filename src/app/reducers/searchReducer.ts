import { SearchListAction, SearchListState, SearchInputValueProps } from '../../shared/types/searchTypes'

const initialState: SearchListState = {
    filter_list: []
}
const searchReducer = (state = initialState, action: SearchListAction) => {
    switch(action.type) {
        case SearchInputValueProps.SEARCH_LIST_SUCCESS:
            const newProps = {...state}
            newProps['filter_list'] = action.payload
            return newProps
        default:
            return state
    }
}

export default searchReducer