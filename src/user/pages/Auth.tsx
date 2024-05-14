import React, { useContext, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { AuthContext } from '../../shared/context/auth-context'
import { useHttpClient } from '../../shared/hooks/http-hook'
import Button from '../../shared/components/FormElements/Button'
import CardAvatar from '../../shared/components/UIElements/CardAvatar'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import UserForm from '../../shared/components/FormElements/UserForm'
import { AuthInputs } from '../types/userTypes'
import '../../shared/components/FormElements/UserForm.css'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'


const Auth = () => {
    const auth = useContext(AuthContext)
    const { isLoading, error, sendRequest } = useHttpClient()   
    const [ isLoginMode, setIsLoginMode ] = useState(false)
    const [ showErrorModal, setShowErrorModal ] = useState(false)
    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors}
    } = useForm<AuthInputs>()

    const authSubmitHandler:SubmitHandler<AuthInputs> = async(data) => {
        if (isLoginMode) {
            try {
                const body = JSON.stringify({
                    email: data.email,
                    password: data.password
                })
                const response = await sendRequest(`/api/users/login`,
                    'POST',
                    body,
                    {
                        'Content-Type': 'application/json'
                    }
                )
                if (response) {
                    auth.login(response.userId, response.token)
                } else {
                    setShowErrorModal(true)
                }
            } catch(err) {
                setShowErrorModal(true)
                console.log(err)
            }
        } else {
            try {
                const formData = new FormData()  
                formData.append('email', data.email)
                formData.append('firstName', data.firstName)
                formData.append('lastName', data.lastName)
                formData.append('phone', data.phone)
                formData.append('country', data.country)
                formData.append('language', data.language)
                formData.append('password', data.password)
                formData.append('image', data.image)

                const response = await sendRequest(`/api/users/signup`,
                    'POST',
                    formData,
                    {
                        'Content-Type': 'multipart/form-data'
                    }
                )
                if (response) {
                    auth.login(response.userId, response.token)
                } else {
                    setShowErrorModal(true)
                }
            } catch(err) {
                setShowErrorModal(true)
                console.log(error)
            }
        }
    }

    const switchModeHandler = () => {
        setIsLoginMode(prevMode => !prevMode)
    }

    const closeModal = () => {
        setShowErrorModal(false)
    }

  return (
    <React.Fragment>
        <CardAvatar className='authentication'>
            {isLoading && <LoadingSpinner asOverlay/>}
            { showErrorModal && 
                <ErrorModal
                    error={error}
                    onClear={closeModal}
                />
            }
            <form onSubmit={handleSubmit(authSubmitHandler)}>
                {!isLoginMode ?
                    <UserForm 
                        register={register}
                        errors={errors}
                        setValue={setValue}
                        imageUrl='https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg'
                        title='Sign Up'
                        disabled={false}
                    >
                        <div className={`form-control`}>
                            <label htmlFor='password'>Password</label>
                            <input type='password' id='password' 
                                {...register('password', { 
                                    required: 'This is required.', 
                                    minLength: {
                                        value: 6,
                                        message: 'Min length is 6'
                                    } 
                                })}
                                placeholder='Please enter your password'
                                className='bg-light form-control'
                            />
                            <span>{errors.password?.message}</span>
                        </div>
                        <Button type='submit'>
                            SIGNUP
                        </Button>
                    </UserForm>
                    : <div className='wrapper'>
                        <div className={`form-control`}>
                            <label htmlFor='email'>Email</label>
                            <input 
                                id='email' 
                                {...register('email', { required: 'This is required.', pattern: /^\S+@\S+\.\S+$/ })}
                                placeholder='Please enter your email'
                                className='bg-light form-control'
                            />
                            <span>{errors.email?.message}</span>
                        </div>
                        <div className={`form-control`}>
                            <label htmlFor='password'>Password</label>
                            <input type='password' id='password' 
                                {...register('password', { 
                                    required: 'This is required.', 
                                    minLength: {
                                        value: 6,
                                        message: 'Min length is 6'
                                    } 
                                })}
                                placeholder='Please enter your password'
                                className='bg-light form-control'
                            />
                            <span>{errors.password?.message}</span>
                        </div>
                        <Button type='submit'>
                            LOGIN
                        </Button>
                    </div>
                    
                }
                
            </form>
            <Button inverse onClick={switchModeHandler}>
                SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
            </Button>
        </CardAvatar>

    </React.Fragment>
  )
}

export default Auth