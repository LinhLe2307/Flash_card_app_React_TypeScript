import { ImageAction, ImageInputValueProps, ImageState } from "../../shared/types/imageTypes"

const initialState: ImageState = {}
const imageReducer = (state = initialState, action: ImageAction) => {
    switch(action.type) {
        case ImageInputValueProps.OPEN_UNSPLASH:
            const newProps = {...state}
            // state = action.payload.initialInputs
            for (const inputId in action.payload.initialInputs){
                if (inputId === action.payload.inputId) {
                    newProps[inputId] = {
                        isOpeningUnsplash: true,
                        searchKeyword: '',
                        isClickingButton: false,
                        photos: []
                    }
                } else {
                    newProps[inputId] = {
                        isOpeningUnsplash: false,
                        searchKeyword: '',
                        isClickingButton: false,
                        photos: []
                    }
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