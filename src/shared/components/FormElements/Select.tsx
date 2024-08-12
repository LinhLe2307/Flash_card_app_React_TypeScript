import { FieldValues, UseFormRegister } from 'react-hook-form'

interface SelectProps {
    title: string
    name: string
    defaultOption: string
    register: UseFormRegister<FieldValues>
    children: React.ReactNode
}

const Select = ({title, name, defaultOption, register, children}: SelectProps) => {
  return (
    <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">{title}</label>
        <div>
            <select id={name} {...register(`${name}`, {
                required: 'This field is required.'
            })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 white:bg-gray-700 white:border-gray-600 white:placeholder-gray-400 white:text-black white:focus:ring-blue-500 white:focus:border-blue-500"
        >
            <option defaultValue='' disabled>{defaultOption}</option>
            {children}
        </select>
        </div>
    </div>
  )
}

export default Select