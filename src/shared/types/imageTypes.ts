import React from "react";
import { InputHandlerProps } from "./formTypes"
import { GenericProps } from "./sharedTypes"
import {
    FieldErrors,
    UseFormRegister,
    UseFormSetValue
  } from "react-hook-form";
import { AuthInputs } from "../../user/types/userTypes";

export enum ImageInputValueProps {
    OPEN_UNSPLASH = 'OPEN_UNSPLASH',
    SEARCH_KEYWORD = 'SEARCH_KEYWORD',
    SEARCHING='SEARCHING',
    PHOTOS_ADDED='PHOTOS_ADDED'
}

export interface OpenUnsplashPayload {
    inputId: string
    initialInputs: ImageState
}

export interface SearchingPayload {
    inputId: string
}

export interface SearchKeywordPayload {
    value: string
    inputId: string
}

export interface PhotosAddedPayload {
    photos: [],
    inputId: string
}

export type ImageAction = ({
    type: ImageInputValueProps.OPEN_UNSPLASH 
    payload: OpenUnsplashPayload
} | {
    type: ImageInputValueProps.SEARCHING
    payload: SearchingPayload
} | {
    type: ImageInputValueProps.PHOTOS_ADDED
    payload: PhotosAddedPayload
} | {
    type: ImageInputValueProps.SEARCH_KEYWORD
    payload: SearchKeywordPayload
})

// export interface ImageAction {
//     type: ImageInputValueProps
//     payload: OpenUnsplashPayload | SearchingPayload | PhotosAddedPayload | SearchKeywordPayload
// }

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

export interface ImageListProps { 
    searchKeyword: string, 
    isSearching: boolean, 
    addedPhotosHandler: ImageGenericProps<[]>,
    photos: [],
    inputHandler: InputHandlerProps,
    cardId: string,
    setPickedImage: React.Dispatch<React.SetStateAction<string>>
  }

export interface ImageUploadProps {
    id: string
    center: boolean
    errorText: FieldErrors<AuthInputs>
    register: UseFormRegister<AuthInputs>;
    setValue: UseFormSetValue<AuthInputs>
}