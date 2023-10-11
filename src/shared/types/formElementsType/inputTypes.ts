// useReducer
export enum ValueActionKind {
    CHANGE = 'CHANGE',
    TOUCH = 'TOUCH'
}

export type ValidatorProps = {
    type: string
    val?: string
}

// An interface for our actions
export interface ValueAction {
    val: string
    type: string,
    payload?: number,
    validators: ValidatorProps[]
}

// An interface for our state
export interface ValueState {
    value: string 
    isValid: boolean
    isTouched: boolean
}

// Interface for our state
export interface LoadingState {
    loaded: boolean;
    loading: boolean;
    error: Error | null;
  }

export type InputReducerProps = (state: ValueState, action: ValueAction) => ValueState

// Input props

export interface InputProps {
        id?: string
        label: string
        element: string
        type: string
        placeholder?: string
        rows?: number
        errorText: string
        validators: ValidatorProps[]
}
    
export type changeHandlerProps = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
