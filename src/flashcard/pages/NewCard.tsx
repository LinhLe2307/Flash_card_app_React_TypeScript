import { useCallback, useReducer } from 'react'
import Input from '../../shared/FormElements/Input'
import { TermInputHandlerProps } from '../../shared/types/formElementsType/inputTypes'
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from '../../shared/util/validators'
import './NewCard.css'
import { FormAction, InputKindProps, FormState, FormInputsProps } from '../types/newCardTypes'

const formReducer = (state: FormState, action: FormAction) => {
  switch(action.type) {
    case InputKindProps.INPUT_CHANGE:
      let formIsValid = true
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid
        } else {
          formIsValid = formIsValid && state.inputs[inputId as keyof typeof FormInputsProps].isValid
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: {value: action.value, isValid: action.isValid}
        },
        isValid: formIsValid
      }
    default: 
      return state
  }
}

const NewCard = () => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      term: {
        value: '',
        isValid: false
      },
      definition: {
        value: '',
        isValid: false
      }
    },
    isValid: false
  })

  const termInputHandler:TermInputHandlerProps = useCallback((value, isValid, id) => {
    dispatch({
      type: InputKindProps.INPUT_CHANGE,
      value: value,
      isValid: isValid,
      inputId: id
    })
  }, [dispatch])
  return (
    <form className='card-form'>
      <Input 
        id="term"
        type="text" 
        label="Title" 
        element="input"
        validators={
          [
            VALIDATOR_REQUIRE()
          ]
        }
        errorText="Please enter a valid term"
        onInput = {termInputHandler}
      />
      <Input 
        id="definition"
        type="text" 
        label="Title" 
        element="input"
        validators={
          [
            VALIDATOR_MINLENGTH(5)
          ]
        }
        errorText="Please enter a valid definition (at least 5 characters)."
        onInput = {termInputHandler}
      />
    </form>
  )
}

export default NewCard