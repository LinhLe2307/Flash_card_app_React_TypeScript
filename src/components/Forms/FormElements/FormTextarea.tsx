import React from 'react'
import { ErrorMessage } from '@hookform/error-message'
import { FieldValues, UseFormRegister, FieldErrors } from 'react-hook-form'

interface FormTextareaProps {
    title: string
    name: string
    placeholder: string
    className: string
    register: UseFormRegister<FieldValues>
    isEdit: boolean
    errors: FieldErrors
    children: React.ReactNode
}

const FormTextarea = ({
    title, name, isEdit,
    placeholder, register, className, errors, children
}: FormTextareaProps) => {
  return (
    <div className={className}>
        <label
            className={
                isEdit 
                ? "mb-3 text-sm block font-medium text-black dark:text-white"
                : "mb-2.5 block font-medium text-black dark:text-white"
            }
            htmlFor="aboutMe"
        >
            {title}
        </label>
        <div className="relative">
            {children}
            <textarea
                className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                id={`${name}`}
                rows={6}
                placeholder={`${placeholder}`}
                {
                    ...register(`${name}`)
                }
            ></textarea>
        </div>
        <ErrorMessage errors={errors} name={`${name}`} />
    </div>
  )
}

export default FormTextarea