import React from 'react'
import { FieldValues, UseFormRegister, Validate, FieldErrors } from 'react-hook-form'
import PasswordSvg from '../../../images/svg/PasswordSvg'
import { ErrorMessage } from "@hookform/error-message"

interface PasswordProps {
    label: string,
    name: string,
    placeholder: string,
    isEdit: boolean
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors
    validate?: Validate<any, FieldValues> | Record<string, Validate<any, FieldValues>> | undefined
  }

const Password = ({
    label,
    name,
    placeholder,
    isEdit,
    register,
    validate,
    errors
    }: PasswordProps) => {
  return (
    <div className={isEdit ? "w-full sm:w-1/2" : "mb-4"}>
      <label className={
            isEdit 
            ? "mb-3 block text-sm font-medium text-black dark:text-white"
            : "mb-2.5 block font-medium text-black dark:text-white"
      }>
        {label}*
      </label>
      <div className="relative">
        <input
          type="password"
          id={`${name}`}
          {...register(`${name}`, { 
            required: 'This field is required.', 
            validate: validate,
            minLength: {
                value: 6,
                message: 'Min length is 6'
            } 
          }
          )}
          placeholder={`${placeholder}`}
          autoComplete='current-password'
          className={
            isEdit 
            ? "w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            : "w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          }
        />
        <PasswordSvg className={isEdit ?
         "absolute left-4.5 top-4"
         : "absolute right-4 top-4"
        }/>
      </div>

      <ErrorMessage errors={errors} name={`${name}`} />
  </div>
  )
}

export default Password