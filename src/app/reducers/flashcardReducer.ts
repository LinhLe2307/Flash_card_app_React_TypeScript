import { filterName } from "../../shared/constants/global"
import { FormAction, FormActionProps, FormState, ObjectGenericInitial, VALUE_CARD } from "../../shared/types/formTypes"

const initialState: FormState = {
    inputs: {
        title: {
            value: '',
            isValid: false
          },
          description: {
            value: '',
            isValid: false
          } 
    },
    isValid: false
  }

const flashcardReducer = (state = initialState, action: FormAction ) => {
    switch(action.type) {
        case FormActionProps.INPUT_CHANGE: {
            let newProps = {...state}
            let formIsValid = true
            for (const inputId in state.inputs) {
                if (!state.inputs[inputId]) {
                    continue
                } else {
                if (inputId === action.payload.inputId) {
                    if (filterName.find(card => card === action.payload.inputId) !== undefined) {
                    newProps.inputs[action.payload.inputId] = {
                        ...newProps.inputs[action.payload.inputId],
                        value: action.payload.value,
                        isValid: action.payload.isValid
                    }
                    formIsValid = formIsValid && action.payload.isValid
                    } else {
                    if (typeof action.payload.value === "object") {
                        const inputValue = newProps.inputs[action.payload.inputId].value as ObjectGenericInitial;
                        if (inputValue.term.length !== 0 && inputValue.definition.length !== 0) {
                        newProps.inputs[action.payload.inputId] = {
                            ...newProps.inputs[action.payload.inputId],
                            value : {
                            ...inputValue,
                            [action.payload.nameId as keyof typeof VALUE_CARD]: action.payload.value?.[action.payload.nameId as keyof typeof VALUE_CARD]
                            },
                            isValid: action.payload.value[action.payload.nameId as keyof typeof VALUE_CARD].isValid
                        }
                        formIsValid = formIsValid && action.payload.value[action.payload.nameId as keyof typeof VALUE_CARD].isValid
                        } else {
                        formIsValid = formIsValid && action.payload.value[action.payload.nameId as keyof typeof VALUE_CARD].isValid
                        }
                        formIsValid = formIsValid && action.payload.isValid
                    }
                    
                    }
                } else {
                    if (filterName.find(card => card === action.payload.inputId) !== undefined) {
                    formIsValid = formIsValid && action.payload.isValid
                    newProps.inputs[action.payload.inputId] = {
                        value: action.payload.value,
                        isValid: action.payload.isValid
                    }
                    formIsValid = formIsValid && state.inputs[inputId].isValid
                    } else {
                    if (typeof action.payload.value === "object") {
                        const inputValue = newProps.inputs[action.payload.inputId]?.value as ObjectGenericInitial;
                        if (inputValue.term.value !== '' && inputValue.definition.value !== '') {
                        newProps.inputs[action.payload.inputId] = {
                            ...newProps.inputs[action.payload.inputId],
                            value: {
                            ...inputValue,
                            [action.payload.nameId as keyof typeof VALUE_CARD]: action.payload.value?.[action.payload.nameId as keyof typeof VALUE_CARD]
                            },
                            isValid: true
                        } 
                        } else {
                        formIsValid = formIsValid && state.inputs[inputId].isValid
                        }
                        formIsValid = formIsValid && state.inputs[inputId].isValid
                    }
                    }
                }
                }
            }
            newProps.isValid = formIsValid
            return newProps
        }
        case FormActionProps.ADD_CARD:
            const newAddState = {...state.inputs}
            const stateLength = Object.keys(newAddState).length
            newAddState[`m${stateLength}`] = {
                value: {
                term: {
                    value: '',
                    isValid: false
                }, 
                definition: {
                    value: '',
                    isValid: false
                }, 
                imageUrl: {
                    value: '',
                    isValid: false
                }, 
                },
                isValid: false
            }
            return {...state, inputs: newAddState}
        case FormActionProps.REMOVE_CARD:
            let removeFormIsValid = true
            const removeValue = {...state}
            
            for (const inputId in state.inputs) {
                if (!state.inputs[inputId]) {
                continue
                } else {
                if (inputId === action.payload.inputId) {
                    delete removeValue.inputs[action.payload.inputId]
                } else {
                    removeFormIsValid = removeFormIsValid && state.inputs[inputId].isValid
                }
                }
            }

            removeValue.isValid = removeFormIsValid
            return removeValue
        case FormActionProps.SET_DATA:
            return {
                inputs: action.payload.inputs,
                isValid: action.payload.formIsValid
            }
        default:
            return state
    }

}

export default flashcardReducer