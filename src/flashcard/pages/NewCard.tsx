import React, { useContext } from 'react'

import Button from '../../shared/components/FormElements/Button'
import Input from '../../shared/components/FormElements/Input'
import { filterName } from '../../shared/constants/global'
import { AuthContext } from '../../shared/context/auth-context'
import { useForm } from '../../shared/hooks/form-hook'
import { FormInputsProps } from '../../shared/types/formTypes'
import { GenericProps, ObjectGenericProps } from '../../shared/types/sharedTypes'
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators'
import TermFlashcard from './TermFlashcard'

import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { useHttpClient } from '../../shared/hooks/http-hook'
import './CardForm.css'

interface BodyProps {
  [key: string]: ObjectGenericProps<string> | string | null
}

let initialValue: FormInputsProps = {
  title: {
    value: '',
    isValid: false
  },
  description: {
    value: '',
    isValid: false
  } 
}

// DEFAULT_CARDS.forEach(card => {
//   return (
//     initialValue[card] = 
//       {
//         value: {
//           [VALUE_CARD.term]: {
//             value: '',
//             isValid: false
//           },
//           [VALUE_CARD.definition]: {
//             value: '',
//             isValid: false
//           },
//           [VALUE_CARD.imageUrl]: {
//             value: '',
//             isValid: false
//           }
//         },
//         isValid: false
//       }
//   )
// })

const NewCard = () => {
  const auth = useContext(AuthContext)
  const [formState, removeSubCardHandler, inputHandler, addMoreCardHandler] = useForm(initialValue, false)
  const { isLoading, error, sendRequest, clearError } = useHttpClient()

  const cardSubmitHandler:GenericProps<React.FormEvent<HTMLFormElement>> = async(event) => {
    event.preventDefault()
    try {
      const body: BodyProps = {}
      // const formData = new FormData()

      // function objectToFormData(obj, parentKey = '') {
      //   for (let key in obj) {
      //     if (obj.hasOwnProperty(key)) {
      //       let keyName = parentKey ? `${parentKey}[${key}]` : key;
      
      //       if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      //         objectToFormData(obj[key], keyName);
      //       } else {
      //         formData.append(keyName, obj[key].value);
      //       }
      //     }
      //   }
      // }

      // objectToFormData(formState.inputs)

      // for (let dataKey in formState.inputs) {
      //   if (filterName.indexOf(dataKey) === -1) {
      //     const newValue = {}
      //     for (let objectKey in formState.inputs[dataKey].value){
      //       if (objectKey === "imageUrl") {
      //         formData.append(dataKey["imageUrl"], formState.inputs[dataKey].value[objectKey].value)
      //       } else {
      //         newValue[objectKey] = formState.inputs[dataKey].value[objectKey].value
      //       }
      //     }
      //     formData.append(dataKey, JSON.stringify(newValue))
      //   }else {
      //     formData.append(dataKey, formState.inputs[dataKey].value)
      //   }
      // }
      
      // for (let [key, value] of formData.entries()) {
      //   console.log(key, value)
      // }
      Object.entries(formState.inputs).forEach(([key, value]) => {
        const keyValue = value && value.value
        if(filterName.indexOf(key) === -1) {
          if (typeof keyValue !== "string") {
            return (
              body[key] = {
                term: keyValue &&  keyValue.term.value,
                definition: keyValue.definition.value,
                imageUrl: keyValue.imageUrl ? keyValue.imageUrl.value : '',
              }
            )
          }
          } else {
            if (typeof keyValue === "string") {
                return (
                  body[key] = keyValue
                )
              }
        }
      })
      
      await sendRequest('/api/cards', 'POST', JSON.stringify(body), {
        Authorization: 'Bearer ' + auth.token,
        'Content-Type': 'application/json'
      })
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className='card-form' onSubmit={cardSubmitHandler}>
        { isLoading && <LoadingSpinner asOverlay/> }
        <Input 
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
          nameId="title"
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
          nameId="description"
        />

        <div>
          {
            Object.keys(formState.inputs).map(card => filterName.indexOf(card) === -1 &&  <TermFlashcard 
              cardId={String(card)}
              removeSubCardHandler={removeSubCardHandler}
              inputHandler={inputHandler}
              key={card}
            />)
          }
          <Button type="button" onClick={addMoreCardHandler}>ADD MORE CARD</Button>
        </div>
        <Button type="submit" disabled={!formState.isValid}
        >SUBMIT</Button>
      </form>
    </React.Fragment>
  )
}

export default NewCard