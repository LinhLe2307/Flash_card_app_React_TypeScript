import { InputProps } from '../types/formElementsType/inputTypes'
import './Input.css'

const Input = ({id, label, element, type, placeholder, rows}: InputProps) => {
    const elemenInput = element === "input" 
        ? <input id={id} type={type} placeholder={placeholder}/> 
        : <textarea id={id} rows={rows || 3}/>
  return (
    <div className={`form-control`}>
        <label htmlFor={id}>{label}</label>
        {elemenInput}
    </div>
  )
}

export default Input