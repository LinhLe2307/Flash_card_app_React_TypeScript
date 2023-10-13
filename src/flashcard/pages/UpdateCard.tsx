import { useParams } from "react-router-dom"
import Button from "../../shared/components/FormElements/Button"
import Input from "../../shared/components/FormElements/Input"
import { useForm } from "../../shared/hooks/form-hook"
import { FormHandlerProps } from "../../shared/types/formTypes"
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators"
import './CardForm.css'
const DUMMY_PLACES = [
    {
      id: 'p1',
      term: 'kissa',
      definition: 'cat',
      imageUrl: 'https://images.unsplash.com/photo-1662715555387-cd3311fab6d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2lzc2F8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
      creator: 'u1'
    }, 
    {
      id: 'p2',
      term: 'koira',
      definition: 'dog',
      imageUrl: 'https://images.unsplash.com/photo-1601727104149-3fd7e50ec590?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a29pcmF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
      creator: 'u2'
    }, 
  ]
const UpdateCard = () => {
    const cardId = useParams().cardId
    
    
    const [formState, inputHandler, setFormData] = useForm({
        term: {
            value: '',
            isValid : false
        },
        definition: {
            value: '',
            isValid : false
        }
    }, false)

    const identifiedCard = DUMMY_PLACES.find(card => card.id === cardId)

    if (!identifiedCard) {
        return <div className="center">
            <h2>Could not find place!</h2>
        </div>
    }

    const updateCardSubmitHandler:FormHandlerProps = (event) => {
        event.preventDefault()
        console.log(formState.inputs)
    }

  return (
    <form className='card-form' onSubmit={updateCardSubmitHandler}>
        <Input 
            id="term" 
            element="input"
            type="text"
            label="Term"
            validators={
                [
                  VALIDATOR_REQUIRE()
                ]
              }
            errorText="Please enter a valid text"
            onInput={inputHandler}
            initialValue={formState.inputs.term.value}
            initialIsValid={formState.inputs.term.isValid}
            />
        <Input 
            id="definition" 
            element="textarea"
            type="text"
            label="Definition"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid definition (min. 5 characters)."
            onInput={inputHandler}
            initialValue={formState.inputs.definition.value}
            initialIsValid={formState.inputs.definition.isValid}
            />
        <Button type="submit" disabled={!formState.isValid}>UPDATE CARD</Button>
    </form>
  )
}

export default UpdateCard