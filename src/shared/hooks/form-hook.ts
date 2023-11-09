import { useCallback } from 'react';
import { addCardFlashcard, inputChangeFlashcard, removeCardFlashcard, setDataFlashcard } from '../../app/actions/flashcards';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { filterName } from '../constants/global';
import { InputHandlerProps, SetFormDataProps, UserFormHandler } from '../types/formTypes';
import { GenericProps } from '../types/sharedTypes';


export const useForm:UserFormHandler = function(initialInputs, initialFormValidity) {
    const dispatch = useAppDispatch()
    const formState = useAppSelector(state => state.form)
    const inputHandler: InputHandlerProps = useCallback((value, isValid, inputId, nameId) => {
        if (filterName.find( name => name===inputId) !== undefined) {
          const flashcard = {
            value: value,
            isValid: isValid,
            inputId: String(inputId),
            nameId: nameId
          }
          const action = inputChangeFlashcard(flashcard)
          dispatch(action)

        } else {
          const flashcard = {
            value: {
                [nameId]: {
                  value: value,
                  isValid: isValid
                }
              },
              isValid: isValid,
              inputId: String(inputId),
              nameId: nameId
          }
          const action = inputChangeFlashcard(flashcard)
          dispatch(action)
        }
    }, [dispatch])

    const removeSubCardHandler:GenericProps<string> = useCallback((cardId) => {
      const action = removeCardFlashcard({
        inputId: cardId
      })
      dispatch(action)
    }, [dispatch])


    const addMoreCardHandler = useCallback(() => {
      dispatch(addCardFlashcard())
    }, [dispatch])


    const setFormData:SetFormDataProps = useCallback((inputData , formValidity) => {
      const action = setDataFlashcard({
        inputs: inputData,
        formIsValid: formValidity
      })
        dispatch(action)
    }, [dispatch])

    return [formState, removeSubCardHandler, inputHandler, addMoreCardHandler, setFormData];
}
