import React, { useContext, useState } from 'react'
import { SubmitHandler, useForm } from "react-hook-form"
import Button from '../../shared/components/FormElements/Button'
import ImageUpload from '../../shared/components/FormElements/ImageUpload'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { AuthContext } from '../../shared/context/auth-context'
import { useHttpClient } from '../../shared/hooks/http-hook'
import './Auth.css'
import CardAvatar from '../../shared/components/UIElements/CardAvatar'


export type AuthInputs = {
    email: string
    password: string
    name: string
    image: File
}

const InputForm = () => {
    
}

const Auth = () => {
    const auth = useContext(AuthContext)
    const { isLoading, error, sendRequest, clearError } = useHttpClient()   
    const [isLoginMode, setIsLoginMode] = useState(false)
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: {errors}
    } = useForm<AuthInputs>()

    const authSubmitHandler:SubmitHandler<AuthInputs> = async(data) => {
        // console.log("formState", formState)
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
                auth.login(response.userId, response.token)
                } catch(err) {
                console.log(err)
            }
        } else {
            try {
                const formData = new FormData()  
                formData.append('email', data.email)
                formData.append('name', data.name)
                formData.append('password', data.password)
                formData.append('image', data.image)
                for (var [key, value] of formData.entries()) { 
                    console.log(key, value);
                  }                  
                
                const response = await sendRequest(`/api/users/signup`,
                    'POST',
                    formData,
                    {}
                )
                auth.login(response.userId, response.token)
                console.log(response)
            } catch(err) {
                console.log(err)
            }
        }
    }

    const switchModeHandler = () => {
        setIsLoginMode(prevMode => !prevMode)
    }

  return (
    <React.Fragment>
        <CardAvatar className="authentication">
            {isLoading && <LoadingSpinner asOverlay/>}
            <form onSubmit={handleSubmit(authSubmitHandler)}>
                {!isLoginMode && 
                    <>
                        <div className={`form-control`}>
                            <label htmlFor="name">Name</label>
                            <input 
                                id="name" 
                                {...register("name")}
                                placeholder="Please enter your name"
                            />
                            {errors.name?.message && <span>This field is required</span>}
                        </div>

                        <div className={`form-control`}>
                            <label htmlFor="image">Image</label>
                            <ImageUpload 
                                register={register} 
                                center 
                                id="image" 
                                errorText={error} 
                                setValue={setValue}
                            />            
                            {errors.image && <span>This field is required</span>}
                        </div>
                    </>
                }
                <div className={`form-control`}>
                    <label htmlFor="email">Email</label>
                    <input 
                        id="email" 
                        {...register("email", { required: "This is required.", pattern: /^\S+@\S+\.\S+$/ })}
                        placeholder="Please enter your email"
                    />
                    <span>{errors.email?.message}</span>
                </div>
                <div className={`form-control`}>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" 
                        {...register("password", { 
                            required: "This is required.", 
                            minLength: {
                                value: 6,
                                message: "Min length is 6"
                            } 
                        })}
                        placeholder="Please enter your password"
                    />
                    <span>{errors.password?.message}</span>
                </div>
                <Button type="submit">
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