
import Button from '../../shared/components/FormElements/Button'
import Input from '../../shared/components/FormElements/Input'
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators'

import { useForm } from '../../shared/hooks/form-hook'
import './CardForm.css'
import { FormHandlerProps } from '../../shared/types/formTypes'

const NewCard = () => {
  const [formState, inputHandler] = useForm({
    term: {
      value: '',
      isValid: false
    },
    definition: {
      value: '',
      isValid: false
    }
  }, false)
  console.log(formState)

  const cardSubmitHandler:FormHandlerProps = event => {
    event.preventDefault()
    console.log(formState.inputs) // send this to backend
  }

  return (
    <form className='card-form' onSubmit={cardSubmitHandler}>
      <Input 
        id="term"
        type="text" 
        label="Term" 
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
        id="definition"
        type="text" 
        label="Definition" 
        element="textarea"
        validators={
          [
            VALIDATOR_MINLENGTH(5)
          ]
        }
        errorText="Please enter a valid definition (at least 5 characters)."
        onInput = {inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>ADD CARD</Button>
    </form>
  )
}

export default NewCard