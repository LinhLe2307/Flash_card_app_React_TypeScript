export enum InputValueProps {
    CHANGE = 'CHANGE',
    TOUCH = 'TOUCH'
}

interface ValueAndTypeProps {
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
    validators: ValidatorsProps[]
}

export interface InputState extends ValueAndTypeProps {
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

export enum FormInputsProps  {
    term,
    definition,
}

export enum AuthProps {
    email,
    password,
    name
}

type NewProps = FormInputsProps | AuthProps

// type InitialInputsProps = {
//     [inputId in keyof NewProps]: ValueAndTypeProps
// }
type InitialInputsProps = {
    [inputId in keyof typeof FormInputsProps]: ValueAndTypeProps
} | {
    [inputId in keyof typeof AuthProps]: ValueAndTypeProps | undefined
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
    formIsValid: boolean | undefined

}

export interface FormState {
    inputs: InitialInputsProps,
    isValid: boolean | undefined
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