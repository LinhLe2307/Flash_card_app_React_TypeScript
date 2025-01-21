import { useMutation, useQuery } from '@apollo/client';
import React, { useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import FailedAlert from '../../components/Alert/FailedAlert';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import Email from '../../components/Forms/FormElements/Email';
import FormInput from '../../components/Forms/FormElements/FormInput';
import Password from '../../components/Forms/FormElements/Password';
import SelectGroup from '../../components/Forms/SelectGroup/SelectGroup';

import { AuthContext } from '../../context/authContext';
import EmailSvg from '../../images/svg/EmailSvg';
import { GET_COUNTRIES_AND_LANGUAGES, SIGN_UP_USER } from '../../queries/queries';
import { ObjectGenericProps } from '../../types/sharedTypes';
import { UserBaseProps, UserInfoType } from '../../types/userTypes';
import AuthBase from './components/AuthBase';
import UserSvg from '../../images/svg/UserSvg';
import MobileSvg from '../../images/svg/MobileSvg';

const SignUp: React.FC = () => {
  const auth = useContext(AuthContext)
  const [showUpdateFailed, setShowUpdateFailed] = useState(false)
    
  const {
    register,
    handleSubmit,
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
          setShowUpdateFailed(true)
        }
    } catch(err) {
      setShowUpdateFailed(true)
    }
  }

  // Watch the password value
  const password = watch('password', '');

  return (
    <>
      <Breadcrumb pageNavigate="Authentication /" pageName="Sign Up" link="/auth/signup" />

      <AuthBase>
      <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <span className="mb-1.5 block font-medium">Start for free</span>
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Sign Up to Card.IO
              </h2>
              { 
                showUpdateFailed && <FailedAlert
                  message={errorSignUp?.message} 
                  setShowUpdateFailed={setShowUpdateFailed}
                />
              }
              <form onSubmit={handleSubmit(authSubmitHandler)}>
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <FormInput
                    title="First Name*"
                    name="firstName"
                    placeholder='Enter Name'
                    type="text"
                    isRequired={true}
                    isEdit={false}
                    errors={errors}
                    className="w-full sm:w-1/2"
                    register={register}
                  >
                    <UserSvg className="absolute right-4 top-4"/>
                  </FormInput>

                  <FormInput
                    title="Last Name*"
                    name="lastName"
                    placeholder='Enter Last Name'
                    type="text"
                    isRequired={true}
                    isEdit={false}
                    errors={errors}
                    className="w-full sm:w-1/2"
                    register={register}
                  >
                    <UserSvg className="absolute right-4 top-4"/>
                  </FormInput>
                </div>

                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <Email 
                    errors={errors}
                    isEdit={false}
                    register={register}
                    className="w-full sm:w-1/2"
                  >
                    <EmailSvg className={"absolute right-4 top-4"}/>
                  </Email>

                  <FormInput
                    title="Mobile no.*"
                    name="phone"
                    placeholder='Enter Mobile Phone'
                    type="tel"
                    isEdit={false}
                    isRequired={true}
                    className="w-full sm:w-1/2"
                    errors={errors}
                    register={register}
                  >
                    <MobileSvg className="absolute right-4 top-4"/>
                  </FormInput>
                </div>

                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <SelectGroup
                    isEdit={false}
                    register={register}
                    label="Select language*"
                    name="language"
                  >
                    {
                      languages 
                        && languages.map((language: ObjectGenericProps<string>) => (
                        <option 
                          className="text-body dark:text-bodydark"
                          key={language?.id} 
                          value={language?.id}>{language?.name}</option>
                        ))
                    }
                  </SelectGroup>
                  <SelectGroup 
                    name="country"
                    isEdit={false}
                    register={register}
                    label="Select country*"
                  >
                    {
                      countries 
                      && countries.map((country: ObjectGenericProps<string>) => (
                        <option 
                          className="text-body dark:text-bodydark"
                          key={country?.id} value={country?.id}>{country?.country}</option>
                        ))
                    }
                  </SelectGroup>
                </div>

                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <Password
                    label='Password'
                    name='password'
                    isEdit={false}
                    errors={errors}
                    placeholder='Please enter a new password'
                    register={register}
                  />
                  
                  <Password 
                    label='Confirm Password'
                    name='confirmPassword'
                    isEdit={false}
                    placeholder='Please confirm your password'
                    register={register}
                    errors={errors}
                    validate={(value) => value === password || 'Passwords do not match'}
                  />
                </div>  

                <div className="mb-5">
                  <input
                    type="submit"
                    value="Create account"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  />
                </div>

                {/* <button className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-4 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50">
                  <span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_191_13499)">
                        <path
                          d="M19.999 10.2217C20.0111 9.53428 19.9387 8.84788 19.7834 8.17737H10.2031V11.8884H15.8266C15.7201 12.5391 15.4804 13.162 15.1219 13.7195C14.7634 14.2771 14.2935 14.7578 13.7405 15.1328L13.7209 15.2571L16.7502 17.5568L16.96 17.5774C18.8873 15.8329 19.9986 13.2661 19.9986 10.2217"
                          fill="#4285F4"
                        />
                        <path
                          d="M10.2055 19.9999C12.9605 19.9999 15.2734 19.111 16.9629 17.5777L13.7429 15.1331C12.8813 15.7221 11.7248 16.1333 10.2055 16.1333C8.91513 16.1259 7.65991 15.7205 6.61791 14.9745C5.57592 14.2286 4.80007 13.1801 4.40044 11.9777L4.28085 11.9877L1.13101 14.3765L1.08984 14.4887C1.93817 16.1456 3.24007 17.5386 4.84997 18.5118C6.45987 19.4851 8.31429 20.0004 10.2059 19.9999"
                          fill="#34A853"
                        />
                        <path
                          d="M4.39899 11.9777C4.1758 11.3411 4.06063 10.673 4.05807 9.99996C4.06218 9.32799 4.1731 8.66075 4.38684 8.02225L4.38115 7.88968L1.19269 5.4624L1.0884 5.51101C0.372763 6.90343 0 8.4408 0 9.99987C0 11.5589 0.372763 13.0963 1.0884 14.4887L4.39899 11.9777Z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M10.2059 3.86663C11.668 3.84438 13.0822 4.37803 14.1515 5.35558L17.0313 2.59996C15.1843 0.901848 12.7383 -0.0298855 10.2059 -3.6784e-05C8.31431 -0.000477834 6.4599 0.514732 4.85001 1.48798C3.24011 2.46124 1.9382 3.85416 1.08984 5.51101L4.38946 8.02225C4.79303 6.82005 5.57145 5.77231 6.61498 5.02675C7.65851 4.28118 8.9145 3.87541 10.2059 3.86663Z"
                          fill="#EB4335"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_191_13499">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  Sign up with Google
                </button> */}

                <div className="mt-6 text-center">
                  <p>
                    Already have an account?{' '}
                    <Link to="/auth/signin" className="text-primary">
                      Sign in
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
      </AuthBase>
    </>
  );
};

export default SignUp;
