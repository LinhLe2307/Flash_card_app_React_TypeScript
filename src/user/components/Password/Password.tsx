import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import { UserBaseProps } from '../../types/userTypes'

interface PasswordProps {
    name: string,
    placeholder: string,
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors<UserBaseProps>,
    label: string
}

const Password = ({
    name,
    placeholder,
    register, 
    errors,
    label
    }: PasswordProps) => {
  return (
    <div className={`form-control`}>
        <label htmlFor={`${name}`}>{label}*</label>
            <input type={`${name}`} id={`${name}`} 
                {...register(`${name}`, { 
                required: 'This field is required.', 
                minLength: {
                value: 6,
                message: 'Min length is 6'
                } 
            })}
            placeholder={`${placeholder}`}
            className='bg-light form-control'
        />
        <span>{errors.password?.message}</span>
    </div>
  )
}

export default Password