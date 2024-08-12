import { FieldValues, UseFormRegister } from 'react-hook-form'

interface FormInputProps {
    title: string
    name: string
    placeholder: string
    type: string
    register: UseFormRegister<FieldValues>
}

const FormInput = ({
    title, name, 
    placeholder, type, register
}: FormInputProps) => {
  return (
    <div>
        <div className="flex items-center justify-between">
            <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
              {title}
            </label>
            </div>
            <div className="mt-2">
                <input 
                    style={{ paddingRight: '1rem', paddingLeft: '1rem' }}
                    placeholder={placeholder}
                    type={type}
                    id={name}
                    {...register(`${name}`, {         
                        required: 'This field is required.'
                    })}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
            </div>
        </div>
  )
}

export default FormInput