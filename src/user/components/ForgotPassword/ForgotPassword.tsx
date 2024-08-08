import { useMutation } from "@apollo/client";
import { useEffect, useState } from 'react';
import { FieldError, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from "react-router-dom";

import Button from '../../../shared/components/FormElements/Button';
import ErrorModal from '../../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";
import { ObjectGenericProps } from "../../../shared/types/sharedTypes";
import { RESET_PASSWORD } from '../../../shared/util/queries';
import Password from '../Password/Password';

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
                navigate("/login")
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
        <div className='card wrapper'>
            {loading && <LoadingSpinner asOverlay />}
            {showErrorModal &&
                <ErrorModal
                    error={errorMessage}
                    onClear={closeModal}
                />
            }

            <form onSubmit={handleSubmit(handleSubmitPassword)}>
                <Password
                    label='New Password'
                    name='password'
                    placeholder='Please enter a new password'
                    register={register}
                    errors={errors}
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
                        && <span className='invalid-input'>{(errors.confirmPassword as FieldError)?.message}</span>}
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