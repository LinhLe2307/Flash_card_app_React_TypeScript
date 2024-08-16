import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import FailedAlert from '../../components/Alert/FailedAlert';
import SuccessAlert from '../../components/Alert/SuccessAlert';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import Email from '../../components/Forms/FormElements/Email';
import { FORGOT_PASSWORD } from "../../queries/queries";
import { ObjectGenericProps } from '../../types/sharedTypes';
import AuthBase from '../AuthBase';

import EmailSvg from '../../images/svg/EmailSvg';

const ForgotPasswordEmail = () => {
    const [showUpdateSuccess, setShowUpdateSuccess] = useState(false)
    const [showUpdateFailed, setShowUpdateFailed] = useState(false)
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm()
    
    const [singleUser, { loading, error }] = useMutation(FORGOT_PASSWORD)

    const handleSubmitEmail:SubmitHandler<ObjectGenericProps<string>> = async( data ) => {
        try {
            const response = await singleUser({
                variables: {
                    email: data.email
                }
            })

            if (response) {
                setShowUpdateSuccess(true)
            } else {
                setShowUpdateFailed(true)
            }
        } catch (err) {
            setShowUpdateFailed(true)
        }
    }

  return (
    <>
        <Breadcrumb pageName="Forgot Password" />
        <AuthBase>
            <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <span className="mb-1.5 block font-medium">Start for free</span>
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Forgot password
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

              <form onSubmit={handleSubmit(handleSubmitEmail)}>
                <Email 
                    errors={errors}
                    register={register}
                    isEdit={false}
                >
                  <EmailSvg className="absolute right-4 top-4"/>
                </Email>

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

export default ForgotPasswordEmail