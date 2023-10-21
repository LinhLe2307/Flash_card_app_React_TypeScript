import { InputHandlerProps } from "./formTypes"
import { GenericProps } from "./sharedTypes"

export enum ImageInputValueProps {
    OPEN_UNSPLASH = 'OPEN_UNSPLASH',
    SEARCH_KEYWORD = 'SEARCH_KEYWORD',
    SEARCHING='SEARCHING',
    PHOTOS_ADDED='PHOTOS_ADDED'
}

// interface IdProps<T> {
//     [input:string]: typeof T
// }

export type ImageAction = ({
    type: ImageInputValueProps.OPEN_UNSPLASH | ImageInputValueProps.SEARCHING
    inputId: string
} | {
    type: ImageInputValueProps.PHOTOS_ADDED
    photos: []
    inputId: string
} | {
    type: ImageInputValueProps.SEARCH_KEYWORD
    value: string
    inputId: string
})

export interface ImageState {
    [cardId: string]: {
        isOpeningUnsplash: boolean,
        searchKeyword: string,
        isClickingButton: boolean,
        photos: []
    }
}

export interface SearchKeywordHandlerProps {
    (event:React.ChangeEvent<HTMLInputElement>, cardId: string) : void,
}

export interface AddedPhotosHandlerProps {
    (photos: [], cardId: string) : void,
}

export interface useImageProps {
    (initialInputs: ImageState) : [
        ImageState,
        searchKeywordHandler: SearchKeywordHandlerProps,
        openUnsplashHandler: GenericProps<string>,
        searchingButtonHandler: GenericProps<string>,
        addedPhotosHandler: AddedPhotosHandlerProps
    ] 
}

export interface ImageListPProps { 
    searchKeyword: string, 
    isSearching: boolean, 
    addedPhotosHandler:AddedPhotosHandlerProps,
    photos: [],
    inputHandler: InputHandlerProps,
    cardId: string
  }
