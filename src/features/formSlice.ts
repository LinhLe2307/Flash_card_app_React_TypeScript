import { createSlice } from "@reduxjs/toolkit";
import { FormState, ObjectGenericInitial, VALUE_CARD } from "../shared/types/formTypes";
import { filterName } from "../shared/constants/global";


  // Define the initial state using that type
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
  
const formSlice = createSlice({
    name: 'flashcard',
    initialState: initialState, 
    reducers: {
        inputChange: (state, action) => {
            let formIsValid = true
            for (const inputId in state.inputs) {
                if (!state.inputs[inputId]) {
                continue
                } else {
                if (inputId === action.payload.inputId) {
                    if (filterName.find(card => card === action.payload.inputId) !== undefined) {
                    state.inputs[action.payload.inputId] = {
                        ...state.inputs[action.payload.inputId],
                        value: action.payload.value,
                        isValid: action.payload.isValid
                    }
                    formIsValid = formIsValid && action.payload.isValid
                    } else {
                    if (typeof action.payload.value === "object") {
                        const inputValue = state.inputs[action.payload.inputId].value as ObjectGenericInitial;
                        if (inputValue.term && inputValue.definition) {
                        state.inputs[action.payload.inputId] = {
                            ...state.inputs[action.payload.inputId],
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
                    state.inputs[action.payload.inputId] = {
                        value: action.payload.value,
                        isValid: action.payload.isValid
                    }
                    formIsValid = formIsValid && state.inputs[inputId].isValid
                    } else {
                    if (typeof action.payload.value === "object") {
                        const inputValue = state.inputs[action.payload.inputId]?.value as ObjectGenericInitial;
                        if (inputValue.term.value !== '' && inputValue.definition.value !== '') {
                        state.inputs[action.payload.inputId] = {
                            ...state.inputs[action.payload.inputId],
                            value: {
                            ...inputValue,
                            [action.payload.nameId as keyof typeof VALUE_CARD]: action.payload.value?.[action.payload.nameId as keyof typeof VALUE_CARD]
                            },
                            isValid: true
                        } 
                        // console.log("value", state.inputs[inputId].value[action.nameId] && state.inputs[inputId].value[action.nameId].isValid)
                        // subForm = subForm && state.inputs[inputId].value[action.nameId] && state.inputs[inputId].value[action.nameId].isValid
                        } else {
                        formIsValid = formIsValid && state.inputs[inputId].isValid
                        }
                        formIsValid = formIsValid && state.inputs[inputId].isValid
                    }
                    }
                }
                }
            }
            state.isValid = formIsValid
        },
        addCard: (state) => {
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
        },
        removeCard: (state, action) => {
            let removeFormIsValid = true
            
            for (const inputId in state.inputs) {
                if (!state.inputs[inputId]) {
                continue
                } else {
                if (inputId === action.payload.inputId) {
                    delete state.inputs[action.payload.inputId]
                } else {
                    removeFormIsValid = removeFormIsValid && state.inputs[inputId].isValid
                }
                }
            }

            state.isValid = removeFormIsValid
        },
        setData: (state, action) => {
            state = {
                inputs: action.payload.inputs,
                isValid: action.payload.formIsValid
            }
        },
        resetForm: (state) => {
            state = initialState
        }
    }
})

export const { inputChange, addCard, removeCard, setData, resetForm } = formSlice.actions
export default formSlice.reducer;