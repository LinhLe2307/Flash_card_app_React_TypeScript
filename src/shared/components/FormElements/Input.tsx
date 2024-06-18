import React, { useEffect, useReducer } from 'react';
import { InputAction, InputProps, InputState, InputValueProps } from '../../types/formTypes';
import { GenericProps } from '../../types/sharedTypes';
import { validate } from '../../util/validators';
import './Input.css';

const inputReducer = (state:InputState, action: InputAction) => {
    const { type, val, validators, nameId } = action;
    switch(type) {
        case InputValueProps.CHANGE: 
            return {
                ...state,
                value: val,
                isValid: validate(val, validators),
                nameId: nameId
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

const Input = ({id, label, element, type, placeholder, rows, errorText, validators, onInput, initialValue, initialIsValid, nameId, className}:InputProps) => {
    const [inputState, dispatch] = useReducer(inputReducer, {value: initialValue || '', isValid: initialIsValid || false, isTouched: false})

    const { value, isValid } = inputState
    
    const changeHandler: GenericProps<React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>> = (event) => {
        dispatch({
            type: InputValueProps.CHANGE,
            val: event.target.value,
            validators: validators,
            nameId: event.target.name
            })
    }

    const touchHandler: GenericProps<React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>> = (event) => {
        dispatch({
            type: InputValueProps.TOUCH,
            val: event.target.value,
            validators: validators,
            nameId: event.target.name
        })
    }

    const elementInput = element === 'input' 
        ? <input 
            name={nameId}
            id={id} 
            type={type} 
            placeholder={placeholder} 
            onChange={changeHandler}
            onBlur={touchHandler}
            value={String(value)}
            /> 
        : element === 'search' 
        ? <input
            className={className} 
            type={type}
            placeholder={placeholder} 
            onChange={changeHandler}
        />
        : <textarea 
            name={nameId}
            id={id} 
            rows={rows || 3} 
            onChange={changeHandler}
            onBlur={touchHandler}
            value={String(value)}
        />
    
    useEffect(() => {
        onInput(inputState.value, inputState.isValid, id, nameId)
    }, [id, value, isValid, nameId])

    useEffect(() => {           
        if (initialValue && initialIsValid) {
            dispatch({
                type: InputValueProps.CHANGE,
                val: initialValue,
                validators: validators,
                nameId: nameId
            })
        }
    }, [initialValue, dispatch, onInput])
        
  return (
    <div className={
        element === 'search'
        ? ''
        : `form-control ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'}`
    }>
        <label htmlFor={id}>{label}</label>
        {elementInput} 
        {!inputState.isValid && inputState.isTouched && <p>{errorText}</p>}
    </div>
  )
}

export default Input