import { FetchUpdateDataPayload, FormActionProps, InputChangeFormPayload, RemoveCardPayload, SetDataPayload } from "../../shared/types/formTypes"

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
export const setDataForm = (form: SetDataPayload) => {
    return {
        type: FormActionProps.SET_DATA,
        payload: form
    }
}

export const resetForm = () => {
    return {
        type: FormActionProps.RESET_FORM,
    }
}

export const fetchUpdateCard = (form: FetchUpdateDataPayload) => {
    return {
        type: FormActionProps.FETCH_UPDATE_CARD,
        payload: form
    }
}
