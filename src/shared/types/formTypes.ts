import { GenericProps, ObjectGenericProps, SendRequestProps } from './sharedTypes'

export enum InputValueProps {
    CHANGE = 'CHANGE',
    TOUCH = 'TOUCH'
}

export interface ValueAndValidProps<T> {
    value: T
    isValid: boolean
}

export enum VALUE_CARD {
    term= 'term',
    definition = 'definition',
    imageUrl = 'imageUrl'
}

export type ObjectGenericInitial = {
  [key in keyof typeof VALUE_CARD]: ValueAndValidProps<string>;
}

export type FormInputsProps = {
    [key: string]: ValueAndValidProps<ObjectGenericInitial| string | ObjectGenericProps<ValueAndValidProps<string>>> 
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

export interface InputState extends ValueAndValidProps<string> {
    isTouched: boolean
}
export interface InputHandlerProps {
    (value: string, isValid: boolean, inputId: string, nameId: string) : void
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
    className?: string 
}

// ----- FORM ------

export enum FormActionProps {
    INPUT_CHANGE= 'INPUT_CHANGE',
    REMOVE_CARD = 'REMOVE_CARD',
    ADD_CARD='ADD_CARD',
    RESET_FORM='RESET_FORM',
    INITIAL_FORM_STATE='INITIAL_FORM_STATE',

    FETCH_UPDATE_CARD='FETCH_UPDATE_CARD',
    SET_DATA_SUCCESS='SET_DATA_SUCCESS',
    SET_DATA_FAILURE='SET_DATA_FAILURE'
}

export interface SetFormDataProps {
    (inputData: FormInputsProps, formValidity: boolean) : void
}

export interface FetchUpdateDataPayload {
    cardId: string,
    sendRequest: SendRequestProps
}

export interface InputChangeFormPayload {
        inputId: string
        isValid: boolean
        nameId: string 
        // value: string | ObjectGenericInitial
        value: ObjectGenericInitial |  ObjectGenericProps<ValueAndValidProps<string>> | string
}

export interface RemoveCardPayload {
    inputId: string
}

export interface SetDataPayload {
    inputs: FormInputsProps,
    formIsValid: boolean | undefined
}

export type FormAction = {
    type: FormActionProps.INPUT_CHANGE
    payload: InputChangeFormPayload
} | {
    type: FormActionProps.SET_DATA_SUCCESS,
    payload: SetDataPayload
} | {
    type: FormActionProps.REMOVE_CARD,
    payload: RemoveCardPayload
} | {
    type: FormActionProps.ADD_CARD | FormActionProps.RESET_FORM,
} | {
    type: FormActionProps.FETCH_UPDATE_CARD,
    payload: FetchUpdateDataPayload
} | {
    type: FormActionProps.INITIAL_FORM_STATE,
    payload: {
        initialState: FormState
    }
}

export interface FormState {
    inputs: FormInputsProps,
    isValid: boolean | undefined
}

export interface UserFormHandler {
    () : [
        formState: FormState,
        removeSubCardHandler: GenericProps<string>,
        inputHandler: InputHandlerProps,
        addMoreCardHandler: ()=>void,
        setInitialState: (initialState: FormState) => void
    ]
}

  