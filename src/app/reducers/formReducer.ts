import { v4 as uuidv4 } from 'uuid';
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
        },
        "129148-125-115516-25152118-38914-2116": {
            value: {
                term: {
                    value: '',
                    isValid: false
                },
                definition: {
                    value: '',
                    isValid: false
                }
            },
            isValid: false
        }
    },
    isValid: false
  }

const formReducer = (state = initialState, action: FormAction ) => {
    switch(action.type) {
        case FormActionProps.INITIAL_FORM_STATE: {
            return action.payload.initialState
        }
        case FormActionProps.INPUT_CHANGE: {
            let newProps = {...state}
            let formIsValid = true
            let subCardIsValid = true
            for (const inputId in state.inputs) {
                if (!state.inputs[inputId]) {
                    continue
                } else {
                    const typeNameId = action.payload.nameId as keyof typeof VALUE_CARD
                    
                    if (inputId === action.payload.inputId) {
                        if (filterName.find(card => card === action.payload.inputId) !== undefined) {
                            newProps.inputs[action.payload.inputId] = {
                                ...newProps.inputs[action.payload.inputId],
                                value: action.payload.value,
                                isValid: action.payload.isValid
                            }
                            formIsValid = formIsValid && action.payload.isValid && subCardIsValid
                        
                        } else {
                            if (typeof action.payload.value === "object") {
                                const inputValue = newProps.inputs[action.payload.inputId].value as ObjectGenericInitial;
                                if (inputValue.term && inputValue.definition) {
                                    newProps.inputs[action.payload.inputId] = {
                                        ...newProps.inputs[action.payload.inputId],
                                        value : {
                                            ...inputValue,
                                            [typeNameId]: action.payload.value?.[typeNameId]
                                        },
                                        isValid: action.payload.value[typeNameId].isValid
                                    }
                                    // formIsValid = formIsValid && action.payload.value[action.payload.nameId as keyof typeof VALUE_CARD].isValid
                                    // formIsValid = formIsValid && subCardIsValid 
                                
                                }
                                // else {
                                //     // subCardIsValid = formIsValid 
                                //         // formIsValid = formIsValid && action.payload.value[action.payload.nameId as keyof typeof VALUE_CARD].isValid
                                //     }
                                // formIsValid = formIsValid && subCardIsValid
                                // formIsValid = formIsValid && action.payload.value[action.payload.nameId as keyof typeof VALUE_CARD].isValid
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

                            if (inputValue?.term?.value !== '' && inputValue?.definition?.value !== '') {
                                newProps.inputs[action.payload.inputId] = {
                                    ...newProps.inputs[action.payload.inputId],
                                    value: {
                                        ...inputValue,
                                        [action.payload.nameId as keyof typeof VALUE_CARD]: action.payload.value?.[action.payload.nameId as keyof typeof VALUE_CARD]
                                    },
                                    isValid: subCardIsValid && action.payload.value?.[action.payload.nameId as keyof typeof VALUE_CARD].isValid
                                } 
                                // subCardIsValid = subCardIsValid && action.payload.value?.[action.payload.nameId as keyof typeof VALUE_CARD].isValid
                                // formIsValid = formIsValid && state.inputs[inputId].isValid

                            } else {
                                // formIsValid = formIsValid && state.inputs[inputId].isValid
                                // subCardIsValid = subCardIsValid && state.inputs[inputId].isValid
                            }
                            // formIsValid = formIsValid && state.inputs[inputId].isValid
                            //formIsValid = formIsValid && subCardIsValid
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
            newAddState[uuidv4()] = {
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
                        if (+Object.keys(removeValue.inputs).length === 2 ) {
                            removeFormIsValid = removeFormIsValid && false
                        } else {
                            removeFormIsValid = removeFormIsValid
                        }
                    } else {
                       if (+Object.keys(removeValue.inputs).length === 2 ) {
                            removeFormIsValid = removeFormIsValid && false
                        } else {
                            removeFormIsValid = removeFormIsValid 
                        }
                    }
                }
            }

            removeValue.isValid = removeFormIsValid
            return removeValue
        case FormActionProps.SET_DATA_SUCCESS:
            return {
                inputs: action.payload.inputs,
                isValid: action.payload.formIsValid
            }
        default:
            return state
    }

}

export default formReducer