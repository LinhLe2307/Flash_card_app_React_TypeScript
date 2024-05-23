// import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkIcon from '@mui/icons-material/Link';

import { UserFormProps } from '../../types/userTypes';
import ErrorModal from '../../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import { ObjectGenericProps, SendRequestProps } from '../../../shared/types/sharedTypes';
import { sortFunction } from '../../../shared/util/sortFunction';
import { SocialMediaType } from '../../types/userTypes'
import ImageUpload from '../../../shared/components/FormElements/ImageUpload';
import { GET_COUNTRIES } from '../../../shared/util/queries'

import './UserForm.css';

const UserForm = ({ register, errors, setValue, imageUrl, title, disabled, children }: UserFormProps) => {
    const [dataFetched, setDataFetched] = useState(false);
    const countries = useQuery(GET_COUNTRIES)
    // const countries = data.data.getCountries

    // Array of social media platforms and their URLs
    const socialMediaLinks = [
        { platform: 'x', icon: XIcon, url: '' },
        { platform: 'linkedIn', icon: LinkedInIcon, url: '' },
        { platform: 'instagram', icon: InstagramIcon, url: '' },
        { platform: 'github', icon: GitHubIcon, url: '' },
        { platform: 'website', icon: LinkIcon, url: '' }
    ];
    
    // Check if data is being fetched for the first time
    if (countries.loading && !dataFetched) {
        // Set dataFetched to true to disable further queries
        setDataFetched(true);
    }

    console.log(countries)
    return (
    <div>
        {/* <ErrorModal error={error} onClear={clearError}/> */}
        {countries.loading && (
            <div className='center'>
                <LoadingSpinner asOverlay />
            </div>
        )}
        <div className='wrapper'>
        <h4>{title}</h4>
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
                        {...register('firstName')}
                        placeholder='John'
                        className='bg-light form-control'
                        autoComplete='firstName'
                    />
                    {errors.firstName?.message && <span>This field is required</span>}
                </div>
                <div className='form-control'>
                    <label htmlFor='lastName'>Last Name*</label>
                    <input 
                        id='lastName' 
                        {...register('lastName')}
                        placeholder='Doe'
                        className='bg-light form-control'
                        autoComplete='lastName'
                    />
                    {errors.lastName?.message && <span>This field is required</span>}
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
                        {...register('email', {required: 'This is required.', pattern: /^\S+@\S+\.\S+$/ })}
                    />
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
                        id='country' {...register('country')}
                    >
                        {/* {
                            countries 
                            && countries.sort(sortFunction).map((country: ObjectGenericProps<ObjectGenericProps<string>>) => (
                                <option key={country?.name?.common}>{country?.name?.common}</option>
                            ))
                        } */}
                    </select>
                </div>
                <div id='lang' className='form-control'>
                    <label htmlFor='language'>Language*</label>
                    <div>
                        <select id='language' {...register('language')}>
                            <option value='english'>English</option>
                            <option value='finnish'>Finnish</option>
                            <option value='swedish'>Swedish</option>
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