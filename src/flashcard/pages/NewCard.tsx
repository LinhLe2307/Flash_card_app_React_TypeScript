import Input from '../../shared/FormElements/Input'
import {VALIDATOR_REQUIRE} from '../../shared/util/validators'
import './NewCard.css'

const NewCard = () => {
  return (
    <form className='card-form'>
      <Input 
        type="text" 
        label="Title" 
        element="input"
        validators={
          [
            VALIDATOR_REQUIRE()
          ]
        }
        errorText="Please enter a valid title"
      />
    </form>
  )
}

export default NewCard