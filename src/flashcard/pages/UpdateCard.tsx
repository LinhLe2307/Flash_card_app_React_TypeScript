import { useParams } from "react-router-dom"
import Button from "../../shared/components/FormElements/Button"
import Input from "../../shared/components/FormElements/Input"
import { useForm } from "../../shared/hooks/form-hook"
import { FormHandlerProps } from "../../shared/types/formTypes"
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators"
import './CardForm.css'
import { useEffect, useState } from "react"
import CardAvatar from "../../shared/components/UIElements/CardAvatar"
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
    const [isLoading, setIsLoading] = useState(true)    
    const cardId = useParams().cardId
    
    const [formState, inputHandler, setFormData] = useForm({
        title: {
            value: '',
            isValid : false
        },
        description: {
            value: '',
            isValid : false
        }
        
    }, false)

    const identifiedCard = DUMMY_PLACES.find(card => card.id === cardId)

    
    
    const updateCardSubmitHandler:FormHandlerProps = (event) => {
        event.preventDefault()
        console.log(formState.inputs)
    }
    
    useEffect(() => {
        if (identifiedCard) {
            setFormData({
                title: {
                    value: identifiedCard.term,
                    isValid : true
                },
                description: {
                    value: identifiedCard.definition,
                    isValid : true
                }
            }, true)
            setIsLoading(false)
        }
    }, [setFormData, identifiedCard])
    
    if (!identifiedCard) {
        return <div className="center">
            <CardAvatar>
                <h2>Could not find place!</h2>
            </CardAvatar>
        </div>
    }
    if (isLoading) {
        return <div className="center">
            <h1>Loading...</h1>
        </div>
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
            initialValue={formState.inputs.title.value}
            initialIsValid={formState.inputs.title.isValid}
            />
        <Input 
            id="definition" 
            element="textarea"
            type="text"
            label="Definition"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid definition (min. 5 characters)."
            onInput={inputHandler}
            initialValue={formState.inputs.description.value}
            initialIsValid={formState.inputs.description.isValid}
            />
        <Button type="submit" disabled={!formState.isValid}>UPDATE CARD</Button>
    </form>
  )
}

export default UpdateCard