import { useContext, useState } from "react"
import Button from "../../shared/components/FormElements/Button"
import Input from "../../shared/components/FormElements/Input"
import CardAvatar from "../../shared/components/UIElements/CardAvatar"
import { useForm } from "../../shared/hooks/form-hook"
import { FormHandlerProps } from "../../shared/types/formTypes"
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators"
import { AuthContext } from "../../shared/context/auth-context"
import './Auth.css'

const Auth = () => {
    const auth = useContext(AuthContext)
    const [isLoginMode, setIsLoginMode] = useState(false)
    const [formState, inputHandler, setFormData] = useForm({
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

    const authSubmitHandler:FormHandlerProps = (event) => {
        event.preventDefault()
        console.log(formState.inputs)
        auth.login()
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
     
  return (
    <CardAvatar className="authentication">
        <h2>Login Required</h2>
        <form onSubmit={authSubmitHandler}>
            {!isLoginMode && <Input
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
                id="password"
                element="input"
                type="text"
                label="Password"
                validators={
                    [
                        VALIDATOR_REQUIRE(),
                        VALIDATOR_MINLENGTH(10)
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
  )
}

export default Auth