import { FormActionProps, InputChangeFormPayload, RemoveCardPayload, SetDataPayload } from "../../shared/types/formTypes"

export const inputChangeFlashcard = (flashcard: InputChangeFormPayload) => {
    return {
        type: FormActionProps.INPUT_CHANGE,
        payload: flashcard
    }
}

export const addCardFlashcard = () => {
    return {
        type: FormActionProps.ADD_CARD,
    }
}
export const removeCardFlashcard = (flashcard: RemoveCardPayload) => {
    return {
        type: FormActionProps.REMOVE_CARD,
        payload: flashcard
    }
}
export const setDataFlashcard = (flashcard: SetDataPayload) => {
    return {
        type: FormActionProps.SET_DATA,
        payload: flashcard
    }
}

export const resetForm = () => {
    return {
        type: FormActionProps.RESET_FORM,
    }
}
