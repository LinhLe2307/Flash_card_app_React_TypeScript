import { useEffect, useReducer } from "react"
import { AddedPhotosHandlerProps, ImageAction, ImageInputValueProps, ImageState, SearchKeywordHandlerProps, useImageProps } from "../types/imageTypes"
import { GenericProps } from "../types/sharedTypes"

const imageReducer = (state: ImageState, action:ImageAction) => {
    switch (action.type) {
      case ImageInputValueProps.OPEN_UNSPLASH:
        let newProps = {...state}
        for (const inputId in state){
          if (inputId === action.inputId) {
            newProps[inputId].isOpeningUnsplash = true
          } else {
            newProps[inputId].isOpeningUnsplash = false
          }
        }
        return newProps
  
      case ImageInputValueProps.SEARCH_KEYWORD:
        let newKeyword = {...state}
        for (const inputId in state){
          if (inputId === action.inputId) {
            newKeyword[inputId].searchKeyword = action.value
          } 
        }
        return newKeyword

    
        case ImageInputValueProps.SEARCHING:
            let newSearchingState = {...state}
            for (const inputId in state){
                if (inputId === action.inputId) {
                    newSearchingState[inputId].isClickingButton = true
                }
            }
            return newSearchingState

        case ImageInputValueProps.PHOTOS_ADDED:
            let newPhotosState = {...state}
            for (const inputId in state){
                if (inputId === action.inputId) {
                    newPhotosState[inputId].photos = action.photos
                }
            }
            return newPhotosState
    }
  
  }


export const useImage:useImageProps = (initialInputs) => {
    const [imageState, dispatch] = useReducer(imageReducer, initialInputs)
    
    useEffect(() => {
        console.log(imageState)
    }, [imageState])

      const searchKeywordHandler:SearchKeywordHandlerProps = (event, cardId) => {
        dispatch({
          type: ImageInputValueProps.SEARCH_KEYWORD,
          inputId: cardId,
          value: event.target.value
        })
      }
    
      const openUnsplashHandler:GenericProps<string> = (cardId) => {
          dispatch({
            type: ImageInputValueProps.OPEN_UNSPLASH,
            inputId: cardId
          })
      }

      const searchingButtonHandler:GenericProps<string> = (cardId) => {
        dispatch({
            type: ImageInputValueProps.SEARCHING,
            inputId: cardId
        })
      }

      const addedPhotosHandler: AddedPhotosHandlerProps = (photos, cardId) => {
        dispatch({
            type: ImageInputValueProps.PHOTOS_ADDED,
            photos: photos,
            inputId: cardId
        })
      }
    
    return [imageState, searchKeywordHandler, openUnsplashHandler, searchingButtonHandler, addedPhotosHandler]
}