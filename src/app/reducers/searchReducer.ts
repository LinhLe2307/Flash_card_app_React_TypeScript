import { SearchListAction, SearchListState, SearchInputValueProps } from '../../types/searchTypes'

const initialState: SearchListState = {
    search_input: ''
}
const searchReducer = (state = initialState, action: SearchListAction) => {
    switch(action.type) {
        case SearchInputValueProps.SEARCH_LIST:
            const newProps = {...state}
            newProps['search_input'] = action.payload.searchInput
            return newProps
        default:
            return state
    }
}

export default searchReducer