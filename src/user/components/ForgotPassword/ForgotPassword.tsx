import { useMutation } from "@apollo/client";
import { useEffect, useState } from 'react';
import { FieldError, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from "react-router-dom";

import Button from '../../../shared/components/FormElements/Button';
import ErrorModal from '../../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";
import { useForgotPassword } from '../../../shared/context/password-context';
import { ObjectGenericProps } from "../../../shared/types/sharedTypes";
import { FORGOT_PASSWORD } from '../../../shared/util/queries';
import Password from '../Password/Password';

const ForgotPassword = () => {
    const { id } = useParams()
    const [ showErrorModal, setShowErrorModal ] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const { isRedirected, setIsRedirected } = useForgotPassword();
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors}
    } = useForm()
    const navigate = useNavigate()

    const [forgotPassword, { loading, error }] = useMutation(FORGOT_PASSWORD)

    const handleSubmitPassword:SubmitHandler<ObjectGenericProps<string>> = async( data ) => {
        try {
            const response = await forgotPassword({
                variables: {
                    password: data.password,
                    userId: id
                }
            })

            if (response) {
                navigate("/login")
            } else {
                setShowErrorModal(true)
            }

        } catch (err) {
            setShowErrorModal(true)
            console.log(err)
        }
    } 

    const closeModal = () => {
        setShowErrorModal(false)
    }

    useEffect(() => {
        if (error && error.message.length > 0) {
            setErrorMessage(error.message)
        }
    }, [error])

     // Watch the password value
    const password = watch('password', '');

    useEffect(() => {
        if (!isRedirected) {
          navigate('/forgot-password');
        } else {
          // Reset the redirect flag so the user can't reaccess the page directly
          setIsRedirected(prev => !prev);
        }
      }, [isRedirected, navigate, setIsRedirected]);
    
      if (!isRedirected) {
        return null; // Or a loading spinner/message if desired
      }

    return (
    <div className='card wrapper'>
        {loading && <LoadingSpinner asOverlay/>}
        { showErrorModal && 
            <ErrorModal
                error={errorMessage}
                onClear={closeModal}
            />
        }
        <form onSubmit={ handleSubmit(handleSubmitPassword) }>
            <Password 
                label='New Password'
                name='password'
                placeholder='Please enter a new password'
                register= {register}
                errors = {errors}
            />
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
                {errors.confirmPassword 
                && <span>{(errors.confirmPassword as FieldError)?.message}</span>}
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