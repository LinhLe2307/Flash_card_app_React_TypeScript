import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addCardForm, inputChangeForm, removeCardForm, resetForm, setDataForm } from '../../app/actions/form';
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
          const form = {
            value: value,
            isValid: isValid,
            inputId: String(inputId),
            nameId: nameId
          }
          const action = inputChangeForm(form)
          dispatch(action)

        } else {
          const form = {
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
          const action = inputChangeForm(form)
          dispatch(action)
        }
    }, [dispatch])

    const removeSubCardHandler:GenericProps<string> = useCallback((cardId) => {
      const action = removeCardForm({
        inputId: cardId
      })
      dispatch(action)
    }, [dispatch])


    const addMoreCardHandler = useCallback(() => {
      dispatch(addCardForm())
    }, [dispatch])

    const resetState:GenericProps<string> = useCallback((formName) => {
      if (formName === "new_card") {
        dispatch(resetImage())
        dispatch(resetForm())
      } else if (formName === "update_card") {
        dispatch(resetImage())
      }
      }, [dispatch])

    return [formState, removeSubCardHandler, inputHandler, addMoreCardHandler, resetState];
}
