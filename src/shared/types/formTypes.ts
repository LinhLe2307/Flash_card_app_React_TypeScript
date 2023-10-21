import { GenericProps } from "./sharedTypes"

export enum InputValueProps {
    CHANGE = 'CHANGE',
    TOUCH = 'TOUCH'
}

export interface ValueAndValidProps {
    value: string
    isValid: boolean
}

export interface FormValueObjectProps {
    [nameId: string]: ValueAndValidProps
}

export type FormInputsProps = {
    [key: string]: {
        value: FormValueObjectProps| string,
        isValid: boolean
    }
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

// ----- FORM ------
 
export enum FormActionProps {
    INPUT_CHANGE= 'INPUT_CHANGE',
    SET_DATA = "SET_DATA",
    REMOVE_CARD = "REMOVE_CARD",
    ADD_CARD="ADD_CARD"
}

export interface SetFormDataProps {
    (inputData: FormInputsProps, formValidity: boolean) : void
}

export type FormAction = {
    type: FormActionProps.INPUT_CHANGE
    inputId: string
    isValid: boolean
    nameId: string 
    value: FormValueObjectProps | string
} | {
    type: FormActionProps.SET_DATA,
    inputs: FormInputsProps,
    formIsValid: boolean | undefined
} | {
    type: FormActionProps.REMOVE_CARD,
    inputId: string
} | {
    type: FormActionProps.ADD_CARD,
}

export interface FormState {
    inputs: FormInputsProps,
    isValid: boolean | undefined
}

export interface UserFormHandler {
    (initialInputs: FormInputsProps, initialFormValidity: boolean) : [
        formState: FormState,
        removeSubCardHandler: GenericProps<string>,
        inputHandler: InputHandlerProps,
        addMoreCardHandler: ()=>void,
        setFormData: SetFormDataProps,
    ]
}
