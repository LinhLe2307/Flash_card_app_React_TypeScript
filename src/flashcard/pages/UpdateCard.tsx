import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import cardApi from "../../shared/api/cardApi"
import Button from "../../shared/components/FormElements/Button"
import Input from "../../shared/components/FormElements/Input"
import ErrorModal from "../../shared/components/UIElements/ErrorModal"
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner"
import { filterName } from "../../shared/constants/global"
import { useForm } from "../../shared/hooks/form-hook"
import { FormInputsProps, SetFormDataProps, ValueAndValidProps } from "../../shared/types/formTypes"
import { GenericProps, ObjectGenericProps } from "../../shared/types/sharedTypes"
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators"
import './CardForm.css'
import TermFlashcard from "./TermFlashcard"

const getDetailCard = async(cardId: string, setFormData: SetFormDataProps, setIsLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    setIsLoading(true)
    try {
        const response = await cardApi.getDetailCard(cardId)
        const newData: FormInputsProps = {}
            Object.entries(response.card).map(([key, value]) => {
                if (["title", "description"].indexOf(key) !== -1) {
                    if (typeof value === "string") {
                        newData[key] = {
                            value: value,
                            isValid : true
                        }
                    }
                } else if (filterName.indexOf(key) === -1) {
                    if (typeof value === 'object' && value !== null) {
                        const typedValue = value as ObjectGenericProps<string>
                        newData[key] = {
                            value: {
                                term: {
                                    value: typedValue.term,
                                    isValid: true
                                }, definition:  {
                                    value: typedValue.definition,
                                    isValid: true
                                }, imageUrl:  {
                                    value: typedValue.imageUrl ? typedValue.imageUrl : '',
                                    isValid: true
                                }
                            },
                            isValid: true
                        }
                    }
                }
            })
        setFormData(newData, true)
        setIsLoading(false)
        return response.card
    } catch(err) {
        console.log(err)
    }
}

const UpdateCard = () => {
    const [isLoading, setIsLoading] = useState(true)    
    const navigate = useNavigate()
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

    const {data, error} = useQuery({
        queryKey: ["update-card"],
        queryFn: () => cardId && getDetailCard(cardId, setFormData, setIsLoading),
        refetchOnWindowFocus: false
    }
    )
    
    const updateCardSubmitHandler:GenericProps<React.FormEvent<HTMLFormElement>> = async(event) => {
        event.preventDefault()
        try {
            
            const body: ObjectGenericProps<string | ObjectGenericProps<ValueAndValidProps<string>>> = {
                title: formState.inputs.title.value,
                description: formState.inputs.description.value,
            }

            Object.entries(formState.inputs).map(([key, value]) => {
                if (!(key in body)){
                    if ( typeof value !== "string") {
                        const valueState = value.value as ObjectGenericProps<ValueAndValidProps<string>>
                        body[key] = {
                            term: valueState.term.value ? valueState.term.value : data[key].term,
                            definition: valueState.definition.value ? valueState.definition.value : data[key].definition,
                            imageUrl: valueState.imageUrl.value ? valueState.imageUrl.value: data[key].imageUrl,
                        }
                    }
                }
            })

            const response = cardId && await cardApi.updateCard(cardId, JSON.stringify(body))
            console.log(response)
            navigate(`/card-detail/${cardId}`)

        } catch(error) {
            console.log(error)
        }
    }

    if (isLoading) {
        return <LoadingSpinner asOverlay/>
      }
    
    if (error) {
        return <ErrorModal 
          error={"Cannot load users"} 
          onClear={() => !error}
        />
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
            initialValue={data.title}
            initialIsValid={true}
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
            initialValue={data.description}
            initialIsValid={true}
            />
        <div className='card-form' >
        {
          Object.entries(data).map(([key, value]) => {
            if (filterName.indexOf(key) === -1) {

                if (typeof value !== null) {
                    return <TermFlashcard 
                    cardId={key}
                    removeSubCardHandler={removeSubCardHandler}
                    flashcard={value as ObjectGenericProps<string>}
                    inputHandler={inputHandler}
                    key={key}
                  />
                }
            }
          }
          )
        }
        <Button type="button" onClick={addMoreCardHandler}>ADD MORE CARD</Button>
      </div>
        <Button type="submit" disabled={!formState.isValid}>UPDATE CARD</Button> 
    </form>
  )
}

export default UpdateCard