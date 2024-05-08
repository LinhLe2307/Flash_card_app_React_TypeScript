import React, { useContext, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchUpdateCard } from '../../app/actions/form'
import Button from '../../shared/components/FormElements/Button'
import Input from '../../shared/components/FormElements/Input'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { filterName } from '../../shared/constants/global'
import { AuthContext } from '../../shared/context/auth-context'
import { useFormHook } from '../../shared/hooks/form-hook'
import { useHttpClient } from '../../shared/hooks/http-hook'
import { ValueAndValidProps, BodyProps } from '../../shared/types/formTypes'
import { GenericProps, ObjectGenericProps } from '../../shared/types/sharedTypes'
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators'
import TermFlashcard from './TermFlashcard'
import CardTags from '../components/CardTags/CardTags'
import './TermFlashcard.css'

const UpdateCard = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const auth = useContext(AuthContext)

    const cardId = useParams().cardId
    const { isLoading, error, sendRequest, clearError } = useHttpClient()   
    const [formState, removeSubCardHandler, inputHandler, addMoreCardHandler] = useFormHook()
    
    const updateCardSubmitHandler:GenericProps<React.FormEvent<HTMLFormElement>> = async(event) => {
        event.preventDefault()
        try {
            const body: BodyProps = {
                title: formState.inputs.title.value,
                description: formState.inputs.description.value,
                tags: formState.inputs.tags.value
            }
   
            Object.entries(formState.inputs).map(([key, value]) => {
                if (!(key in body)){
                    if ( typeof value !== 'string') {
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
                setTimeout(()=> navigate(`/card-detail/${cardId}`), 500)
            }

            
        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (cardId) {
            dispatch(
                fetchUpdateCard({
                    cardId: cardId,
                    sendRequest: sendRequest
                }))
            }
        }, [dispatch])

  return (
    <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        { !formState.inputs && <LoadingSpinner asOverlay/> }
        
        {
            formState 
            && typeof formState.inputs?.title?.value === 'string' && +formState.inputs?.title?.value.length > 0 
            && typeof formState.inputs?.description?.value === 'string' && +formState.inputs?.description?.value.length > 0
            && Array.isArray(formState.inputs?.tags?.value) && +formState.inputs?.tags?.value.length > 0
            &&
            <form className='card-form' onSubmit={updateCardSubmitHandler}>
                { isLoading && <LoadingSpinner asOverlay/> }
                <div className='flashcard-form-title'>
                    <Input 
                        nameId='title'
                        id='title' 
                        element='input'
                        type='text'
                        label='Title*'
                        validators={
                            [
                            VALIDATOR_REQUIRE()
                            ]
                        }
                        errorText='Please enter a valid text'
                        onInput={inputHandler}
                        initialValue={formState?.inputs?.title?.value ?? ''}
                        initialIsValid={true}
                        />
                    <Input 
                        nameId='description'
                        id='description' 
                        element='textarea'
                        type='text'
                        label='Description*'
                        validators={[VALIDATOR_MINLENGTH(5)]}
                        errorText='Please enter a valid definition (min. 5 characters).'
                        onInput={inputHandler}
                        initialValue={formState?.inputs?.description?.value ?? ''}
                        initialIsValid={true}
                        />
                    <CardTags 
                        inputHandler={inputHandler}
                        initialValue={formState.inputs.tags.value ?? []}
                    />
                </div>
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

                <div className='flashcard__buttons_group'>
                    <Button type='button' onClick={addMoreCardHandler}>ADD CARD</Button>
                    <div style={{
                        float: 'right'
                    }}>
                        <Button type='submit' disabled={!formState.isValid}>SUBMIT</Button>
                    </div>
                </div>
            </form>
        }
    </React.Fragment>
  )
}

export default UpdateCard