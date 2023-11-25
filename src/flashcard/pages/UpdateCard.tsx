import React, { useContext, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { fetchUpdateCard } from "../../app/actions/form"
import Button from "../../shared/components/FormElements/Button"
import Input from "../../shared/components/FormElements/Input"
import ErrorModal from "../../shared/components/UIElements/ErrorModal"
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner"
import { filterName } from "../../shared/constants/global"
import { AuthContext } from "../../shared/context/auth-context"
import { useFormHook } from "../../shared/hooks/form-hook"
import { useHttpClient } from "../../shared/hooks/http-hook"
import { ValueAndValidProps } from "../../shared/types/formTypes"
import { GenericProps, ObjectGenericProps } from "../../shared/types/sharedTypes"
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators"
import TermFlashcard from "./TermFlashcard"
import './TermFlashcard.css'

const UpdateCard = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const auth = useContext(AuthContext)
    const [isLoadingState, setIsLoadingState] = useState(false)

    const cardId = useParams().cardId
    const { isLoading, error, sendRequest, clearError } = useHttpClient()   
    const [formState, removeSubCardHandler, inputHandler, addMoreCardHandler, resetState] = useFormHook()
    
    const updateCardSubmitHandler:GenericProps<React.FormEvent<HTMLFormElement>> = async(event) => {
        event.preventDefault()
        try {
            
            const body: ObjectGenericProps<string | ObjectGenericProps<ValueAndValidProps<string> | string>> = {
                title: formState.inputs.title.value,
                description: formState.inputs.description.value,
            }
   
            Object.entries(formState.inputs).map(([key, value]) => {
                if (!(key in body)){
                    if ( typeof value !== "string") {
                        const valueState = value.value as ObjectGenericProps<ValueAndValidProps<string>>
                        body[key] = {
                            term: valueState.term.value 
                                && valueState.term.value,
                            definition: valueState.definition.value 
                                && valueState.definition.value,
                            imageUrl: valueState.imageUrl && valueState.imageUrl.value 
                                ? valueState.imageUrl.value 
                                : ''
                        }
                    }
                }
            })
            const response = await sendRequest(`/api/cards/${cardId}`,
                'PATCH',
                JSON.stringify(body),
                {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + auth.token
                }
            )

            if (response) {
                resetState("update_card")
                setTimeout(()=> navigate(`/card-detail/${cardId}`), 500)
            }

            
        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        // console.log("formState 1", formState)
        setIsLoadingState(true)
        if (cardId) {
            dispatch(
                fetchUpdateCard({
                    cardId: cardId,
                    sendRequest: sendRequest
                }))
            }
        }, [dispatch])
        
    useEffect(() => {
        setIsLoadingState(false)
        // console.log("formState", formState)
        // setUpdatedCard(formState)
    }, [formState])

  return (
    <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        { isLoadingState && <LoadingSpinner asOverlay/> }

        
            <p>{formState.inputs.title.value as string}</p>
            <p>{formState.inputs.description.value as string}</p>
            {
                    Object.entries(formState.inputs).map(([key, value]) => {
                        if (filterName.indexOf(key) === -1) {
                            if (typeof value !== null) {
                                return <>
                                <p>{key} - {value.value.term.value}</p>
                                <p>{key} - {value.value.definition.value}</p>
                                <p>{key} - {value.value.imageUrl.value}</p>
                                </>
                            }
                        }
                    }
                    )
                }
        

        {
            formState
            &&
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
                    initialValue={formState.inputs.title.value}
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
                    initialValue={formState.inputs.description.value}
                    initialIsValid={true}
                    />
                <div>
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
                </div>

                <div className="flashcard__buttons_group">
                    <Button type="button" onClick={addMoreCardHandler}>ADD MORE CARD</Button>
                    <div style={{
                        float: "right"
                    }}>
                        <Button type="submit" disabled={!formState.isValid}>SUBMIT</Button>
                    </div>
                </div>
            </form>
        }
    </React.Fragment>
  )
}

export default UpdateCard