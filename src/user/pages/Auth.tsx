import React, { useContext, useState } from "react"
import userApi from "../../shared/api/userApi"
import Button from "../../shared/components/FormElements/Button"
import Input from "../../shared/components/FormElements/Input"
import CardAvatar from "../../shared/components/UIElements/CardAvatar"
import ErrorModal from "../../shared/components/UIElements/ErrorModal"
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner"
import { AuthContext } from "../../shared/context/auth-context"
import { useForm } from "../../shared/hooks/form-hook"
import { GenericProps } from "../../shared/types/sharedTypes"
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators"
import './Auth.css'

const Auth = () => {
    const auth = useContext(AuthContext)
    const [isLoginMode, setIsLoginMode] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const [formState, removeSubCardHandler, inputHandler, addMoreCardHandler, setFormData] = useForm({
        email: {
            value: '',
            isValid: false
        }, 
        password: {
            value: '',
            isValid: false
        }, 
        name: {
            value: '',
            isValid: false
        }
    }, false)

    const authSubmitHandler:GenericProps<React.FormEvent<HTMLFormElement>> = async(event) => {
        event.preventDefault()
        setIsLoading(true)
        if (isLoginMode) {
            try {
                const body = JSON.stringify({
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value
                })
                const response = await userApi.login(body)
                console.log(response)
                setIsLoading(false)
                auth.login(response.user.id)
            } catch(err) {
                console.log(err)
                setIsLoading(false)
                setError(err.response.data.message || 'Something went wrong, please try again.')
            }
        } else {
            try {
                const body = JSON.stringify({
                    name: formState.inputs.name.value,
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value
                })
                const response = await userApi.signup(body)
                setIsLoading(false)
                auth.login(response.user.id)
            } catch(err) {
                setIsLoading(false)
                setError(err.response.data.message || 'Something went wrong, please try again.')
            }
        }
    }

    const switchModeHandler = () => {
        if (!isLoginMode) {
            setFormData({
                ...formState.inputs, 
                name: undefined
            }, formState.inputs.email.isValid && formState.inputs.password.isValid)
        } else {
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                }
            }, false)
        }
        setIsLoginMode(prevMode => !prevMode)
    }
     
    const errorHandler = () => {
        setError(null)
    }
  return ( 
    <React.Fragment>
        <ErrorModal error={error} onClear={errorHandler}/>
        <CardAvatar className="authentication">
            {isLoading && <LoadingSpinner asOverlay/>}
            <h2>Login Required</h2>
            <form onSubmit={authSubmitHandler}>
                {!isLoginMode && <Input
                    nameId="name"
                    element="input"
                    id="name"
                    type="text"
                    label="Your Name"
                    validators={[
                        VALIDATOR_REQUIRE()
                    ]}
                    errorText="Please enter a name."
                    onInput={inputHandler}
                />}
                <Input 
                    nameId="email"
                    id="email"
                    element="input"
                    type="text"
                    label="Email"
                    validators={
                        [
                            VALIDATOR_REQUIRE(),
                            VALIDATOR_EMAIL()
                        ]
                    }
                    onInput={inputHandler}
                    errorText="Please enter a valid email"
                    />
                <Input 
                    nameId="password"
                    id="password"
                    element="input"
                    type="text"
                    label="Password"
                    validators={
                        [
                            VALIDATOR_REQUIRE(),
                            VALIDATOR_MINLENGTH(6)
                        ]
                    }
                    onInput={inputHandler}
                    errorText="Please enter a valid password"
                />
                <Button type="submit" disabled={!formState.isValid}>
                    {isLoginMode ? 'LOGIN' : 'SIGNUP'}
                </Button>
            </form>
            <Button inverse onClick={switchModeHandler}>
                SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
            </Button>
        </CardAvatar>
    </React.Fragment>
  )
}

export default Auth