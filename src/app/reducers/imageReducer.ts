import { ImageAction, ImageInputValueProps, ImageState } from "../../shared/types/imageTypes"

const initialState: ImageState = {}
const imageReducer = (state = initialState, action: ImageAction) => {
    switch(action.type) {
        case ImageInputValueProps.OPEN_UNSPLASH:
            const newProps = {...state}
            
            if (!(action.payload.inputId in state)) {
                newProps[action.payload.inputId] = {
                    isOpeningUnsplash: true,
                    searchKeyword: '',
                    isClickingButton: false,
                    photos: []
                }
            } else if (action.payload.inputId in state) {
                newProps[action.payload.inputId] = {
                    isOpeningUnsplash: !state[action.payload.inputId].isOpeningUnsplash,
                    searchKeyword: state[action.payload.inputId].searchKeyword,
                    isClickingButton: true,
                    photos: state[action.payload.inputId].photos
                }
            }
            return newProps
        case ImageInputValueProps.SEARCH_KEYWORD:
            let newKeyword = {...state}
            for (const inputId in state){
                if (inputId === action.payload.inputId) {
                    newKeyword[inputId].searchKeyword = action.payload.value
                    newKeyword[inputId].isClickingButton = false
                } 
            } 
            return newKeyword
        case ImageInputValueProps.SEARCHING:
            let newSearchingState = {...state}
            for (const inputId in state){
                if (inputId === action.payload.inputId) {
                    newSearchingState[inputId].isClickingButton = true
                }
            }
            return newSearchingState
        case ImageInputValueProps.PHOTOS_ADDED:
            let newPhotosState = {...state}
            for (const inputId in state){
                if (inputId === action.payload.inputId) {
                    newPhotosState[inputId].photos = action.payload.photos
                }
            }
            return newPhotosState
        default:
            return state
    }

}

export default imageReducer