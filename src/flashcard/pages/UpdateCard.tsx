import { useQuery } from "@tanstack/react-query"
import React, { useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Button from "../../shared/components/FormElements/Button"
import Input from "../../shared/components/FormElements/Input"
import ErrorModal from "../../shared/components/UIElements/ErrorModal"
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner"
import { filterName } from "../../shared/constants/global"
import { AuthContext } from "../../shared/context/auth-context"
import { useFormHook } from "../../shared/hooks/form-hook"
import { useHttpClient } from "../../shared/hooks/http-hook"
import { FormInputsProps, SendRequestProps, SetFormDataProps, ValueAndValidProps } from "../../shared/types/formTypes"
import { GenericProps, ObjectGenericProps } from "../../shared/types/sharedTypes"
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators"
import './CardForm.css'
import TermFlashcard from "./TermFlashcard"

const getDetailCard = async(cardId: string, setFormData: SetFormDataProps, sendRequest:SendRequestProps) => {
    try {
        const response = await sendRequest(
            `/api/cards/${cardId}`,
            'GET',
            null,
            {
                'Content-Type': 'application/json'
            }
            )
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
        return response.card
    } catch(err) {
        console.log(err)
    }
}

const UpdateCard = () => {
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const { isLoading, error, sendRequest, clearError } = useHttpClient()   
    const cardId = useParams().cardId

    const [formState, removeSubCardHandler, inputHandler, addMoreCardHandler, setFormData] = useFormHook({
        title: {
            value: '',
            isValid : false
        },
        description: {
            value: '',
            isValid : false
        }
        
    }, false)

    const {data} = useQuery({
        queryKey: ["update-card"],
        queryFn: () => cardId && getDetailCard(cardId, setFormData, sendRequest),
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
                            term: valueState.term.value 
                                ? valueState.term.value 
                                : data[key].term,
                            definition: valueState.definition.value 
                                ? valueState.definition.value 
                                : data[key].definition,
                            imageUrl: valueState.imageUrl.value 
                                ? valueState.imageUrl.value 
                                ? data[key].imageUrl : data[key].imageUrl
                                : '',
                        }
                    }
                }
            })
            console.log("body", body)
            const response = await sendRequest(`/api/cards/${cardId}`,
                'PATCH',
                JSON.stringify(body),
                {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + auth.token
                }
            )

            setTimeout(()=> navigate(`/card-detail/${cardId}`), 500)
            

        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        console.log(formState)
    }, [formState])
 
  return (
    <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />

        {
            data &&
            <form className='card-form' onSubmit={updateCardSubmitHandler}>
                { isLoading && <LoadingSpinner asOverlay/> }
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
                Object.entries(formState.inputs).map(([key, value]) => {
                    if (filterName.indexOf(key) === -1) {

                        if (typeof value !== null) {
                            return <TermFlashcard 
                            cardId={key}
                            removeSubCardHandler={removeSubCardHandler}
                            flashcard={value.value}
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
        }
    </React.Fragment>
  )
}

export default UpdateCard