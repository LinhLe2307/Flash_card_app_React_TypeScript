import { FetchImagePayload, ImageInputValueProps, InputIdTypes, OpenUnsplashPayload, FetchSuccessPayload, SearchKeywordPayload } from "../../shared/types/imageTypes"

export const openUnsplashImage = (image: OpenUnsplashPayload) => {
    return {
        type: ImageInputValueProps.OPEN_UNSPLASH,
        payload: image
    }
}

export const searchKeywordImage = (image: SearchKeywordPayload) => {
    return {
        type: ImageInputValueProps.SEARCH_KEYWORD,
        payload: image
    }
}

export const searchingButtonImage = (image: InputIdTypes) => {
    return {
        type: ImageInputValueProps.SEARCHING,
        payload: image
    }
}

export const initialImageState = () => {
    return {
        type: ImageInputValueProps.INITIAL_IMAGE_STATE
    }
}

export const fetchImage = (image: FetchImagePayload)=> {
    return {
        type: ImageInputValueProps.FETCH_IMAGE_REQUEST,
        payload: image
    }
}

export const fetchImageSuccess = (image: FetchSuccessPayload) => {
    return {
        type: ImageInputValueProps.FETCH_IMAGES_SUCCESS,
        payload: image
    }
}
export const fetchImageFailure = () => {
    return {
        type: ImageInputValueProps.FETCH_IMAGES_SUCCESS,
    }
}
