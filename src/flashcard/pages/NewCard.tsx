import React, { useContext, useEffect } from 'react'

import Button from '../../shared/components/FormElements/Button'
import Input from '../../shared/components/FormElements/Input'
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators'
import { useForm } from '../../shared/hooks/form-hook'
import { FormInputsProps, FormValueObjectProps } from '../../shared/types/formTypes'
import { GenericProps } from '../../shared/types/sharedTypes'
import TermFlashcard from './TermFlashcard'
import { DEFAULT_CARDS } from '../../shared/constants/global'
import cardApi from '../../shared/api/cardApi'
import { AuthContext } from '../../shared/context/auth-context'

import './CardForm.css'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'

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

interface BodyProps {
  [key: string]: FormValueObjectProps<string> | string 
}

const NewCard = () => {
  const auth = useContext(AuthContext)
  const [formState, removeSubCardHandler, inputHandler, addMoreCardHandler] = useForm(initialValue, false)

  const cardSubmitHandler:GenericProps<React.FormEvent<HTMLFormElement>> = async(event) => {
    event.preventDefault()
    try {
      const body: BodyProps = {
        creator: auth.userId
      }

      Object.entries(formState.inputs).forEach(([key, value]) => {
        const keyValue = value && value.value
        if(["title", "description"].indexOf(key) === -1) {
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

      await cardApi.post(JSON.stringify(body))
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    console.log(formState)
  }, [formState])

  return (
    <React.Fragment>
      {/* <ErrorModal error={error} onClear={clearError} /> */}
      <form className='card-form' onSubmit={cardSubmitHandler}>
        {/* { isLoading && <LoadingSpinner asOverlay/> } */}
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
            ["one"].map(card => <TermFlashcard 
              cardId={String(card)}
              removeSubCardHandler={removeSubCardHandler}
              inputHandler={inputHandler}
              key={card}
            />)
          }
          <Button type="button" onClick={addMoreCardHandler}>ADD MORE CARD</Button>
        </div>
        <Button type="submit" disabled={!formState.isValid}>SUBMIT</Button>
      </form>
    </React.Fragment>
  )
}

export default NewCard