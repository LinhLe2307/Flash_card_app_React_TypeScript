import { useMutation, useQuery } from '@apollo/client'
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams, useLocation } from 'react-router-dom'

import { fetchUpdateCard } from '../../app/actions/form'
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb'
import Input from '../../components/Forms/FormElements/Input'
import { filterName } from '../../constants/global'
import { AuthContext } from '../../context/authContext'
import { useFormHook } from '../../hooks/formHook'
import { BodyProps, ValueAndValidProps } from '../../types/formTypes'
import { GenericProps, ObjectGenericProps } from '../../types/sharedTypes'
import { GET_CARD_BY_ID, UPDATE_CARD } from '../../queries/queries'
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../utils/validators'
import CardTags from './components/CardTags/CardTags'
import TermFlashcard from './TermFlashcard'
import Loader from '../../common/Loader'

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

  if (loading) {
    return <Loader />
  }

  return (
    <div className="mx-auto max-w-270">
      <Breadcrumb pageName="Update Card"/>
      <div className="mt-7.5 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Update Card
            </h3>
          </div>
        <div className="p-7">
          {
            data && data.getCardById && formState.isNotFetching
            && Array.isArray(formState.inputs.tags.value) 
            && typeof formState.inputs.title.value === 'string'
            && typeof formState.inputs.description.value === 'string'
            &&
          <form onSubmit={updateCardSubmitHandler}>
            <div>
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
                errorText='Please enter a valid text.'
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
                initialValue={data.getCardById.tags.map(tag => tag.name)} 
                />
            </div>
            <div className="my-4">
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
            <div className="flex justify-between gap-4.5">
                <button
                  className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                  type="button"
                  onClick={addMoreCardHandler}
                >
                  Add More Card
                </button>
                <button
                  disabled={!formState.isValid}
                  className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                  type="submit"
                >
                  Submit
                </button>
            </div>
          </form>
        }
        </div>
      </div>
    </div>
  )
}

export default UpdateCard