import { useMutation } from '@apollo/client'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'

import Button from '../../shared/components/FormElements/Button'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { AuthContext } from '../../shared/context/auth-context'
import { LOGIN_USER, SIGN_UP_USER } from '../../shared/util/queries'
import { SocialMediaType, UserInfoType } from '../../user/types/userTypes'
import UserForm from '../components/UserForm/UserForm'
import '../components/UserForm/UserForm.css'
import { UserBaseProps } from '../types/userTypes'
import Password from '../components/Password/Password'

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
                    auth.login(loginUser.image, loginUser.userId, loginUser.token)
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
                    auth.login(registerUser.image, registerUser.userId, registerUser.token)
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
            setErrorSignUpMessage(errorSignUp.message)
        }
    }, [errorSignUp])

  return (
    <React.Fragment>
        <div className='authentication'>

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
                        isSignUp={true}
                        disabled={false}
                    >
                        <div className='login-signup-container'>
                            <Button type='submit'>
                                SIGN UP
                            </Button>
                            <span className='login-signup' onClick={switchModeHandler}>Already have an account? Login</span>
                        </div>
                    </UserForm>
                    : <div className='card wrapper'>
                        <div className={`form-control`}>
                            <label htmlFor='email'>Email*</label>
                            <input 
                                id='email' 
                                {...register('email', { required: 'This field is required.', pattern: /^\S+@\S+\.\S+$/ })}
                                placeholder='Please enter your email'
                                className='bg-light form-control'
                            />
                           <span>{errors.email?.message}</span> 
                        </div>
                        <Password 
                            label='Password'
                            name='password'
                            placeholder='Please enter a new password'
                            register= {register}
                            errors = {errors}
                        />
                        <div className='login-signup-container'>
                            <Button type='submit'>
                                LOGIN
                            </Button>
                            <span className='login-signup' onClick={switchModeHandler}>Want to register?</span>
                            <span><Link to="/forgot-password">Forgot Password</Link></span>
                        </div>
                    </div>
                }
                
            </form>
            {/* <Button inverse onClick={switchModeHandler}>
                SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
            </Button> */}
        </div>

    </React.Fragment>
  )
}

export default Auth