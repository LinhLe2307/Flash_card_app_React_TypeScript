import { useMutation, useQuery } from '@apollo/client'
import React, { useContext, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import Button from '../../shared/components/FormElements/Button'
import Email from '../../shared/components/FormElements/Email'
import FormInput from '../../shared/components/FormElements/FormInput'
import Password from '../../shared/components/FormElements/Password'
import Select from '../../shared/components/FormElements/Select'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { AuthContext } from '../../shared/context/auth-context'
import { ObjectGenericProps } from '../../shared/types/sharedTypes'
import { GET_COUNTRIES_AND_LANGUAGES, SIGN_UP_USER } from '../../shared/util/queries'
import FormBase from '../components/FormBase/FormBase'
import { UserBaseProps, UserInfoType } from '../types/userTypes'

const Register = () => {
    const auth = useContext(AuthContext) 
    const [errorSignUpMessage, setErrorSignUpMessage] = useState('')
    const [ showErrorModal, setShowErrorModal ] = useState(false)
    const [ showErrorSignUpModal, setShowErrorSignUpModal ] = useState(false)
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {errors}
    } = useForm<UserBaseProps>()

    const [ signUpAuth, { loading: loadingSignUp, error: errorSignUp } ] = useMutation(SIGN_UP_USER)
    const { loading, error, data } = useQuery(GET_COUNTRIES_AND_LANGUAGES)
    let countries = data?.getCountriesAndLanguages.countries
    let languages = data?.getCountriesAndLanguages.languages

    const authSubmitHandler:SubmitHandler<UserBaseProps> = async(data) => {
            try {
                const body: any = {}

                // Get all values of the UserInfoProps enum
                const userInfoValues = Object.values(UserInfoType);

                [...userInfoValues, 'password'].map(value => 
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
                console.log(err)
                setShowErrorSignUpModal(true)
            }
    }

    const closeModal = () => {
        setShowErrorModal(false)
    }

    const closeSignUpErrorModal = () => {
        setShowErrorSignUpModal(false)
    }

    // Watch the password value
    const password = watch('password', '');

    useEffect(() => {
        if (errorSignUp && errorSignUp.message.length > 0) {
            setErrorSignUpMessage(errorSignUp.message)
        }
    }, [errorSignUp])

  return (
    <React.Fragment>
        <div className='authentication'>
            {loadingSignUp && <LoadingSpinner asOverlay/>}
            
            { showErrorSignUpModal && 
                <ErrorModal
                    error={errorSignUpMessage}
                    onClear={closeSignUpErrorModal}
                />
            }

        <div>
            <FormBase
                title="Create a new account"
            >
                <div className='mx-4 mb-4'>
                    <form className='max-w-4xl mx-auto bg-white sm:p-8 p-4 rounded-md'
                        onSubmit={handleSubmit(authSubmitHandler)}
                    >
                        <div className='grid md:grid-cols-2 gap-8'>
                            <FormInput 
                                title='First Name*'
                                name='firstName'
                                placeholder='Enter name'
                                type='text'
                                register={register}
                            />
                            <FormInput 
                                title='Last Name*'
                                name='lastName'
                                placeholder='Enter last name'
                                type='text'
                                register={register}
                            />
                            <Email 
                                register={register}
                            />
                            <FormInput 
                                title='Mobile no.'
                                name='phone'
                                placeholder='Enter mobile phone'
                                type='tel'
                                register={register}
                            />
                            <Select 
                                title='Language*'
                                name='language'
                                defaultOption='-- Choose a language --'
                                register={register}
                            >
                                {
                                    languages 
                                    && languages.map((language: ObjectGenericProps<string>) => (
                                        <option key={language?.id} value={language?.id}>{language?.name}</option>
                                    ))
                                }
                            </Select>
                            <Select 
                                title='Country*'
                                name='country'
                                defaultOption='-- Choose a country --'
                                register={register}
                            >
                                {
                                    countries 
                                    && countries.map((country: ObjectGenericProps<string>) => (
                                        <option key={country?.id} value={country?.id}>{country?.country}</option>
                                    ))
                                }
                            </Select>
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
                        </div>
                        <div className='mt-8'>
                            <Button type='submit' default={true}>
                                Sign up
                            </Button>
                            <span className='login-signup'>Already have an account? Login</span>
                        </div>
                    </form>
                </div>
            </FormBase>
        </div>
        </div>

    </React.Fragment>
  )
}

export default Register