import React from 'react'
import { FieldValues, UseFormRegister, FieldErrors } from 'react-hook-form'
import { ErrorMessage } from "@hookform/error-message"

interface FormInputProps {
    title: string
    name: string
    placeholder: string
    type: string
    register: UseFormRegister<FieldValues>
    isRequired: boolean
    errors: FieldErrors
    className?: string
    children: React.ReactNode
}

const FormInput = ({
    title, name, placeholder, type, className, register, isRequired, errors, children
}: FormInputProps) => {
  return (
    <div className={className ? className : "mb-4"}>
        <label className={
            className 
            ? "mb-3 block font-medium text-black dark:text-white"
            : "mb-2.5 block font-medium text-black dark:text-white"
        }
        >
            { title }
        </label>
        <div className="relative">
            <input 
                placeholder={placeholder}
                type={type}
                id={name}
                {...register(`${name}`, {         
                    required: isRequired ? 'This field is required.' : false
                })}
                className={
                    className 
                    ? "w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    : "w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  }
            />
            { children }
        </div>

        <ErrorMessage errors={errors} name={`${name}`} />
        
    </div>
  )
}

export default FormInput