import { useMutation } from "@apollo/client";
import { useForm } from 'react-hook-form';
import Button from '../../../shared/components/FormElements/Button';
import { GET_SINGLE_USER_BY_EMAIL } from '../../../shared/util/queries';
import { useNavigate } from "react-router-dom";

const ForgotPasswordEmail = () => {
    const {
        register,
        handleSubmit
    } = useForm()

    const navigate = useNavigate()

    const [singleUser, { loading, error }] = useMutation(GET_SINGLE_USER_BY_EMAIL)

    const handleSubmitEmail = async( data ) => {
        try {
            const response = await singleUser({
                variables: {
                    email: data.email
                }
            })

            if (response) {
                navigate("/forgot-password/reset")
            } else {
                console.log("Error")
            }
        } catch (err) {
            console.log(err)
        }
    }

  return (
    <div className='card wrapper'>
        <form onSubmit={ handleSubmit(handleSubmitEmail) }>
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
                <Button type='submit' > 
                    Continue
                </Button>
            </div>
        </form>
    </div>
  )
}

export default ForgotPasswordEmail