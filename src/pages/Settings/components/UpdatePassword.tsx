import { useMutation } from '@apollo/client';
import React, { useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Password from '../../../components/Forms/FormElements/Password';
import { AuthContext } from '../../../context/authContext';
import { RESET_PASSWORD } from "../../../queries/queries";
import { UserBaseProps } from '../../../types/userTypes';
import SuccessAlert from '../../../components/Alert/SuccessAlert';
import FailedAlert from '../../../components/Alert/FailedAlert';

const UpdatePassword = () => {
    const auth = useContext(AuthContext)
    const [showUpdateSuccess, setShowUpdateSuccess] = useState(false)
    const [showUpdateFailed, setShowUpdateFailed] = useState(false)
    const [ resetPassword, { error } ] = useMutation(RESET_PASSWORD)
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors }
      } = useForm<UserBaseProps>()

    const handleSubmitPassword: SubmitHandler<UserBaseProps> = async (data) => {
      try {
        const response = await resetPassword({
          variables: {
            password: data.password,
            token: auth.token
            }
        })

        if (response) {
          reset({
            password: "",
            confirmPassword: ""
          })
          setShowUpdateSuccess(true)
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
        <div className="mt-7.5 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Change Password
            </h3>
          </div>
          <div className="p-7">
            { 
              showUpdateSuccess && <SuccessAlert 
                message={"Update password successfully!"}
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
              <div className="flex justify-end gap-4.5">
                <button
                  className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                  type="submit"
                >
                  Cancel
                </button>
                <button
                  className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
      </div>
  )
}

export default UpdatePassword