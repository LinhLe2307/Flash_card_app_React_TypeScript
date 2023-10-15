import { useEffect, useReducer } from 'react';
import { InputAction, InputProps, InputState, InputValueProps } from '../../types/formTypes';
import { EventHandler } from '../../types/formTypes';
import { validate } from '../../util/validators';
import './Input.css';

const inputReducer = (state:InputState, action: InputAction) => {
    const { type, val, validators } = action;

    switch(type) {
        case InputValueProps.CHANGE: 
            return {
                ...state,
                value: val,
                isValid: validate(val, validators)
            }
        case InputValueProps.TOUCH:
            return {
                ...state,
                isTouched: true
            }
        default:
            return state
    }
}

const Input = ({nameId, id, label, element, type, placeholder, rows, errorText, validators, onInput, initialValue, initialIsValid}:InputProps) => {
    const [inputState, dispatch] = useReducer(inputReducer, {value: initialValue || '', isValid: initialIsValid || false, isTouched: false})

    const { value, isValid } = inputState
    
    useEffect(() => {
        console.log("inputState", inputState)
        onInput(inputState.value, inputState.isValid, id, nameId)
    }, [id, onInput, value, isValid, nameId])

    const changeHandler:EventHandler = (event) => {
        dispatch({
            type: InputValueProps.CHANGE,
            val: event.target.value,
            validators: validators
        })
    }

    const touchHandler:EventHandler = (event) => {
        dispatch({
            type: InputValueProps.TOUCH,
            val: event.target.value,
            validators: validators
        })
    }

    const elemenInput = element === "input" 
        ? <input 
            name={nameId}
            id={id} 
            type={type} 
            placeholder={placeholder} 
            onChange={changeHandler}
            onBlur={touchHandler}
            value={String(inputState.value)}
            /> 
            : <textarea 
            name={nameId}
            id={id} 
            rows={rows || 3} 
            onChange={changeHandler}
            onBlur={touchHandler}
            value={String(inputState.value)}
            />

  return (
    <div className={`form-control ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'}`}>
        <label htmlFor={id}>{label}</label>
        {elemenInput}
        {!inputState.isValid && inputState.isTouched && <p>{errorText}</p>}
    </div>
  )
}

export default Input