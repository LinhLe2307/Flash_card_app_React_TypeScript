import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addCardFlashcard, inputChangeFlashcard, removeCardFlashcard, resetForm, setDataFlashcard } from '../../app/actions/form';
import { useAppSelector } from '../../app/hooks';
import { filterName } from '../constants/global';
import { InputHandlerProps, SetFormDataProps, UserFormHandler } from '../types/formTypes';
import { GenericProps } from '../types/sharedTypes';
import { resetImage } from '../../app/actions/image';


export const useFormHook:UserFormHandler = function() {
    const dispatch = useDispatch()
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

    const resetState:GenericProps<string> = useCallback((formName) => {
      if (formName === "new_card") {
        dispatch(resetImage())
        dispatch(resetForm())
      } else if (formName === "update_card") {
        dispatch(resetImage())
      }
      }, [dispatch])

    return [formState, removeSubCardHandler, inputHandler, addMoreCardHandler, setFormData, resetState];
}
