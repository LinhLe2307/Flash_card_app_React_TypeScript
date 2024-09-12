import { useMutation } from '@apollo/client'
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { filterName } from '../../constants/global'
import { AuthContext } from '../../context/authContext'
import { useFormHook } from '../../hooks/formHook'
import { BodyProps } from '../../types/formTypes'
import { GenericProps } from '../../types/sharedTypes'

import { initialImageState } from '../../app/actions/image'
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb'
import Input from '../../components/Forms/FormElements/Input'
import Loading from '../../components/Loading'
import { CREATE_CARD } from "../../queries/queries"
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../utils/validators'
import TermFlashcard from './TermFlashcard'
import CardTags from './CardTags/CardTags'

const NewCard = () => {
  const auth = useContext(AuthContext)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formState, removeSubCardHandler, inputHandler, addMoreCardHandler, setInitialStateForm] = useFormHook()
  
  const [createCard, { loading, error }] = useMutation(CREATE_CARD)
  const [errorMessage, setError] = useState(error?.message);

  const cardSubmitHandler:GenericProps<React.FormEvent<HTMLFormElement>> = async(event) => {
    event.preventDefault()
    try {
      const body: BodyProps = {}
      Object.entries(formState.inputs).forEach(([key, value]) => {
        const keyValue = value && value.value
        if(filterName.indexOf(key) === -1) {
          if (typeof keyValue !== 'string' && !Array.isArray(keyValue)) {
            return (
              body[key] = {
                term: keyValue && keyValue.term ? keyValue.term.value : '',
                definition: keyValue && keyValue.definition ? keyValue.definition.value : '',
                imageUrl: keyValue && keyValue.imageUrl ? keyValue.imageUrl.value : '',
              }
            )
          }
        } else {
          if (typeof keyValue === 'string' || typeof keyValue === 'object') {
            return (
              body[key] = keyValue
            )
          }
        }
      })

      body['userId'] = auth && auth.userId as string

      const response = await createCard({
        variables: {
          input: body
        }
      })

      if (response.data.createCard.id) {
        setTimeout(()=> 
          navigate(`/card-detail/${response.data.createCard.id}`), 500)
      }

    } catch(err) {
      console.log(err)
    }
  }

  const clearError = () => {
    setError(undefined);
  };

  useEffect(() => {
    dispatch(
      initialImageState()
    )
    setInitialStateForm()
  }, [])

  return (
    <div className="mx-auto max-w-270">
      <Breadcrumb pageName="New Card" />
      <div className="mt-7.5 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Add new card
            </h3>
          </div>
        <div className="p-7">
          <form onSubmit={cardSubmitHandler}>
            { loading && <Loading /> }
            <div>
              <Input 
                id='title'
                type='text' 
                label='Title*' 
                element='input'
                validators={
                  [
                    VALIDATOR_REQUIRE()
                  ]
                }
                errorText='Please enter a valid title'
                onInput={inputHandler}
                nameId='title'
              />
              <Input 
                id='description'
                type='text' 
                label='Description*' 
                element='textarea'
                validators={
                  [
                    VALIDATOR_MINLENGTH(5)
                  ]
                }
                errorText='Please enter a valid description (at least 5 characters).'
                onInput = {inputHandler}
                nameId='description'
              />
              <CardTags 
                inputHandler={inputHandler}
                initialValue={[]} 
                />
            </div>
            <div className="my-3">
              {
                formState.inputs && Object.keys(formState.inputs).map(card => filterName.indexOf(card) === -1 &&  <TermFlashcard 
                  cardId={String(card)}
                  removeSubCardHandler={removeSubCardHandler}
                  inputHandler={inputHandler}
                  key={card}
                  length={Object.keys(formState.inputs).length}
                />)
              }
            </div>
            <div className="flex justify-between gap-4.5 py-2">
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
        </div>
      </div>
    </div>
  )
}

export default NewCard