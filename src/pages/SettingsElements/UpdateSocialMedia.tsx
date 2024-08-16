import { useMutation } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import FormInput from '../../components/Forms/FormElements/FormInput';
import { AuthContext } from '../../context/authContext';
import { UPDATE_SOCIAL_MEDIA } from '../../queries/queries';
import { SocialMediaType, UserBaseProps } from '../../types/userTypes';
import SuccessAlert from '../../components/Alert/SuccessAlert';
import FailedAlert from '../../components/Alert/FailedAlert';

import GithubSvg from '../../images/svg/GithubSvg';
import InstagramSvg from '../../images/svg/InstagramSvg';
import LinkedInSvg from '../../images/svg/LinkedInSvg';
import LinkSvg from '../../images/svg/LinkSvg';
import XSvg from '../../images/svg/XSvg';

const UpdateSocialMedia = ({ data, userDetail }) => {
    const auth = useContext(AuthContext)
    const [showUpdateSuccess, setShowUpdateSuccess] = useState(false)
    const [showUpdateFailed, setShowUpdateFailed] = useState(false)
    const [ updateSocialMedia, { error } ] = useMutation(UPDATE_SOCIAL_MEDIA)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
      } = useForm<UserBaseProps>({
        defaultValues: userDetail
      })
    
    const updateSocialMediaHandler:SubmitHandler<UserBaseProps> = async(dataForm) => {
        try {
          const body: any = {}
          // Get all values of the SocialMedia enum
          const socialMediaValues = Object.values(SocialMediaType);
    
          [...socialMediaValues].map(value => 
              body[value] = dataForm[value]
          )
          body['userId'] = auth.userId
          const response = await updateSocialMedia({ variables: body }) 
          if (response ) {
            setShowUpdateSuccess(true)
          } else {
            setShowUpdateFailed(true)
          }
          
        } catch(err) {
          setShowUpdateFailed(true)
        }
    }

    useEffect(() => {
        if (userDetail && data && reset) {
          reset(userDetail)
        }
    }, [userDetail, data, reset])

    return (
        <div className="mt-7.5 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Additional Information
            </h3>
          </div>
          <div className="p-7">
            { 
              showUpdateSuccess && <SuccessAlert 
                message={"Update social media successfully!"}
                setShowUpdateSuccess={setShowUpdateSuccess}
              />
            }
            { 
              showUpdateFailed && <FailedAlert
                message={error?.message} 
                setShowUpdateFailed={setShowUpdateFailed}
              />
            }
            <form onSubmit={handleSubmit(updateSocialMediaHandler)}>
              <div>
                <FormInput 
                  title="LinkedIn"
                  name="linkedIn"
                  type="text"
                  placeholder="Enter your LinkedIn's link"
                  isRequired={false}
                  errors={errors}
                  className="mb-5.5"
                  isEdit={true}
                  register={register}
                  >
                  <LinkedInSvg className={"absolute left-4.5 top-4"}/>
                </FormInput>
                <FormInput 
                  title="Github"
                  name="github"
                  type="text"
                  isRequired={false}
                  isEdit={true}
                  errors={errors}
                  placeholder="Enter your Github's link"
                  className="mb-5.5"
                  register={register}
                  >
                  <GithubSvg className={"absolute left-4.5 top-4"}/>
                </FormInput>
                <FormInput 
                  title="X"
                  name="x"
                  type="text"
                  placeholder="Enter your X's link"
                  isRequired={false}
                  isEdit={true}
                  errors={errors}
                  className="mb-5.5"
                  register={register}
                >
                  <XSvg className={"absolute left-4.5 top-4"}/>
                </FormInput>
                <FormInput 
                  title="Instagram"
                  name="instagram"
                  type="text"
                  placeholder="Enter your Instagram's link"
                  isRequired={false}
                  isEdit={true}
                  errors={errors}
                  className="mb-5.5"
                  register={register}
                >
                  <InstagramSvg className={"absolute left-4.5 top-4"}/>
                </FormInput>
                <FormInput 
                  title="Website"
                  name="website"
                  type="text"
                  placeholder="Enter your Website's link"
                  isRequired={false}
                  errors={errors}
                  isEdit={true}
                  className="mb-5.5"
                  register={register}
                >
                  <LinkSvg className={"absolute left-4.5 top-4"}/>                        
                </FormInput>                
              </div>

              <div className="flex justify-end gap-4.5">
                <button
                  className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                  type="button"
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

export default UpdateSocialMedia