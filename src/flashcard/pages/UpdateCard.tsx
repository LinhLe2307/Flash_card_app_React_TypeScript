import React, { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'

import Button from '../../shared/components/FormElements/Button'
import Input from '../../shared/components/FormElements/Input'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { filterName } from '../../shared/constants/global'
import { AuthContext } from '../../shared/context/auth-context'
import { useFormHook } from '../../shared/hooks/form-hook'
import { ValueAndValidProps, BodyProps, FormInputsProps } from '../../shared/types/formTypes'
import { GenericProps, ObjectGenericProps } from '../../shared/types/sharedTypes'
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators'
import TermFlashcard from './TermFlashcard'
import CardTags from '../components/CardTags/CardTags'
import { UPDATE_CARD, GET_CARD_BY_ID } from '../../shared/util/queries'
import Modal from '../../shared/components/UIElements/Modal'
import './TermFlashcard.css'

const UpdateCard = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const auth = useContext(AuthContext)

    const cardId = useParams().cardId
    const [formState, removeSubCardHandler, inputHandler, addMoreCardHandler] = useFormHook()
    const [cardData, setCardData] = useState<FormInputsProps>({})

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
            refetch({ cardId });
        }
    }, [cardId, refetch]);

    useEffect(() => {
        if (data && data.getCardById) {
            const formCard: FormInputsProps = {}
            Object.entries(data.getCardById).forEach(([key, value]) => {
                if (['title', 'description'].includes(key)) {
                    formCard[key] = {
                        value: value as string,
                        isValid : true
                    }
                } else if (['tags'].includes(key)) {
                    const tagsList =  Array.isArray(value) ? value.map((tag: ObjectGenericProps<string> )=> tag.name) : []
                    formCard[key] = {
                        value: tagsList,
                        isValid : true
                    }
                }
                else if (!filterName.includes(key)) {
                    if (typeof value === 'object' && value !== null) {
                        const typedValue = value as ObjectGenericProps<string>
                        formCard[key] = {
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
            setCardData(formCard)

        }
    }, [data, dispatch])

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
            cardData 
            && typeof cardData?.title?.value === 'string' && +cardData?.title?.value.length > 0 
            && typeof cardData?.description?.value === 'string' && +cardData?.description?.value.length > 0
            && Array.isArray(cardData?.tags?.value) && +cardData?.tags?.value.length > 0
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
                        initialValue={cardData.title.value ?? ''}
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
                        initialValue={cardData.description.value ?? ''}
                        initialIsValid={true}
                        />
                    <CardTags 
                        inputHandler={inputHandler}
                        initialValue={cardData.tags.value}
                    />
                </div>
                <div>
                {
                    
                    Object.entries(cardData).map(([key, value]) => {
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
                        <Button type='button' onClick={openConfirmHandler}>SUBMIT</Button>
                    </div>
                </div>
            </form>
        }
    </React.Fragment>
  )
}

export default UpdateCard