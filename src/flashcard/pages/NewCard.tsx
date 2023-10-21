
import Button from '../../shared/components/FormElements/Button'
import Input from '../../shared/components/FormElements/Input'
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators'

import { useEffect } from 'react'
import { useForm } from '../../shared/hooks/form-hook'
import { FormInputsProps } from '../../shared/types/formTypes'
import { GenericProps } from '../../shared/types/sharedTypes'
import './CardForm.css'
import TermFlashcard from './TermFlashcard'

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

  const cardSubmitHandler:GenericProps<React.FormEvent<HTMLFormElement>> = event => {
    event.preventDefault()
  }

  useEffect(() => {
    console.log(formState)
  }, [formState])

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