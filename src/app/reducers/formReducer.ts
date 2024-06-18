import { v4 as uuidv4 } from 'uuid';
import { filterName } from "../../shared/constants/global"
import _ from 'lodash';
import { FormAction, FormActionProps, FormState, ObjectGenericInitial, VALUE_CARD } from "../../shared/types/formTypes"

// Function to create a deep copy of an object
export const deepCopy = (obj: any): any => {
    return JSON.parse(JSON.stringify(obj));
};

export const initialState: FormState = {
    inputs: {
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        },
        tags: {
            value: [''],
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
                },
                imageUrl: {
                    value: '',
                    isValid: false
                }
            },
            isValid: false
        }
    },
    isValid: false,
    isNotFetching: false
  }

const formReducer = (state = {...deepCopy(initialState)}, action: FormAction ) => {
    switch(action.type) {
        case FormActionProps.INITIAL_FORM_STATE: {
            return _.cloneDeep(initialState)
        }
        case FormActionProps.INPUT_CHANGE: {
            let newProps = _.cloneDeep(state)
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
                            if (typeof action.payload.value === "object" && !Array.isArray(action.payload.value)) {
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
                                
                                }
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
                        if (typeof action.payload.value === "object" && !Array.isArray(action.payload.value)) {
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
            const newAddState = _.cloneDeep(state.inputs)
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
            const removeValue = _.cloneDeep(state)
            
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
                isValid: action.payload.formIsValid,
                isNotFetching: true
            }         
        default:
            return state
    }

}

export default formReducer