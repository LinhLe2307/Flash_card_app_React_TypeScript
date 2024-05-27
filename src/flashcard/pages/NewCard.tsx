import React, { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'

import Button from '../../shared/components/FormElements/Button'
import Input from '../../shared/components/FormElements/Input'
import { filterName } from '../../shared/constants/global'
import { AuthContext } from '../../shared/context/auth-context'
import { useFormHook } from '../../shared/hooks/form-hook'
import { GenericProps } from '../../shared/types/sharedTypes'
import { BodyProps } from '../../shared/types/formTypes'
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators'
import TermFlashcard from './TermFlashcard'

import { initialImageState } from '../../app/actions/image'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { initialState, deepCopy } from '../../app/reducers/formReducer'
import CardTags from '../components/CardTags/CardTags'
import { CREATE_CARD } from '../../shared/util/queries'
import './TermFlashcard.css'


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

      if (response.data.createCard._id) {
        setTimeout(()=> 
          navigate(`/card-detail/${response.data.createCard._id}`), 500)
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
    setInitialStateForm({...deepCopy(initialState)})
  }, [])

  return (
    <React.Fragment>
      {
        errorMessage && 
        <ErrorModal error={errorMessage} onClear={clearError} />
      }
      <form className='card-form' onSubmit={cardSubmitHandler}>
        { loading && <LoadingSpinner asOverlay/> }
        <div className='flashcard-form-title'>
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
            onInput = {inputHandler}
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
        <div>
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
        <div className='flashcard__buttons_group'>
          <Button type='button' onClick={addMoreCardHandler}>ADD CARD</Button>
          <div style={{
            float: 'right'
          }}>
            <Button type='submit' disabled={!formState.isValid}>SUBMIT</Button>
          </div>
        </div>
      </form>
    </React.Fragment>
  )
}

export default NewCard