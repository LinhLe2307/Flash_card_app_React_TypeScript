import { FieldValues, UseFormRegister } from 'react-hook-form'

const Email = ({register}: {register: UseFormRegister<FieldValues>,}) => {
  return (
    <div>
        <label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-900'>
            Email address*
        </label>
        <div className='mt-2'>
            <input 
              style={{ paddingRight: '1rem', paddingLeft: '1rem' }}
              placeholder='Enter your email'
              id='email' 
              {...register('email', { required: 'This field is required.', pattern: /^\S+@\S+\.\S+$/ })}
              className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
        </div>
    </div>
  )
}

export default Email