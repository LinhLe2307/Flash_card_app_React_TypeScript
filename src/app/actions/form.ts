import { FormActionProps, FormState, InputChangeFormPayload, RemoveCardPayload} from "../../shared/types/formTypes"

export const inputChangeForm = (form: InputChangeFormPayload) => {
    return {
        type: FormActionProps.INPUT_CHANGE,
        payload: form
    }
}

export const addCardForm = () => {
    return {
        type: FormActionProps.ADD_CARD,
    }
}
export const removeCardForm = (form: RemoveCardPayload) => {
    return {
        type: FormActionProps.REMOVE_CARD,
        payload: form
    }
} 

export const initialStateForm = (form: {initialState: FormState}) => {
    return {
        type: FormActionProps.INITIAL_FORM_STATE,
        payload: form
    }
}
