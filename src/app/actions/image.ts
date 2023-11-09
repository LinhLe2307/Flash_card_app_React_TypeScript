import { ImageInputValueProps, OpenUnsplashPayload, PhotosAddedPayload, SearchKeywordPayload, SearchingPayload } from "../../shared/types/imageTypes"

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

export const searchingButtonImage = (image: SearchingPayload) => {
    return {
        type: ImageInputValueProps.SEARCHING,
        payload: image
    }
}

export const photosAdded = (image: PhotosAddedPayload) => {
    return {
        type: ImageInputValueProps.PHOTOS_ADDED,
        payload: image
    }
}
