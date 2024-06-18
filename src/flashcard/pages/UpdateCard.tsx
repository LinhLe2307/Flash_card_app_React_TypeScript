import { useMutation, useQuery } from '@apollo/client'
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { fetchUpdateCard } from '../../app/actions/form'
import Button from '../../shared/components/FormElements/Button'
import Input from '../../shared/components/FormElements/Input'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import Modal from '../../shared/components/UIElements/Modal'
import { filterName } from '../../shared/constants/global'
import { AuthContext } from '../../shared/context/auth-context'
import { useFormHook } from '../../shared/hooks/form-hook'
import { BodyProps, ValueAndValidProps } from '../../shared/types/formTypes'
import { GenericProps, ObjectGenericProps } from '../../shared/types/sharedTypes'
import { GET_CARD_BY_ID, UPDATE_CARD } from '../../shared/util/queries'
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators'
import CardTags from '../components/CardTags/CardTags'
import TermFlashcard from './TermFlashcard'
import './TermFlashcard.css'

const UpdateCard = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const auth = useContext(AuthContext)

    const cardId = useParams().cardId
    const [formState, removeSubCardHandler, inputHandler, addMoreCardHandler, setInitialStateForm] = useFormHook()

    const { data, loading, error, refetch } = useQuery(GET_CARD_BY_ID, {
        variables: { cardId },
        skip: !cardId
    })

    const [ errorMessage, setError ] = useState(error?.message)
    
    const [ updateCard, {loading: loadingUpdate, error: errorUpdate} ] = useMutation(UPDATE_CARD)
    const [ errorUpdateMessage, setUpdateError ] = useState(errorUpdate?.message)

    const [ showConfirmModel, setShowConfirmModal ] = useState(false)

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

            const response = await updateCard({
                variables: {
                  input: {...body, cardId: cardId, userId: auth.userId}
                }
              })

            if (response) {
                navigate(`/card-detail/${cardId}`)
            }

            
        } catch(error) {
            console.log(error)
        }
    }

    const clearError = () => {
        setError(undefined);
        setUpdateError(undefined)
    };

    const openConfirmHandler = () => {
       setShowConfirmModal(true)
    }
    
    const cancelConfirmHandle = () => {
        setShowConfirmModal(false)
    }

    // Use useEffect to refetch when cardId changes
    useEffect(() => {
        if (cardId) {
            setInitialStateForm()
            refetch({ cardId });
        }
    }, [cardId, refetch]);

    useEffect(() => {
        if (data) {
            dispatch(
                fetchUpdateCard({
                    response: data.getCardById
                }))
            }
    }, [dispatch, data])

    if (loading) return <LoadingSpinner asOverlay/>
    if (loadingUpdate) return <LoadingSpinner asOverlay/>

  return (
    <React.Fragment>
        {
            errorMessage &&
            <ErrorModal error={errorMessage} onClear={clearError} />
        }
        {
            errorUpdateMessage &&
            <ErrorModal error={errorUpdateMessage} onClear={clearError} />
        }

        {
            data && data.getCardById && formState.isNotFetching
            && Array.isArray(formState.inputs.tags.value) 
            && typeof formState.inputs.title.value === 'string'
            && typeof formState.inputs.description.value === 'string'
            &&
            <form className='card-form' onSubmit={updateCardSubmitHandler}>
                <Modal 
                    show={showConfirmModel} 
                    onCancel={cancelConfirmHandle}
                    header='Confirm changes'
                    contentClass='card-item__modal-content'
                    footerClass='card-item__modal-actions'
                    footer={
                    <>
                        <Button type='submit'>CONFIRM</Button>
                        <Button inverse type='button' onClick={cancelConfirmHandle}>CLOSE</Button>
                    </>
                    }
                >
                    <div className='map-container'>
                    Are you sure you want to update the card?
                    </div>
                </Modal>
                { loading && <LoadingSpinner asOverlay/> }
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
                        initialValue={formState.inputs.title.value as string}
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
                        initialValue={formState.inputs.description.value as string}
                        initialIsValid={true}
                        />
                    <CardTags 
                        inputHandler={inputHandler}
                        initialValue={formState.inputs.tags.value}
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
                                length={Object.keys(formState.inputs).length}
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
                    <Button 
                        type='button' onClick={openConfirmHandler}
                    >
                        SUBMIT
                    </Button>
                    </div>
                </div>
            </form>
        }
    </React.Fragment>
  )
}

export default UpdateCard