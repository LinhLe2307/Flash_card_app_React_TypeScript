import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Button from "../../shared/components/FormElements/Button"
import Input from "../../shared/components/FormElements/Input"
import CardAvatar from "../../shared/components/UIElements/CardAvatar"
import { useForm } from "../../shared/hooks/form-hook"
import { GenericProps } from "../../shared/types/sharedTypes"
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators"
import './CardForm.css'
import TermFlashcard from "./TermFlashcard"
const DUMMY_PLACES = [
    {
        id: 'p1',
        title: "hello",
        description: 'this is finnish',
        one: {
            term: "newkiss", 
            definition: "newkiss",
            imageUrl: 'https://images.unsplash.com/photo-1662715555387-cd3311fab6d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2lzc2F8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
        },
        two: {
            term: "newkiss2",
            definition: "newkiss2",
            imageUrl: 'https://images.unsplash.com/photo-1662715555387-cd3311fab6d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2lzc2F8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
        },
        creator: 'u1'
    },
 
  ]
const UpdateCard = () => {
    const [isLoading, setIsLoading] = useState(true)    
    const cardId = useParams().cardId
    
    const [formState, removeSubCardHandler, inputHandler, addMoreCardHandler, setFormData] = useForm({
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

    
    const updateCardSubmitHandler:GenericProps<React.FormEvent<HTMLFormElement>> = (event) => {
        event.preventDefault()
        console.log(formState.inputs)
    }
    
    useEffect(() => {
        if (identifiedCard) {
            setFormData({
                title: {
                    value: identifiedCard.title,
                    isValid : true
                },
                description: {
                    value: identifiedCard.description,
                    isValid : true
                },
                one: {
                    value: {
                        term: {
                            value: identifiedCard.one.term,
                            isValid: true
                        }, definition:  {
                            value: identifiedCard.one.definition,
                            isValid: true
                        }, imageUrl:  {
                            value: identifiedCard.one.imageUrl,
                            isValid: true
                        }
                    },
                    isValid: true
                },
                two: {
                    value: {
                        term: {
                            value: identifiedCard.two.term,
                            isValid: true
                        }, definition:  {
                            value: identifiedCard.two.term,
                            isValid: true
                        }, imageUrl:  {
                            value: identifiedCard.two.imageUrl,
                            isValid: true
                        }
                    },
                    isValid: true
                },
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
            nameId="title"
            id="title" 
            element="input"
            type="text"
            label="Title"
            validators={
                [
                  VALIDATOR_REQUIRE()
                ]
              }
            errorText="Please enter a valid text"
            onInput={inputHandler}
            initialValue={String(formState.inputs.title.value)}
            initialIsValid={formState.inputs.title.isValid}
            />
        <Input 
            nameId="description"
            id="description" 
            element="textarea"
            type="text"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid definition (min. 5 characters)."
            onInput={inputHandler}
            initialValue={String(formState.inputs.description.value)}
            initialIsValid={formState.inputs.description.isValid}
            />
        <div className='card-form' >
        {
          ["one", "two"].map(card => <TermFlashcard 
            cardId={String(card)}
            removeSubCardHandler={removeSubCardHandler}
            formState={formState}
            inputHandler={inputHandler}
            key={card}
          />)
        }
        <Button type="button" onClick={addMoreCardHandler}>ADD MORE CARD</Button>
      </div>
        <Button type="submit" disabled={!formState.isValid}>UPDATE CARD</Button>
    </form>
  )
}

export default UpdateCard