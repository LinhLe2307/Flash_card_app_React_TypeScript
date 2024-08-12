import { FieldValues, UseFormRegister, Validate } from 'react-hook-form'

interface PasswordProps {
    label: string,
    name: string,
    placeholder: string,
    register: UseFormRegister<FieldValues>,
    validate?: Validate<any, FieldValues> | Record<string, Validate<any, FieldValues>> | undefined,
    children?: React.ReactNode
}

const Password = ({
    label,
    name,
    placeholder,
    register,
    validate,
    children
    }: PasswordProps) => {
  return (
    <div>
        <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              {label}*
            </label>
                { children }
              </div>
               <div className="mt-2">

                <input type='password' id={`${name}`} 
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  autoComplete='current-password'
                  style={{ paddingRight: '1rem', paddingLeft: '1rem' }}
                />
              </div>
        </div>
  )
}

export default Password