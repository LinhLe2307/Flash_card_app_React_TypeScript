import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addCard, inputChange, removeCard, setData, resetForm } from '../../features/formSlice';
import { filterName } from '../constants/global';
import { InputHandlerProps, SetFormDataProps, UserFormHandler } from '../types/formTypes';
import { GenericProps } from '../types/sharedTypes';
import { resetImage } from '../../features/imageSlice';


export const useFormHook:UserFormHandler = function() {
    const dispatch = useAppDispatch()
    const formState = useAppSelector(state => state.form)
    const inputHandler: InputHandlerProps = useCallback((value, isValid, id, nameId) => {
        if (filterName.find( name => name===id) !== undefined) {
          dispatch(inputChange({
              value: value,
              isValid: isValid,
              inputId: String(id),
              nameId: nameId
          }
          ))

        } else {
          dispatch(inputChange({
            value: {
                [nameId]: {
                  value: value,
                  isValid: isValid
                }
              },
              isValid: isValid,
              inputId: String(id),
              nameId: nameId
          }))
        }
    }, [dispatch])

    const removeSubCardHandler:GenericProps<string> = useCallback((cardId) => {
      dispatch(removeCard({
          inputId: cardId
      }))
    }, [dispatch])


    const addMoreCardHandler = useCallback(() => {
      dispatch(addCard())
    }, [dispatch])


    const setFormData:SetFormDataProps = useCallback((inputData , formValidity) => {
        dispatch(setData({
          inputs: inputData,
          formIsValid: formValidity
        }))
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