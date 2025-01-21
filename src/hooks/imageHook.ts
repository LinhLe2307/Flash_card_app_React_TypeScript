import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { openUnsplashImage, searchKeywordImage } from "../app/actions/image"
import { useAppSelector } from "../app/hooks"
import { ImageGenericProps, UseImageProps } from "../types/imageTypes"
import { GenericProps } from "../types/sharedTypes"


export const useImage:UseImageProps = (initialInputs) => {
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

    return [imageState, searchKeywordHandler, openUnsplashHandler]
}