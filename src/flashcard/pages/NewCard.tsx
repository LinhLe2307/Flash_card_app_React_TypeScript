
import Button from '../../shared/components/FormElements/Button'
import Input from '../../shared/components/FormElements/Input'
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators'

import { DEFAULT_CARDS } from '../../shared/constants/global'
import { useForm } from '../../shared/hooks/form-hook'
import { EventHandler, FormHandlerProps, FormInputsProps } from '../../shared/types/formTypes'
import './CardForm.css'
import TermFlashcard from './TermFlashcard'
import { useEffect, useReducer } from 'react'
import { useImage } from '../../shared/hooks/image-hook'

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



const NewCard = () => {
  const [formState, removeSubCardHandler, inputHandler, addMoreCardHandler] = useForm(initialValue, false)

  const cardSubmitHandler:FormHandlerProps = event => {
    event.preventDefault()
  }

  return (
    <form className='card-form' onSubmit={cardSubmitHandler}>
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
          ["one", "two"].map(card => <TermFlashcard 
            cardId={String(card)}
            removeSubCardHandler={removeSubCardHandler}
            inputHandler={inputHandler}
            key={card}
          />)
        }
        <Button onClick={addMoreCardHandler}>ADD MORE CARD</Button>
      </div>
      <Button type="submit" disabled={!formState.isValid}>SUBMIT</Button>
    </form>
  )
}

export default NewCard