import { useCallback, useReducer } from 'react';
import { FormAction, FormActionProps, FormState, InputHandlerProps, SetFormDataProps, UserFormHandler, ValueAndValidProps } from '../types/formTypes';
import { GenericProps, ObjectGenericProps } from '../types/sharedTypes';


const valuesTypes = ["title", "description", "name", "email", "password"]
const formReducer = (state: FormState, action: FormAction) => {
  switch(action.type) {
    case FormActionProps.INPUT_CHANGE:
      let newProps = {...state}
      let formIsValid = true
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) {
          continue
        } else {
          if (inputId === action.inputId) {
            if (valuesTypes.find(card => card === action.inputId) !== undefined) {
              newProps.inputs[action.inputId] = {
                ...newProps.inputs[action.inputId],
                value: action.value,
                isValid: action.isValid
              }
              formIsValid = formIsValid && action.isValid
            } else {
              if (typeof action.value === "object") {
                const inputValue = newProps.inputs[action.inputId].value as ObjectGenericProps<ValueAndValidProps<string>>;
                newProps.inputs[action.inputId] = {
                  ...newProps.inputs[action.inputId],
                  value : {
                    ...inputValue,
                    [action.nameId]: action.value?.[action.nameId]
                  },
                  isValid: true
                }
                formIsValid = formIsValid && action.isValid
              }
              
            }
          } else {
            if (valuesTypes.find(card => card === action.inputId) !== undefined) {
              formIsValid = formIsValid && action.isValid
              newProps.inputs[action.inputId] = {
                value: action.value,
                isValid: action.isValid
              }
              formIsValid = formIsValid && state.inputs[inputId].isValid
            } else {
              if (typeof action.value === "object") {
                const inputValue = newProps.inputs[action.inputId]?.value as ObjectGenericProps<ValueAndValidProps<string>>;
                newProps.inputs[action.inputId] = {
                  ...newProps.inputs[action.inputId],
                  value: {
                    ...inputValue,
                    [action.nameId]: action.value?.[action.nameId]
                  },
                  isValid: true
                }
              }
              formIsValid = formIsValid && state.inputs[inputId].isValid
            }
          }
        }
      }
      newProps.isValid = formIsValid
      return newProps

    case FormActionProps.REMOVE_CARD:
      const newRemoveValue = {...state.inputs}
      delete newRemoveValue[action.inputId]
      return {...state, inputs: newRemoveValue}

    case FormActionProps.ADD_CARD:
      const newAddState = {...state.inputs}
      const stateLength = Object.keys(newAddState).length
      newAddState[`m${stateLength}`] = {
        value: {
          term: {
            value: '',
            isValid: false
          }, 
          definition: {
            value: '',
            isValid: false
          }, 
          imageUrl: {
            value: '',
            isValid: false
          }, 
        },
        isValid: false
      }
      return {...state, inputs: newAddState}

    case FormActionProps.SET_DATA:
      return {
          inputs: action.inputs,
          isValid: action.formIsValid
        }
    default: 
        return state
  }
}


export const useForm:UserFormHandler = function(initialInputs, initialFormValidity) {
  const [formState, dispatch] = useReducer(formReducer, {
        inputs: initialInputs,
        isValid: initialFormValidity
      })

    const inputHandler: InputHandlerProps = useCallback((value, isValid, id, nameId) => {
        if (valuesTypes.find( name => name===id) !== undefined) {
          dispatch({
            type: FormActionProps.INPUT_CHANGE,
            value: value,
            isValid: isValid,
            inputId: String(id),
            nameId: nameId
          })
        } else {
          dispatch({
            type: FormActionProps.INPUT_CHANGE,
            value: {
              [nameId]: {
                value: value,
                isValid: isValid
              }
            },
            isValid: isValid,
            inputId: String(id),
            nameId: nameId
          })
        }
    }, [dispatch])

    const removeSubCardHandler:GenericProps<string> = useCallback((cardId) => {
      dispatch({
        type: FormActionProps.REMOVE_CARD,
        inputId: cardId
      })
    }, [dispatch])


    const addMoreCardHandler = useCallback(() => {
      dispatch({
        type: FormActionProps.ADD_CARD
      })
    }, [dispatch])


    const setFormData:SetFormDataProps = useCallback((inputData , formValidity) => {
        dispatch({
            type: FormActionProps.SET_DATA,
            inputs: inputData,
            formIsValid: formValidity
        })
    }, [dispatch])

    return [formState, removeSubCardHandler, inputHandler, addMoreCardHandler, setFormData];
}
