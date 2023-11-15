import { useCallback } from "react"
import { openUnsplashImage, searchKeywordImage, searchingButtonImage, photosAdded } from "../../app/actions/image"
import { useAppSelector } from "../../app/hooks"
import { ImageGenericProps, useImageProps } from "../types/imageTypes"
import { GenericProps } from "../types/sharedTypes"
import { useDispatch } from "react-redux"


export const useImage:useImageProps = (initialInputs) => {
    const imageState = useAppSelector(state => state.image)
    const dispatch = useDispatch()

    const searchKeywordHandler: ImageGenericProps<React.ChangeEvent<HTMLInputElement>> = useCallback((event, cardId) => {
      const action = searchKeywordImage({
          inputId: cardId,
          value: event.target.value
        })
      dispatch(action)
      }, [dispatch])
    
      const openUnsplashHandler:GenericProps<string> = useCallback((cardId) => {
        const action = openUnsplashImage({
          initialInputs: initialInputs,
          inputId: cardId
        })
        dispatch(action)
      }, [dispatch])

      const searchingButtonHandler:GenericProps<string> = useCallback((cardId) => {
        const action = searchingButtonImage({
          inputId: cardId
        })
        dispatch(action)
      }, [dispatch])

      const addedPhotosHandler: ImageGenericProps<[]> = useCallback((photos, cardId) => {
        const action = photosAdded({
          photos: photos,
          inputId: cardId
        })
        dispatch(action)
      }, [dispatch])
    
    return [imageState, searchKeywordHandler, openUnsplashHandler, searchingButtonHandler, addedPhotosHandler]
}