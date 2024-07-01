import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';

import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkIcon from '@mui/icons-material/Link';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';

import ImageUpload from '../../../shared/components/FormElements/ImageUpload';
import ErrorModal from '../../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';
import { SocialMediaType, UserFormProps } from '../../types/userTypes';

import { GET_COUNTRIES_AND_LANGUAGES } from '../../../shared/util/queries';
import './UserForm.css';
import { ObjectGenericProps } from '../../../shared/types/sharedTypes';

const UserForm = ({ register, errors, setValue, imageUrl, title, disabled, reset, userDetail, children }: UserFormProps) => {
    // Array of social media platforms and their URLs
    const socialMediaLinks = [
        { platform: 'x', icon: XIcon, url: '' },
        { platform: 'linkedIn', icon: LinkedInIcon, url: '' },
        { platform: 'instagram', icon: InstagramIcon, url: '' },
        { platform: 'github', icon: GitHubIcon, url: '' },
        { platform: 'website', icon: LinkIcon, url: '' }
    ];

    const { loading, error, data } = useQuery(GET_COUNTRIES_AND_LANGUAGES)
    const [errorMessage, setError] = useState<undefined | string>(error?.message);
    let countries = data?.getCountriesAndLanguages.countries
    let languages = data?.getCountriesAndLanguages.languages
    
    const clearError = () => {
        setError(undefined);
    };

    useEffect(() => {
        if (data && userDetail && reset) {
            const newValues = {...userDetail}
            let newCountry = countries.find((country: ObjectGenericProps<string> ) => country.country === userDetail['country']) 
                && countries.find((country: ObjectGenericProps<string> ) => country.country === userDetail['country'])?.id
            let newLanguage = languages.find((language: ObjectGenericProps<string> ) => language.name === userDetail['language']) 
                && languages.find((language: ObjectGenericProps<string> ) => language.name === userDetail['language'])?.id
            newValues['language'] = newLanguage
            newValues['country'] = newCountry
            reset(newValues)
        }
    }, [userDetail, data, reset])

    return (
    <div>
        <div className='card wrapper'>
        {
            loading && <div className='center'>
                <LoadingSpinner asOverlay />
            </div>
        }
        {
            errorMessage && <ErrorModal error={errorMessage} onClear={clearError}/>
        } 
        <h3>{title}</h3>
            <div>
                <ImageUpload 
                    register={register} 
                    center 
                    errorText={errors} 
                    setValue={setValue}
                    imageUrl={imageUrl}
                />
            </div>
        <div>
            <div className='row'>
                <div className='form-control'>
                    <label htmlFor='firstName'>First Name*</label>
                    <input 
                        id='firstName' 
                        {...register('firstName', {
                            required: 'This field is required.'
                        })}
                        placeholder='John'
                        className='bg-light form-control'
                        autoComplete='firstName'
                    />
                    <span>{errors.firstName?.message}</span>
                </div>
                <div className='form-control'>
                    <label htmlFor='lastName'>Last Name*</label>
                    <input 
                        id='lastName' 
                        {...register('lastName', {
                            required: 'This field is required.'
                        })}
                        placeholder='Doe'
                        className='bg-light form-control'
                        autoComplete='lastName'
                    />
                    <span>{errors.lastName?.message}</span>
                </div>
            </div>
            <div className='row'>
                <div className='form-control'>
                    <label htmlFor='email'>Email Address*</label>
                    <input 
                        id='email'
                        disabled={disabled}
                        style={{
                            backgroundColor: 'none'
                        }}
                        type='text' 
                        className='form-control' 
                        placeholder='john_doe@email.com' 
                        autoComplete='email'
                        {...register('email', {required: 'This field is required.', pattern: /^\S+@\S+\.\S+$/ })}
                    />
                    <span>{errors.email?.message}</span>
                </div>
                <div className='form-control'>
                    <label htmlFor='phone'>Phone Number</label>
                    <input 
                        id='phone'
                        type='tel' 
                        className='form-control' 
                        placeholder='+358 1368 230797' 
                        autoComplete='phone'
                        {...register('phone')}
                    />
                    <span>{errors.email?.message}</span>
                </div>
            </div>
            <div className='row'>
                <div className='form-control'> 
                    <label htmlFor='country'>Country*</label>
                    <select 
                        id='country' 
                        {...register('country', {
                            required: 'This field is required.'
                        })}
                    >
                        <option defaultValue='' disabled>-- Choose a country --</option>
                        {
                            countries 
                            && countries.map((country: ObjectGenericProps<string>) => (
                                <option key={country?.id} value={country?.id}>{country?.country}</option>
                            ))
                        }
                    </select>
                </div>
                <div id='lang' className='form-control'>
                    <label htmlFor='language'>Language*</label>
                    <div>
                        <select id='language' {...register('language', {
                            required: 'This field is required.'
                        })}>
                            {
                            languages 
                            && languages.map((language: ObjectGenericProps<string>) => (
                                <option key={language?.id} value={language?.id}>{language?.name}</option>
                            ))
                        }
                        </select>
                    </div>
                </div>
            </div>
            <div className='form-control'>
                <label htmlFor='aboutMe'>About me</label>
                <div>
                    <textarea 
                        id='aboutMe'
                        style={{
                            backgroundColor: 'none'
                        }}
                        className='form-control' 
                        placeholder='A short description about me'
                        {...register('aboutMe')}
                    />
                </div>
            </div>
            <div>
                <label>Additional Information</label>
                    <ul className='form-social-media'>
                    {
                        socialMediaLinks.map((link) => (
                            <li key={link.platform} className='form-control form-control-social-media'>
                                <span className='link-social'><link.icon /></span>
                                <input 
                                    id={`${link.platform}`}
                                    type='text' 
                                    className='form-control' 
                                    placeholder={`Please enter your ${link.platform} link`}
                                    {...register(SocialMediaType[link.platform as keyof typeof SocialMediaType])}
                                />
                            </li>
                        ))
                    }
                </ul> 
            </div>
            {children}
            </div>
        </div>
    </div>
  )
}

export default UserForm