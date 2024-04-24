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
    FETCH_IMAGES_SUCCESS='FETCH_IMAGES_SUCCESS',
    RESET='RESET',
    FETCH_IMAGE_REQUEST='FETCH_IMAGE_REQUEST',
    INITIAL_IMAGE_STATE="INITIAL_IMAGE_STATE"
}

export interface InputIdTypes {
    inputId: string
}

export interface OpenUnsplashPayload extends InputIdTypes {
    initialInputs: ImageState
}

export interface SearchKeywordPayload extends InputIdTypes{
    value: string
}

export interface FetchSuccessPayload extends InputIdTypes {
    photos: []
}

export interface FetchImagePayload extends InputIdTypes {
    searchKeyword: string
}

export type ImageAction = ({
    type: ImageInputValueProps.OPEN_UNSPLASH 
    payload: OpenUnsplashPayload
} | {
    type: ImageInputValueProps.SEARCHING
    payload: InputIdTypes
} | {
    type: ImageInputValueProps.FETCH_IMAGES_SUCCESS
    payload: FetchSuccessPayload
} | {
    type: ImageInputValueProps.SEARCH_KEYWORD
    payload: SearchKeywordPayload
}) | {
    type: ImageInputValueProps.INITIAL_IMAGE_STATE 
} | {
    type: ImageInputValueProps.FETCH_IMAGE_REQUEST,
    payload: FetchImagePayload
}

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

export interface UseImageProps {
    (initialInputs: ImageState) : [
        ImageState,
        searchKeywordHandler: ImageGenericProps<React.ChangeEvent<HTMLInputElement>>,
        openUnsplashHandler: GenericProps<string>
    ] 
}

export interface ImageListProps { 
    photos: [],
    inputHandler: InputHandlerProps,
    cardId: string,
    setPickedImage: React.Dispatch<React.SetStateAction<string>>
  }

export interface ImageUploadProps {
    center: boolean
    errorText: FieldErrors<AuthInputs>
    register: UseFormRegister<AuthInputs>;
    setValue: UseFormSetValue<AuthInputs>
    imageUrl: string
}