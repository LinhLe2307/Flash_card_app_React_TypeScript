
import Button from '../../shared/components/FormElements/Button'
import Input from '../../shared/components/FormElements/Input'
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators'

import { DEFAULT_CARDS } from '../../shared/constants/global'
import { useForm } from '../../shared/hooks/form-hook'
import { FormHandlerProps, FormInputsProps } from '../../shared/types/formTypes'
import TermFlashcard from './TermFlashcard'
import './CardForm.css'

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

const NewCard = () => {
  const [formState, inputHandler] = useForm({initialValue}, false)
  const cardSubmitHandler:FormHandlerProps = event => {
    event.preventDefault()
    console.log(formState.inputs) // send this to backend
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

  return (
    <form onSubmit={cardSubmitHandler}>
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

      <div className='card-form' >
        {
          DEFAULT_CARDS.map(card => <TermFlashcard 
            cardId={String(card)}
            removeSubCardHandler={removeSubCardHandler}
            inputHandler={inputHandler}
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