import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'

interface EmailProps {
  register: UseFormRegister<FieldValues>
  className?: string
  isEdit: boolean
  errors: FieldErrors
  children: React.ReactNode
}


const Email = ({ register, isEdit, className, errors, children }: EmailProps) => {
  return (
    <div className={className ? className : "mb-4"}>
      <label htmlFor='email'
        className={
          isEdit 
          ? "mb-3 text-sm block font-medium text-black dark:text-white"
          : "mb-2.5 block font-medium text-black dark:text-white"
        }
      >
        Email
      </label>
      <div className="relative">
        <input
          type="email"
          id='email'
          placeholder="Enter your email"
          {...register('email', { required: 'This field is required.', pattern: /^\S+@\S+\.\S+$/ })}
          className={
            isEdit 
            ? "w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            : "w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          }
        />
        { children }
    </div>
    <ErrorMessage errors={errors} name="email" />
  </div>
  )
}

export default Email