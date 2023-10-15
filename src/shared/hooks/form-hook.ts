import { useCallback, useReducer } from 'react';
import { FormAction, FormActionProps, FormState, InputHandlerProps, SetFormDataProps, UserFormHandler } from '../types/formTypes';

const formReducer = (state: FormState, action: FormAction) => {
    switch(action.type) {
      case FormActionProps.INPUT_CHANGE:
        let formIsValid = true
        for (const inputId in state.inputs) {
          if (!state.inputs[inputId]) {
            continue
          } else {
            if (inputId === action.inputId) {
              console.log("a", action)
                if (["title", "description", "email", "password", "name"].find(card => card === action.inputId) !== undefined) {
                  formIsValid = formIsValid && action.isValid      
                } else {
                  formIsValid = formIsValid && action[inputId].term.isValid && action.definition.isValid
                }
              } else {
                if (["title", "description", "email", "password", "name"].find(card => card === action.inputId) !== undefined) {
                  formIsValid = formIsValid && state.inputs[inputId]!.isValid
                } else {
                  console.log("n", state.inputs[inputId])
                  formIsValid = formIsValid && state.inputs[inputId].term.isValid && state.inputs[inputId].definition.isValid
                }
              }
            
          }
        }
        return {
          ...state,
          inputs: {
            ...state.inputs,
            [action.inputId]: {value: action.value, isValid: action.isValid}
          },
          isValid: formIsValid && formIsValid
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

    const inputHandler: InputHandlerProps = useCallback((value, isValid, id) => {
        dispatch({
          type: FormActionProps.INPUT_CHANGE,
          value: value,
          isValid: isValid,
          inputId: id
        })
    }, [dispatch])

    const setFormData:SetFormDataProps = useCallback((inputData , formValidity) => {
        dispatch({
            type: FormActionProps.SET_DATA,
            inputs: inputData,
            formIsValid: formValidity
        })
    }, [dispatch])

    console.log("dd",[formState,inputHandler])

    return [formState, inputHandler, setFormData];
}
