import { useEffect, useReducer } from "react"

const imageReducer = (state, action) => {
    switch (action.type) {
      case 'OPEN_UNSPLASH':
        let newProps = {...state}
        for (const inputId in state){
          if (inputId === action.inputId) {
            newProps[inputId].isOpeningUnsplash = true
          } else {
            newProps[inputId].isOpeningUnsplash = false
          }
        }
        return newProps
  
      case 'SEARCH_KEYWORD':
        let newKeyword = {...state}
        for (const inputId in state){
          if (inputId === action.inputId) {
            newKeyword[inputId].searchKeyword = action.value
          } 
        }
        return newKeyword

    
        case 'SEARCHING':
            let newSearchingState = {...state}
            for (const inputId in state){
                if (inputId === action.inputId) {
                    newSearchingState[inputId].isClickingButton = true
                }
            }
            return newSearchingState

        case 'PHOTOS_ADDED':
            let newPhotosState = {...state}
            for (const inputId in state){
                if (inputId === action.inputId) {
                    newPhotosState[inputId].photos = action.photos
                }
            }
            return newPhotosState
    }
  
  }


export const useImage = (initialInputs) => {
    const [imageState, dispatch] = useReducer(imageReducer, initialInputs)
    
    useEffect(() => {
        console.log(imageState)
    }, [imageState])

      const searchKeywordHandler = (event, cardId) => {
        dispatch({
          type: "SEARCH_KEYWORD",
          inputId: cardId,
          value: event.target.value
        })
      }
    
      const openUnsplashHandler = (event, cardId) => {
        if (event) {
          dispatch({
            type: "OPEN_UNSPLASH",
            inputId: cardId
          })
        }
      }

      const searchingButtonHandler = (cardId) => {
        dispatch({
            type: "SEARCHING",
            inputId: cardId
        })
      }

      const addedPhotosHandler = (photos, cardId) => {
        dispatch({
            type: "PHOTOS_ADDED",
            photos: photos,
            inputId: cardId
        })
      }
    
    return [imageState, searchKeywordHandler, openUnsplashHandler, searchingButtonHandler, addedPhotosHandler]
}