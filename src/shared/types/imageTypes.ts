import { InputHandlerProps } from "./formTypes"
import { GenericProps } from "./sharedTypes"

export enum ImageInputValueProps {
    OPEN_UNSPLASH = 'OPEN_UNSPLASH',
    SEARCH_KEYWORD = 'SEARCH_KEYWORD',
    SEARCHING='SEARCHING',
    PHOTOS_ADDED='PHOTOS_ADDED'
}

export type ImageAction = {inputId: string} & ({
    type: ImageInputValueProps.OPEN_UNSPLASH | ImageInputValueProps.SEARCHING
} | {
    type: ImageInputValueProps.PHOTOS_ADDED
    photos: []
} | {
    type: ImageInputValueProps.SEARCH_KEYWORD
    value: string
})

export interface ImageState {
    [cardId: string]: {
        isOpeningUnsplash: boolean,
        searchKeyword: string,
        isClickingButton: boolean,
        photos: []
    }
}

export interface ImageGenericProps<Type> {
    (arg: Type, cardId: string) : void
}

export interface useImageProps {
    (initialInputs: ImageState) : [
        ImageState,
        searchKeywordHandler: ImageGenericProps<React.ChangeEvent<HTMLInputElement>>,
        openUnsplashHandler: GenericProps<string>,
        searchingButtonHandler: GenericProps<string>,
        addedPhotosHandler: ImageGenericProps<[]>
    ] 
}

export interface ImageListPProps { 
    searchKeyword: string, 
    isSearching: boolean, 
    addedPhotosHandler: ImageGenericProps<[]>,
    photos: [],
    inputHandler: InputHandlerProps,
    cardId: string
  }

export interface ImageUploadProps {
    id: string
    center: boolean
    onInput: InputHandlerProps
    errorText: string | null
    nameId: string
}