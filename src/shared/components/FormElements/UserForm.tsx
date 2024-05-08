import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { UserFormProps } from '../../../user/types/userTypes';
import ErrorModal from '../../components/UIElements/ErrorModal';
import LoadingSpinner from '../../components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../hooks/http-hook';
import { ObjectGenericProps, SendRequestProps } from '../../types/sharedTypes';
import { sortFunction } from '../../util/sortFunction';
import ImageUpload from './ImageUpload';

import './UserForm.css';

const getAllCountries = async(sendRequest: SendRequestProps) => {
    try {
      const response = await sendRequest(`/v3.1/all?fields=name,flags`,
        'GET',
        null,
        {
          'Content-Type': 'application/json'
        }
      )
      return response
    } catch(err) {
      console.log(err)
    }
  }

const UserForm = ({ register, errors, setValue, imageUrl, title, disabled, children }: UserFormProps) => {
    const [dataFetched, setDataFetched] = useState(false);
    const { isLoading, error, sendRequest, clearError } = useHttpClient('https://restcountries.com');
    const { data: countries } = useQuery({
        queryKey: ['countries'],
        queryFn: () => getAllCountries(sendRequest),
        enabled: !dataFetched
    });
    
    // Check if data is being fetched for the first time
    if (isLoading && !dataFetched) {
        // Set dataFetched to true to disable further queries
        setDataFetched(true);
    }

    return (
    <div>
        <ErrorModal error={error} onClear={clearError}/>
        {isLoading && (
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
                    <label htmlFor='firstName'>First Name</label>
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
                    <label htmlFor='lastName'>Last Name</label>
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
                    <label htmlFor='email'>Email Address</label>
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
                    <label htmlFor='country'>Country</label>
                    <select 
                        id='country' {...register('country')}
                    >
                        {
                            countries 
                            && countries.sort(sortFunction).map((country: ObjectGenericProps<ObjectGenericProps<string>>) => (
                                <option key={country.name.common}>{country.name.common}</option>
                            ))
                        }
                    </select>
                </div>
                <div id='lang' className='form-control'>
                    <label htmlFor='language'>Language</label>
                    <div>
                        <select id='language' {...register('language')}>
                            <option value='english'>English</option>
                            <option value='finnish'>Finnish</option>
                            <option value='swedish'>Swedish</option>
                        </select>
                    </div>
                </div>
            </div>
            {children}
            </div>
        </div>
    </div>
  )
}

export default UserForm