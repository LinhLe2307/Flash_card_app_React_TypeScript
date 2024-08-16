import { FormActionProps, InputChangeFormPayload, RemoveCardPayload, FetchUpdateDataPayload, SetDataPayload} from "../../types/formTypes"

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

export const initialStateForm = () => {
    return {
        type: FormActionProps.INITIAL_FORM_STATE,   
    }
}

// FETCH CARD SAGA
export const fetchUpdateCard = (form: FetchUpdateDataPayload) => {
    return {
        type: FormActionProps.FETCH_UPDATE_CARD,
        payload: form
    }
}
export const setDataFormSucess = (form: SetDataPayload) => {
    return {
        type: FormActionProps.SET_DATA_SUCCESS,
        payload: form
    }
}

export const setDataFormFailure = () => {
    return {
        type: FormActionProps.SET_DATA_FAILURE,
    }
}