import React from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

interface SelectProps {
    title: string
    name: string
    defaultOption: string
    className: string
    isEdit: boolean
    register: UseFormRegister<FieldValues>
    children: React.ReactNode
}

const Select = ({title, name, defaultOption, isEdit, className, register, children}: SelectProps) => {
  return (
    <div className={className}>
        <label htmlFor='email'
            className={
                isEdit 
                ? "mb-3 text-sm block font-medium text-black dark:text-white"
                : "mb-2.5 block font-medium text-black dark:text-white"
            }
        >
            { title }
        </label>
        <div className="relative">
            <select id={name} {...register(`${name}`, {
                required: 'This field is required.'
            })}
            className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
        >
            <option defaultValue='' disabled>{defaultOption}</option>
            {children}
        </select>
        </div>
    </div>
  )
}

export default Select