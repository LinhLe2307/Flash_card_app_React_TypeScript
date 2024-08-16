import { useMutation } from "@apollo/client";
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from "react-router-dom";

import FailedAlert from "../../components/Alert/FailedAlert";
import SuccessAlert from "../../components/Alert/SuccessAlert";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import AuthBase from "../AuthBase";
import Password from "../../components/Forms/FormElements/Password";

import { RESET_PASSWORD } from "../../queries/queries";
import { ObjectGenericProps } from "../../types/sharedTypes";

const ForgotPassword = () => {
    const { token } = useParams()
    const [showUpdateSuccess, setShowUpdateSuccess] = useState(false)
    const [showUpdateFailed, setShowUpdateFailed] = useState(false)
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
                navigate("/auth/signin")
            } else {
                setShowUpdateFailed(true)
            }

        } catch (err) {
            setShowUpdateFailed(true)
        }
    }

    // Watch the password value
    const password = watch('password', '');

    return (
        <>
            <Breadcrumb pageName="Forgot Password" />
            <AuthBase>
                <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
                <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                <span className="mb-1.5 block font-medium">Start for free</span>
                <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                    Reset password
                </h2>
                    { 
                        showUpdateSuccess && <SuccessAlert 
                        message={"Please check your gmail!"}
                        setShowUpdateSuccess={setShowUpdateSuccess}
                        />
                    }
                    { 
                        showUpdateFailed && <FailedAlert
                        message={error?.message} 
                        setShowUpdateFailed={setShowUpdateFailed}
                        />
                    }

                <form onSubmit={handleSubmit(handleSubmitPassword)}>
                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                        <Password
                            label='Password'
                            name='password'
                            isEdit={true}
                            placeholder='Please enter a new password'
                            errors={errors}
                            register={register}
                        />
                            
                        <Password 
                            label='Confirm Password'
                            name='confirmPassword'
                            isEdit={true}
                            placeholder='Please confirm your password'
                            register={register}
                            errors={errors}
                            validate={(value) => value === password || 'Passwords do not match'}
                        />
                    </div>
                    <div className="mb-5">
                        <input
                            type="submit"
                            value="Continue"
                            className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                        />
                    </div>
                </form>
                </div>
            </div>
            </AuthBase>
    </>
    )
}

export default ForgotPassword