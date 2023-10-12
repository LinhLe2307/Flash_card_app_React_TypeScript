import { useReducer, useEffect } from 'react';
import { ValueActionKind, InputProps, InputReducerProps, changeHandlerProps } from '../types/formElementsType/inputTypes';
import { validate } from '../util/validators';
import './Input.css';

const inputReducer:InputReducerProps = (state, action) => {
    const { type, val, validators } = action;
    switch(type) {
        case ValueActionKind.CHANGE: 
            return {
                ...state,
                value: val,
                isValid: validate(val, validators)
            }
        case ValueActionKind.TOUCH:
            return {
                ...state,
                isTouched: true
            }
        default:
            return state
    }
}

const Input = ({id, label, element, type, placeholder, rows, errorText, validators, onInput}: InputProps) => {
    const [inputState, dispatch] = useReducer(inputReducer, {value: '', isValid: false, isTouched: false})

    const { value, isValid } = inputState
    useEffect(() => {
        onInput(inputState.value, inputState.isValid, id)
    }, [id, onInput, value, isValid])

    const changeHandler: changeHandlerProps  = (event) => {
        dispatch({
            type: ValueActionKind.CHANGE,
            val: event.target.value,
            validators: validators
        })
    }

    const touchHandler: changeHandlerProps = (event) => {
        dispatch({
            type: ValueActionKind.TOUCH,
            val: event.target.value,
            validators: validators
        })
    }

    const elemenInput = element === "input" 
        ? <input 
            id={id} 
            type={type} 
            placeholder={placeholder} 
            onChange={changeHandler}
            onBlur={touchHandler}
            value={inputState.value}
            /> 
            : <textarea 
            id={id} 
            rows={rows || 3} 
            onChange={changeHandler}
            onBlur={touchHandler}
            value={inputState.value}
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