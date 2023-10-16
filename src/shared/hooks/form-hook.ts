import { useCallback, useReducer } from 'react';
import { FormAction, FormActionProps, FormState, InputHandlerProps, SetFormDataProps, UserFormHandler } from '../types/formTypes';

const formReducer = (state: FormState, action: FormAction) => {
  switch(action.type) {
    case FormActionProps.INPUT_CHANGE:
      let newProps = {...state}
      let formIsValid = true
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) {
          continue
        } else {
          if (inputId === action.inputId) {
            if (["title", "description", "email", "password", "name"].find(card => card === action.inputId) !== undefined) {
              newProps.inputs[action.inputId] = {
                ...newProps.inputs[action.inputId],
                value: action.value,
                isValid: action.isValid
              }
            } else {
              // newProps.inputs[action.inputId].value[action.nameId] = action.value[action.nameId]
              newProps.inputs[action.inputId] = {
                ...newProps.inputs[action.inputId],
                value: {
                  ...(newProps.inputs[action.inputId].value as object),
                  [action.nameId]: action.value[action.nameId]
                },
                isValid: true
              }
            }
          } else {
            if (["title", "description", "email", "password", "name"].find(card => card === action.inputId) !== undefined) {
              formIsValid = formIsValid && action.isValid
              newProps.inputs[action.inputId] = {
                value: action.value,
                isValid: action.isValid
              }
            } else {
              console.log("action.value", action.value)
              newProps.inputs[action.inputId] = {
                ...newProps.inputs[action.inputId],
                value: {
                  ...(newProps.inputs[action.inputId]?.value as object),
                  [action.nameId]: action.value[action.nameId]
                },
                isValid: true
              }
            }
          }
        }
      }
        
      console.log(newProps)
       return {
        ...newProps
      }
    case FormActionProps.SET_DATA:
      return {
          inputs: action.inputs,
          isValid: action.formIsValid
        }
    default: 
        return state
  }
}

// const formReducer = (state: FormState, action: FormAction) => {
//     switch(action.type) {
//       case FormActionProps.INPUT_CHANGE:
//         let formIsValid = true
//         for (const inputId in state.inputs) {
//           if (!state.inputs[inputId]) {
//             continue
//           } else {
//               if (inputId === action.inputId) {
//                 formIsValid = formIsValid && action.isValid
//               } else {
//                 formIsValid = formIsValid && state.inputs[inputId]!.isValid
//               }
            
//           }
//         }
//         return {
//           ...state,
//           inputs: {
//             ...state.inputs,
//             [action.inputId]: {value: action.value, isValid: action.isValid}
//           },
//           isValid: formIsValid && formIsValid
//         }

//         case FormActionProps.SET_DATA:
//             return {
//                 inputs: action.inputs,
//                 isValid: action.formIsValid
//             }
//       default: 
//         return state
//     }
//   }



export const useForm:UserFormHandler = function(initialInputs, initialFormValidity) {
// export function useForm (initialInputs: InitialInputsProps, initialFormValidity: boolean):(FormState & InputHandlerProps)[] {
  // console.log("initialInputs", initialInputs)  
  const [formState, dispatch] = useReducer(formReducer, {
        inputs: initialInputs,
        isValid: initialFormValidity
      })

    const inputHandler: InputHandlerProps = useCallback((value, isValid, id, nameId) => {
        if (["title", "description"].find( name => name===id) !== undefined) {
          dispatch({
            type: 'INPUT_CHANGE',
            value: value,
            isValid: isValid,
            inputId: String(id),
            nameId: nameId
          })
        } else {
          dispatch({
            type: 'INPUT_CHANGE',
            value: {
              [nameId]: {
                value: value,
                isValid: isValid
              }
            },
            isValid: isValid,
            inputId: String(id),
            nameId: nameId
          })
        }
    }, [dispatch])

    const setFormData:SetFormDataProps = useCallback((inputData , formValidity) => {
        dispatch({
            type: FormActionProps.SET_DATA,
            inputs: inputData,
            formIsValid: formValidity
        })
    }, [dispatch])

    return [formState, inputHandler, setFormData];
}
