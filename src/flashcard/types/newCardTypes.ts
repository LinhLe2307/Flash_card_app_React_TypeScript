export enum InputKindProps {
    INPUT_CHANGE= 'INPUT_CHANGE'
}

export enum FormInputsProps {
    term = 'term',
    definition = 'definition'
}

interface ValueProps {
    value: string,
    isValid: boolean
}

export type FormState  = {
    inputs: {
        [input in keyof typeof FormInputsProps]: ValueProps
    },
    isValid: boolean
  }
export interface FormAction extends ValueProps {
    type: InputKindProps
    inputId: string
}
