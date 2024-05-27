import { useMutation } from '@apollo/client'
import React, { useContext, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import Button from '../../shared/components/FormElements/Button'
import CardAvatar from '../../shared/components/UIElements/CardAvatar'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { AuthContext } from '../../shared/context/auth-context'
import { LOGIN_USER, SIGN_UP_USER } from '../../shared/util/queries'
import { SocialMediaType, UserInfoType } from '../../user/types/userTypes'
import UserForm from '../components/UserForm/UserForm'
import '../components/UserForm/UserForm.css'
import { UserBaseProps } from '../types/userTypes'

const Auth = () => {
    const auth = useContext(AuthContext)
    const [errorMessage, setErrorMessage] = useState('') 
    const [errorSignUpMessage, setErrorSignUpMessage] = useState('') 
    const [ isLoginMode, setIsLoginMode ] = useState(false)
    const [ showErrorModal, setShowErrorModal ] = useState(false)
    const [ showErrorSignUpModal, setShowErrorSignUpModal ] = useState(false)
    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors}
    } = useForm<UserBaseProps>()

    const [ loginAuth, { loading, error } ] = useMutation(LOGIN_USER)

    const [ signUpAuth, { loading: loadingSignUp, error: errorSignUp } ] = useMutation(SIGN_UP_USER)

    const authSubmitHandler:SubmitHandler<UserBaseProps> = async(data) => {
        if (isLoginMode) {
            try {
                const body = {
                    email: data.email,
                    password: data.password
                }

                const response = await loginAuth({ variables: body })

                const loginUser = response.data.loginAuth
                if (loginUser) {
                    auth.login(loginUser.userId, loginUser.token)
                } else {
                    setShowErrorModal(true)
                }
            } catch(err) {
                setShowErrorModal(true)
                console.log(err)
            }
        } else {
            try {
                const body: any = {}
                // Get all values of the SocialMediaType enum
                const socialMediaValues = Object.values(SocialMediaType);

                // Get all values of the UserInfoProps enum
                const userInfoValues = Object.values(UserInfoType);

                [...socialMediaValues, ...userInfoValues, 'password', 'image'].map(value => 
                    body[value] = data[value]
                )
                
                const response = await signUpAuth({ variables: body})

                const registerUser = response.data.signUpAuth
                if (registerUser) {
                    auth.login(registerUser.userId, registerUser.token)
                } else {
                    setShowErrorSignUpModal(true)
                }
            } catch(err) {
                setShowErrorSignUpModal(true)
                console.log(err)
            }
        }
    }

    const switchModeHandler = () => {
        setIsLoginMode(prevMode => !prevMode)
    }

    const closeModal = () => {
        setShowErrorModal(false)
    }

    const closeSignUpErrorModal = () => {
        setShowErrorSignUpModal(false)
    }

    useEffect(() => {
        if (error && error.message.length > 0) {
            setErrorMessage(error.message)
        }
    }, [error])

    useEffect(() => {
        if (errorSignUp && errorSignUp.message.length > 0) {
            setErrorMessage(errorSignUp.message)
        }
    }, [errorSignUp])

  return (
    <React.Fragment>
        <CardAvatar className='authentication'>

            {loading && <LoadingSpinner asOverlay/>}
            {loadingSignUp && <LoadingSpinner asOverlay/>}

            { showErrorModal && 
                <ErrorModal
                    error={errorMessage}
                    onClear={closeModal}
                />
            }
            { showErrorSignUpModal && 
                <ErrorModal
                    error={errorSignUpMessage}
                    onClear={closeSignUpErrorModal}
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
                            <label htmlFor='password'>Password*</label>
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
                            <label htmlFor='email'>Email*</label>
                            <input 
                                id='email' 
                                {...register('email', { required: 'This is required.', pattern: /^\S+@\S+\.\S+$/ })}
                                placeholder='Please enter your email'
                                className='bg-light form-control'
                            />
                            <span>{errors.email?.message}</span>
                        </div>
                        <div className={`form-control`}>
                            <label htmlFor='password'>Password*</label>
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