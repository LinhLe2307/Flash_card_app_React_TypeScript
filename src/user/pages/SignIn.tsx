import { useMutation } from '@apollo/client'
import { useContext, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { AuthContext } from '../../shared/context/auth-context'

import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { LOGIN_USER } from '../../shared/util/queries'
import Password from '../../shared/components/FormElements/Password'
import { UserBaseProps } from '../types/userTypes'
import FormBase from '../components/FormBase/FormBase'
import Button from '../../shared/components/FormElements/Button'
import Email from '../../shared/components/FormElements/Email'

const SignIn = () => {
    const auth = useContext(AuthContext)
    const [ loginAuth, { loading, error } ] = useMutation(LOGIN_USER)
    const [ showErrorModal, setShowErrorModal ] = useState(false)
    const [errorMessage, setErrorMessage] = useState('') 
    const {
        register,
        handleSubmit,
    } = useForm<UserBaseProps>()

    const authSubmitHandler:SubmitHandler<UserBaseProps> = async(data) => {
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
    <>
        {loading && <LoadingSpinner asOverlay/>}
        { showErrorModal && 
            <ErrorModal
                error={errorMessage}
                onClear={closeModal}
            />
        }
        <FormBase
            title='Sign in to your account'
        >
            <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                <form onSubmit={handleSubmit(authSubmitHandler)} className='space-y-6'>
                    <Email register={register}/>
                    <Password
                        label='Password'
                        name='password'
                        register={register}
                        placeholder='Password'
                    >
                        <div className='text-sm'>
                            <a href='/forgot-password' className='font-semibold text-indigo-600 hover:text-indigo-500'>
                                Forgot password?
                            </a>
                        </div>
                    </Password>

                    <div>
                        <Button
                            type='submit'
                            default={true}
                        >
                            Sign in
                        </Button>
                    </div>
                </form>

                <p className='mt-10 text-center text-sm text-gray-500'>
                    Not a member?{' '}
                    <a href='/register' className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'>
                    Register
                    </a>
                </p>
            </div>
        </FormBase>
    </>
  )
}

export default SignIn