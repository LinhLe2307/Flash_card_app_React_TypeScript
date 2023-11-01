import { useCallback, useReducer } from "react"
import { ImageAction, ImageGenericProps, ImageInputValueProps, ImageState, useImageProps } from "../types/imageTypes"
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
            newKeyword[inputId].isClickingButton = false
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

    const searchKeywordHandler: ImageGenericProps<React.ChangeEvent<HTMLInputElement>> = useCallback((event, cardId) => {
        dispatch({
          type: ImageInputValueProps.SEARCH_KEYWORD,
          inputId: cardId,
          value: event.target.value
        })
      }, [dispatch])
    
      const openUnsplashHandler:GenericProps<string> = useCallback((cardId) => {
          dispatch({
            type: ImageInputValueProps.OPEN_UNSPLASH,
            inputId: cardId
          })
      }, [dispatch])

      const searchingButtonHandler:GenericProps<string> = useCallback((cardId) => {
        dispatch({
            type: ImageInputValueProps.SEARCHING,
            inputId: cardId
        })
      }, [dispatch])

      const addedPhotosHandler: ImageGenericProps<[]> = useCallback((photos, cardId) => {
        dispatch({
            type: ImageInputValueProps.PHOTOS_ADDED,
            photos: photos,
            inputId: cardId
        })
      }, [dispatch])
    
    return [imageState, searchKeywordHandler, openUnsplashHandler, searchingButtonHandler, addedPhotosHandler]
}