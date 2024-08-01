import { useMutation } from "@apollo/client";
import { useForm } from 'react-hook-form';
import Button from '../../../shared/components/FormElements/Button';
import { FORGOT_PASSWORD } from '../../../shared/util/queries';
import Password from '../Password/Password';

const ForgotPassword = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors}
    } = useForm()

    const [forgotPassword, { loading, error }] = useMutation(FORGOT_PASSWORD)

    const handleSubmitPassword = async( data ) => {
        console.log(data)
        try {
            const response = await forgotPassword({
                variables: {
                    password: data.password,
                    userId: 207
                }
            })
            console.log(response)

        } catch (err) {
            console.log(err)
        }
    } 

     // Watch the password value
    const password = watch('password', '');
    const confirmPassword = watch('confirmPassword', '');

    console.log(password)
    console.log(confirmPassword)

    return (
    <div className='card wrapper'>
        <form onSubmit={ handleSubmit(handleSubmitPassword) }>
            <Password 
                label='New Password'
                name='password'
                placeholder='Please enter a new password'
                register= {register}
                errors = {errors}
            />
            {/* <Password 
                label='New Password Again'
                name='newPasswordAgain'
                placeholder='Please enter the password again'
                register= {register}
                errors = {errors}
            /> */}

            <div className={`form-control`}>
                <label htmlFor={`confirmPassword`}>Confirm Password*</label>
                    <input type={`password`} id={`confirmPassword`} 
                        {...register(`confirmPassword`, { 
                            required: 'This field is required.', 
                            validate: value => value === password || 'Passwords do not match',
                            minLength: {
                                value: 6,
                                message: 'Min length is 6'
                            } 
                    })}
                    placeholder={`Please confirm your password`}
                    className='bg-light form-control'
                />
                {errors.confirmPassword && <p>{errors?.confirmPassword.message}</p>}
            </div>
            <div className='login-signup-container'>
                <Button type='submit'> 
                    Submit
                </Button>
            </div>
        </form>
    </div>
  )
}

export default ForgotPassword