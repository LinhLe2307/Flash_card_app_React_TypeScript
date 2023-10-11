import { useReducer } from 'react'
import { CountActionKind, CountState, InputProps, InputReducerProps, changeHandlerProps, LoadingState } from '../types/formElementsType/inputTypes'
import './Input.css'

const inputReducer:InputReducerProps = (state, action) => {
    const { type, val } = action;
    switch(type) {
        case CountActionKind.CHANGE: 
            return {
                ...state,
                value: val,
                isValid: true
            }
        default:
            return state
    }
}

const Input = ({id, label, element, type, placeholder, rows, errorText}: InputProps) => {
    const [inputState, dispatch] = useReducer(inputReducer, {value: '', isValid: false})

    const changeHandler: changeHandlerProps  = (event) => {
        dispatch({
            type: CountActionKind.CHANGE,
            val: event.target.value
        })
    }
    const elemenInput = element === "input" 
        ? <input 
            id={id} 
            type={type} 
            placeholder={placeholder} 
            onChange={changeHandler}
            value={inputState.value}
            /> 
        : <textarea 
            id={id} 
            rows={rows || 3} 
            onChange={changeHandler}
            value={inputState.value}
            />

  return (
    <div className={`form-control`}>
        <label htmlFor={id}>{label}</label>
        {elemenInput}
        {!inputState.isValid && <p>{errorText}</p>}
    </div>
  )
}

export default Input