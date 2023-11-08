import { useCallback } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { openUnsplash, photosAdded, searchKeyword, searching } from "../../features/imageSlice"
import { ImageGenericProps, useImageProps } from "../types/imageTypes"
import { GenericProps } from "../types/sharedTypes"


export const useImage:useImageProps = (initialInputs) => {
    const imageState = useAppSelector(state => state.image)
    const dispatch = useAppDispatch()

    const searchKeywordHandler: ImageGenericProps<React.ChangeEvent<HTMLInputElement>> = useCallback((event, cardId) => {
        dispatch(searchKeyword({
          inputId: cardId,
          value: event.target.value
        }))
      }, [dispatch])
    
      const openUnsplashHandler:GenericProps<string> = useCallback((cardId) => {
          dispatch(openUnsplash({
            inputId: cardId
          }))
      }, [dispatch])

      const searchingButtonHandler:GenericProps<string> = useCallback((cardId) => {
        dispatch(searching({
          inputId: cardId
        }))
      }, [dispatch])

      const addedPhotosHandler: ImageGenericProps<[]> = useCallback((photos, cardId) => {
        dispatch(photosAdded({
          photos: photos,
          inputId: cardId
        }))
      }, [dispatch])
    
    return [imageState, searchKeywordHandler, openUnsplashHandler, searchingButtonHandler, addedPhotosHandler]
}