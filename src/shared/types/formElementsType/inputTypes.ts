// useReducer
export enum CountActionKind {
    CHANGE = 'CHANGE'
}

// An interface for our actions
export interface CountAction {
    type: CountActionKind;
    payload?: number,
    val: string
}

// An interface for our state
export interface CountState {
    value: string
    isValid: boolean
}

// Interface for our state
export interface LoadingState {
    loaded: boolean;
    loading: boolean;
    error: Error | null;
  }

export type InputReducerProps = (state: CountState, action: CountAction) => CountState

// Input props

export interface InputProps {
        id?: string
        label: string
        element: string
        type: string
        placeholder?: string
        rows?: number
        errorText: string
        validators: object
}
    
export type changeHandlerProps = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
