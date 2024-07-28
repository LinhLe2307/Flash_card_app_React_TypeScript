import { useForm } from 'react-hook-form'
import Button from '../../../shared/components/FormElements/Button'

const ForgotPassword = () => {
    const {
        register,
    } = useForm()

  return (
    <div className='card wrapper'>
        <div className={`form-control`}>
            <label htmlFor='email'>Email*</label>
            <input 
                id='email' 
                {...register('email', { required: 'This field is required.', pattern: /^\S+@\S+\.\S+$/ })}
                placeholder='Please enter your email'
                className='bg-light form-control'
            />
        </div>
        <div className='login-signup-container'>
            <Button type='submit'>
                Continue
            </Button>
        </div>
    </div>
  )
}

export default ForgotPassword