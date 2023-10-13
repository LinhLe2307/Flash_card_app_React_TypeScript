export enum InputValueProps {
    CHANGE = 'CHANGE',
    TOUCH = 'TOUCH'
}

export interface ValidatorsProps {
    type: string
    val?:  string | number
}

export interface InputAction {
    val: string
    type: keyof typeof InputValueProps,
    payload?: number,
    validators: ValidatorsProps[]
}

export interface InputState {
    value: string
    isValid: boolean
    isTouched: boolean
}

export interface InputHandlerProps {
    (value: string, isValid: boolean, id: string) : void
}

interface UpdateCardInputProps {
    initialValue?: string
    initialIsValid?: boolean
}

export interface InputProps extends UpdateCardInputProps {
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

export enum FormInputsProps {
    term,
    definition
}

type InitialInputsProps = {
    [inputId in keyof typeof FormInputsProps]: {
        value: string,
        isValid: boolean
    }
}

export interface SetFormDataProps {
    (inputData: InitialInputsProps, formValidity: boolean) : void
}


export type FormAction = {
    type: 'INPUT_CHANGE'
    inputId: string
    isValid: boolean
    value: string
} | {
    type: 'SET_DATA',
    inputs: InitialInputsProps,
    formIsValid: boolean
}

export interface FormState {
    inputs: InitialInputsProps,
    isValid: boolean
}


export interface UserFormHandler {
    (initialInputs: InitialInputsProps, initialFormValidity: boolean) : [
        formState: FormState,
        inputHandler: InputHandlerProps,
        setFormData: SetFormDataProps
    ]
}

export interface FormHandlerProps{
    (event: React.FormEvent<HTMLFormElement>): void
} 