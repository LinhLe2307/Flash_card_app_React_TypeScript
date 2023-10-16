export enum InputValueProps {
    CHANGE = 'CHANGE',
    TOUCH = 'TOUCH'
}

interface ValueAndValidProps {
    value: string
    isValid: boolean
}

export interface ValidatorsProps {
    type: string
    val?:  string | number
}

export interface InputAction {
    val: string
    type: keyof typeof InputValueProps,
    payload?: number,
    validators: ValidatorsProps[],
    nameId: string
}

export interface InputState extends ValueAndValidProps {
    isTouched: boolean
}

export interface InputHandlerProps {
    (value: string, isValid: boolean, id: string, nameId: string) : void
}

interface UpdateCardInputProps {
    initialValue?: string
    initialIsValid?: boolean
}

export interface InputProps extends UpdateCardInputProps {
    nameId: string
    id: string
    element: string
    type: string
    label: string
    placeholder?: string
    rows?: number
    validators: ValidatorsProps[]
    errorText?: string
    onInput: InputHandlerProps 
}

export interface EventHandler {
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) : void
}


// ----- FORM ------
 
export enum FormActionProps {
    INPUT_CHANGE= 'INPUT_CHANGE',
    SET_DATA = "SET_DATA"
}

// export type FormInputsProps = {
//     [inputId: string]: ValueAndValidProps
// }

// export type FormInputsProps = {
//     [inputId: string]: ValueAndValidProps
// }


export type FormInputsProps = {
    [key: string]: {
        value: {
            [nameId:string]: ValueAndValidProps
        } | string,
        isValid: boolean
    } 
  }

export interface SetFormDataProps {
    (inputData: FormInputsProps, formValidity: boolean) : void
}

export type FormAction = {
    type: 'INPUT_CHANGE'
    inputId: string
    isValid: boolean
    nameId: string 
    value: {
        [nameId:string]: ValueAndValidProps;
      } | string
} | {
    type: 'SET_DATA',
    inputs: FormInputsProps,
    formIsValid: boolean | undefined
}

export interface FormState {
    inputs: FormInputsProps,
    isValid: boolean | undefined
}

// type FlashCardInput = {
//     [key: string]: {
//       value: {
//         term: {
//           value: string,
//           isValid: boolean
//         },
//         definition: {
//           value: string,
//           isValid: boolean
//         };
//       }
//     } | {
//       value: string,
//       isValid: boolean
//     }
//   }

export interface UserFormHandler {
    (initialInputs: FormInputsProps, initialFormValidity: boolean) : [
        formState: FormState,
        inputHandler: InputHandlerProps,
        setFormData: SetFormDataProps
    ]
}
// export interface UserFormHandler {
//     (initialInputs: FormInputsProps, initialFormValidity: boolean) : [
//         formState: FormState,
//         inputHandler: InputHandlerProps,
//         setFormData: SetFormDataProps
//     ]
// }

export interface FormHandlerProps{
    (event: React.FormEvent<HTMLFormElement>): void
} 

