import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../../../shared/components/FormElements/Button';
import { GET_SINGLE_USER_BY_EMAIL } from '../../../shared/util/queries';
import { useNavigate } from 'react-router-dom';

import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';
import { ObjectGenericProps } from '../../../shared/types/sharedTypes';
import ErrorModal from '../../../shared/components/UIElements/ErrorModal';
import { useForgotPassword } from '../../../shared/context/password-context';

const ForgotPasswordEmail = () => {
    const [ showErrorModal, setShowErrorModal ] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const { setIsRedirected } = useForgotPassword();
    const {
        register,
        handleSubmit
    } = useForm()

    const navigate = useNavigate()
    
    const [singleUser, { loading, error }] = useMutation(GET_SINGLE_USER_BY_EMAIL)

    const handleSubmitEmail:SubmitHandler<ObjectGenericProps<string>> = async( data ) => {
        try {
            const response = await singleUser({
                variables: {
                    email: data.email
                }
            })

            if (response) {
                setIsRedirected(prev => !prev)
                setTimeout(() => {
                    navigate(`/forgot-password/${response.data.getSingleUserByEmail.userId}`)
                }, 500)
            } else {
                setShowErrorModal(true)
            }
        } catch (err) {
            setShowErrorModal(true)
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

  return (
    <div className='card wrapper'>
        {loading && <LoadingSpinner asOverlay/>}
        { showErrorModal && 
            <ErrorModal
                error={errorMessage}
                onClear={closeModal}
            />
        }
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