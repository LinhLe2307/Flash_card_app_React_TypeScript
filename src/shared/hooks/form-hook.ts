import { useCallback, useReducer } from 'react';
import { filterName } from '../constants/global';
import { FormAction, FormActionProps, FormState, InputHandlerProps, ObjectGenericInitial, SetFormDataProps, UserFormHandler, VALUE_CARD } from '../types/formTypes';
import { GenericProps } from '../types/sharedTypes';


// const filterName = ["title", "description", "name", "email", "password", "imageUrl"]
const formReducer = (state: FormState, action: FormAction) => {
  switch(action.type) {
    case FormActionProps.INPUT_CHANGE: {
      let newProps = {...state}
      let formIsValid = true
      for (const inputId in state.inputs) {
          if (!state.inputs[inputId]) {
              continue
          } else {
          if (inputId === action.inputId) {
              if (filterName.find(card => card === action.inputId) !== undefined) {
              newProps.inputs[action.inputId] = {
                  ...newProps.inputs[action.inputId],
                  value: action.value,
                  isValid: action.isValid
              }
              formIsValid = formIsValid && action.isValid
              } else {
              if (typeof action.value === "object") {
                  const inputValue = newProps.inputs[action.inputId].value as ObjectGenericInitial;
                  if (inputValue.term.length !== 0 && inputValue.definition.length !== 0) {
                  newProps.inputs[action.inputId] = {
                      ...newProps.inputs[action.inputId],
                      value : {
                      ...inputValue,
                      [action.nameId as keyof typeof VALUE_CARD]: action.value?.[action.nameId as keyof typeof VALUE_CARD]
                      },
                      isValid: action.value[action.nameId as keyof typeof VALUE_CARD].isValid
                  }
                  formIsValid = formIsValid && action.value[action.nameId as keyof typeof VALUE_CARD].isValid
                  } else {
                  formIsValid = formIsValid && action.value[action.nameId as keyof typeof VALUE_CARD].isValid
                  }
                  formIsValid = formIsValid && action.isValid
              }
              
              }
          } else {
              if (filterName.find(card => card === action.inputId) !== undefined) {
              formIsValid = formIsValid && action.isValid
              newProps.inputs[action.inputId] = {
                  value: action.value,
                  isValid: action.isValid
              }
              formIsValid = formIsValid && state.inputs[inputId].isValid
              } else {
              if (typeof action.value === "object") {
                  const inputValue = newProps.inputs[action.inputId]?.value as ObjectGenericInitial;
                  if (inputValue.term.value !== '' && inputValue.definition.value !== '') {
                  newProps.inputs[action.inputId] = {
                      ...newProps.inputs[action.inputId],
                      value: {
                      ...inputValue,
                      [action.nameId as keyof typeof VALUE_CARD]: action.value?.[action.nameId as keyof typeof VALUE_CARD]
                      },
                      isValid: true
                  } 
                  } else {
                  formIsValid = formIsValid && state.inputs[inputId].isValid
                  }
                  formIsValid = formIsValid && state.inputs[inputId].isValid
              }
              }
          }
          }
      }
      newProps.isValid = formIsValid
      return newProps
  }
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
  case FormActionProps.REMOVE_CARD:
      let removeFormIsValid = true
      const removeValue = {...state}
      
      for (const inputId in state.inputs) {
          if (!state.inputs[inputId]) {
          continue
          } else {
          if (inputId === action.inputId) {
              delete removeValue.inputs[action.inputId]
          } else {
              removeFormIsValid = removeFormIsValid && state.inputs[inputId].isValid
          }
          }
      }

      removeValue.isValid = removeFormIsValid
      return removeValue
  case FormActionProps.SET_DATA:
      return {
          inputs: action.inputs,
          isValid: action.formIsValid
      }
  default:
      return state
  }
}


export const useFormHook:UserFormHandler = function(initialInputs, initialFormValidity) {
  const [formState, dispatch] = useReducer(formReducer, {
        inputs: initialInputs,
        isValid: initialFormValidity
      })

    const inputHandler: InputHandlerProps = useCallback((value, isValid, id, nameId) => {
        if (filterName.find( name => name===id) !== undefined) {
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