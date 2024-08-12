import { useMutation } from "@apollo/client";
import { useEffect, useState } from 'react';
import { FieldError, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from "react-router-dom";

import Button from '../../../shared/components/FormElements/Button';
import ErrorModal from '../../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";
import { ObjectGenericProps } from "../../../shared/types/sharedTypes";
import { RESET_PASSWORD } from '../../../shared/util/queries';
import Password from '../../../shared/components/FormElements/Password';
import FormBase from "../FormBase/FormBase";

const ForgotPassword = () => {
    const { token } = useParams()
    const [showErrorModal, setShowErrorModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm()
    const navigate = useNavigate()

    const [resetPassword, { loading, error }] = useMutation(RESET_PASSWORD)

    const handleSubmitPassword: SubmitHandler<ObjectGenericProps<string>> = async (data) => {
        try {
            const response = await resetPassword({
                variables: {
                    password: data.password,
                    token: token
                }
            })

            if (response) {
                navigate("/sign-in")
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

    // Watch the password value
    const password = watch('password', '');

    return (
        <>
            <FormBase
                title='Reset Password'
            >
                <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                    <form onSubmit={handleSubmit(handleSubmitPassword)} className='space-y-6'>
                        <Password
                            label='Password'
                            name='password'
                            placeholder='Please enter a new password'
                            register={register}
                            />
                        <Password 
                            label='Confirm Password'
                            name='confirmPassword'
                            placeholder='Please confirm your password'
                            register={register}
                            validate={(value) => value === password || 'Passwords do not match'}
                        />
                        <div className='login-signup-container'>
                            <Button type='submit' default={true}>
                                Submit
                            </Button>
                        </div>
                    </form>
                </div>
            </FormBase>
        </>
    )
}

export default ForgotPassword