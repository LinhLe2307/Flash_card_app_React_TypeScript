
import Button from '../../shared/components/FormElements/Button'
import Input from '../../shared/components/FormElements/Input'
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators'

import { useForm } from '../../shared/hooks/form-hook'
import './CardForm.css'
import { EventHandler, FormAction, FormActionProps, FormHandlerProps, FormInputsProps, FormState } from '../../shared/types/formTypes'
import TermFlashcard from './TermFlashcard'
import { DEFAULT_CARDS } from '../../shared/constants/global'
import { useEffect, useReducer, useState } from 'react'

type FlashCardInput = {
  [key: string]: {
    value: {
      term: {
        value: string,
        isValid: boolean
      },
      definition: {
        value: string,
        isValid: boolean
      };
    }
  } | {
    value: string,
    isValid: boolean
  }
}

let initialValue: FormInputsProps = {
  title: {
    value: '',
    isValid: false
  },
  description: {
    value: '',
    isValid: false
  }, 
}

// DEFAULT_CARDS.map(card => initialValue[`${card}`] = {
//     value: {
//       term: {
//         value: '',
//         isValid: false
//       },
//        definition: {
//         value: '',
//         isValid: false
//       }
//     }, isValid: false
//   })

const formReducer = (state: FormState, action: FormAction) => {
  switch(action.type) {
    case FormActionProps.INPUT_CHANGE:
      let newProps = {...state}
      console.log("action", action)
      console.log("state", state)
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
              newProps.inputs[action.inputId].value[action.nameId] = action.value[action.nameId]
            }
          } else {
            if (["title", "description", "email", "password", "name"].find(card => card === action.inputId) !== undefined) {
              formIsValid = formIsValid && action.isValid
              newProps.inputs[action.inputId] = {
                value: action.value,
                isValid: action.isValid
              }
            } else {
              newProps.inputs[action.inputId] = {
                ...newProps.inputs[action.inputId],
                value: {
                  [action.nameId]: action.value[action.nameId]
                },
                isValid: true
              }
            }
          }
        }
      }
       console.log("newprops", newProps)
       return {
        ...newProps
      }
      
  }
}

const NewCard = () => {
  const [flashCardInput, setFlashCardInput] = useState<FlashCardInput>({
    title: {
      value: '',
      isValid: false
    },
    description: {
      value: '',
      isValid: false
    }
  })
  // const [formState, inputHandler] = useForm(flashCardInput, false)
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialValue,
    isValid: false
  })

  const cardSubmitHandler:FormHandlerProps = event => {
    event.preventDefault()
    console.log(formState.inputs) // send this to backend
  }

  const flashCardInputHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
      const {id, name, value} = event.target
    if (["title", "description"].find( name => name===id) !== undefined) {
        // setFlashCardInput({
        //   ...flashCardInput,
        //   [`${id}`]: {
        //     ...flashCardInput[id],
        //       value: value,
        //       isValid: true
        //   }
        // })

        dispatch({
          type: 'INPUT_CHANGE',
          value: value,
          isValid: true,
          inputId: String(id),
          nameId: name
        })
      } else {
        dispatch({
          type: 'INPUT_CHANGE',
          value: {
            [name]: {
              value: value,
              isValid: true
            }
          },
          isValid: true,
          inputId: String(id),
          nameId: name
        })
      //   setFlashCardInput({
      //     ...flashCardInput,
      //     [`${id}-card`]: {
      //       ...flashCardInput[`${id}-card`],
      //       [name]: {
      //         value: value,
      //         isValid: true
      //       }
      //     }
      //   })
      }
  }

  const removeSubCardHandler = (cardId: string) => {
    console.log(cardId)

  }

  const addMoreCardHandler = () => {
    // initialValue[`${DEFAULT_CARDS.length}-card`] = {
    //   value: '',
    //   isValid: false
    // }
  }

  useEffect(() => {
    console.log("flashCardInput", flashCardInput)
  }, [flashCardInput])
  useEffect(() => {
    console.log("formState", formState)
  }, [formState])
  

  return (
    <form onSubmit={cardSubmitHandler}>
      <input 
            id="title"
            onChange={flashCardInputHandler}
            name="title"
            /> 

        <input 
            id="description"
            onChange={flashCardInputHandler}
            name="description"
            /> 
      {/* <Input 
        id="title"
        type="text" 
        label="Title" 
        element="input"
        validators={
          [
            VALIDATOR_REQUIRE()
          ]
        }
        errorText="Please enter a valid term"
        onInput = {inputHandler}
      />
      <Input 
        id="description"
        type="text" 
        label="Description" 
        element="textarea"
        validators={
          [
            VALIDATOR_MINLENGTH(5)
          ]
        }
        errorText="Please enter a valid description (at least 5 characters)."
        onInput = {inputHandler}
      /> */}

      <div className='card-form' >
        {
          DEFAULT_CARDS.map(card => <TermFlashcard 
            cardId={String(card)}
            removeSubCardHandler={removeSubCardHandler}
            flashCardInputHandler={flashCardInputHandler}
            // inputHandler={inputHandler}
            key={card}
          />)
        }
        <Button onClick={addMoreCardHandler}>ADD MORE CARD</Button>
      </div>
      <Button type="submit">ADD CARD</Button>
      {/* <Button type="submit" disabled={!formState.isValid}>ADD CARD</Button> */}
    </form>
  )
}

export default NewCard