import React, { useContext, useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client';
import { SubmitHandler, useForm } from 'react-hook-form';

import { UserBaseProps } from '../../../types/userTypes';
import { AuthContext } from '../../../context/authContext';
import FormInput from '../../../components/Forms/FormElements/FormInput';
import SelectGroup from '../../../components/Forms/SelectGroup/SelectGroup';
import Email from '../../../components/Forms/FormElements/Email';
import FormTextarea from '../../../components/Forms/FormElements/FormTextarea';
import { ObjectGenericProps } from '../../../types/sharedTypes';
import { UserInfoType } from '../../../types/userTypes'
import { UPDATE_USER, GET_COUNTRIES_AND_LANGUAGES } from "../../../queries/queries"
import UserSvg from '../../../images/svg/UserSvg';
import EmailSvg from '../../../images/svg/EmailSvg';
import MobileSvg from '../../../images/svg/MobileSvg';
import EditSvg from '../../../images/svg/EditSvg';
import SuccessAlert from '../../../components/Alert/SuccessAlert';
import FailedAlert from '../../../components/Alert/FailedAlert';

const UpdateUser = ({ data, userDetail }) => {
    const auth = useContext(AuthContext)
    const [showUpdateSuccess, setShowUpdateSuccess] = useState(false)
    const [showUpdateFailed, setShowUpdateFailed] = useState(false)
    const [ updateUser, {error} ] = useMutation(UPDATE_USER)

    const { loading: loadingCountries, error: errorCountries, data: dataCountries } = useQuery(GET_COUNTRIES_AND_LANGUAGES)
    let countries = dataCountries?.getCountriesAndLanguages.countries
    let languages = dataCountries?.getCountriesAndLanguages.languages

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
      } = useForm<UserBaseProps>({
        defaultValues: userDetail
      })
    
    const updateUserHandler:SubmitHandler<UserBaseProps> = async(dataForm) => {
        try {
            const body: any = {}
            // Get all values of the UserInfoProps enum
            const userInfoValues = Object.values(UserInfoType);
        
            [...userInfoValues].map(value => 
                body[value] = dataForm[value]
            )
            body['userId'] = auth.userId
            const response = await updateUser({ variables: body }) 
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
            const newValues = {...userDetail}
            let newCountry = countries && countries.find((country: ObjectGenericProps<string> ) => country.country === userDetail['country']) 
            && countries.find((country: ObjectGenericProps<string> ) => country.country === userDetail['country'])?.id
            let newLanguage = languages && languages.find((language: ObjectGenericProps<string> ) => language.name === userDetail['language']) 
            && languages.find((language: ObjectGenericProps<string> ) => language.name === userDetail['language'])?.id
            newValues['language'] = newLanguage
            newValues['country'] = newCountry
            reset(newValues)
        }
    }, [userDetail, data, reset])

    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                    Personal Information
                </h3>
            </div>
            <div className="p-7">
                    { 
                        showUpdateSuccess && <SuccessAlert 
                            message={"Update personal information successfully!"}
                            setShowUpdateSuccess={setShowUpdateSuccess}
                        />
                    }
                    { 
                        showUpdateFailed && <FailedAlert
                            message={error?.message} 
                            setShowUpdateFailed={setShowUpdateFailed}
                        />
                    }
                <form onSubmit={handleSubmit(updateUserHandler)}>
                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                        <FormInput 
                            title="First Name*"
                            name="firstName"
                            placeholder="Enter Name"
                            type="text"
                            isRequired={true}
                            errors={errors}
                            isEdit={true}
                            className="w-full sm:w-1/2"
                            register={register}
                        >
                            <UserSvg className={"absolute left-4.5 top-4"}/>
                        </FormInput>

                        <FormInput 
                            title="Last Name*"
                            name="lastName"
                            placeholder="Enter Last Name"
                            type="text"
                            isRequired={true}
                            isEdit={true}
                            errors={errors}
                            className="w-full sm:w-1/2"
                            register={register}
                        >
                            <UserSvg className={"absolute left-4.5 top-4"}/>
                        </FormInput>
                    </div>
                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                        <FormInput 
                            title="Mobile no.*"
                            name="phone"
                            placeholder="Enter Mobile Phone"
                            type="tel"
                            errors={errors}
                            isRequired={true}
                            isEdit={true}
                            className="w-full sm:w-1/2"
                            register={register}
                        >
                            <MobileSvg className={"absolute left-4.5 top-4"}/>
                        </FormInput>

                        <Email 
                            className="w-full sm:w-1/2"
                            errors={errors}
                            isEdit={true}
                            register={register}
                        >
                            <EmailSvg className={"absolute left-4.5 top-4"}/>
                        </Email>
                    </div>
                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                        <SelectGroup
                            name="language" 
                            isEdit={true}
                            label="Select language*"
                            register={register}
                            >
                        {
                            languages 
                            && languages.map((language: ObjectGenericProps<string>) => (
                                <option 
                                className="text-body dark:text-bodydark"
                                key={language?.id} 
                                value={language.id}
                                > {language?.name.trim()}
                                </option>
                            ))
                        }
                        </SelectGroup>
                        <SelectGroup
                            name="country" 
                            isEdit={true}
                            label="Select country*"
                            register={register}
                        >
                        {
                            countries 
                            && countries.map((country: ObjectGenericProps<string>) => (
                            <option 
                                className="text-body dark:text-bodydark"
                                key={country?.id} value={country.id}
                            >{country?.country.trim()}</option>
                            ))
                        }
                        </SelectGroup>
                    </div>

                    <FormTextarea 
                        title='BIO'
                        name="aboutMe"
                        placeholder='Write your bio here'
                        className="mb-5.5"
                        isEdit={true}
                        errors={errors}
                        register={register}
                    >
                        <EditSvg />
                    </FormTextarea>

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

export default UpdateUser