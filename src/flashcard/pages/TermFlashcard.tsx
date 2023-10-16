import React from 'react'
import Input from '../../shared/components/FormElements/Input'
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators'

import Button from '../../shared/components/FormElements/Button'
import { TermFlashcardProps } from '../types/cardTypes'

const TermFlashcard = ({cardId, inputHandler, removeSubCardHandler, formState}:TermFlashcardProps) => {
  return (
    <React.Fragment>
      <div>{cardId}</div>
        <Input 
        nameId="term"
        id={`${cardId}`}
        type="text" 
        label="Term" 
        element="input"
        validators={
          [
            VALIDATOR_REQUIRE()
          ]
        }
        errorText="Please enter a valid term"
        onInput = {inputHandler}
        initialValue={formState?.inputs[cardId].value.term.value}
        initialIsValid={formState && formState.inputs[cardId].value.term.isValid}
        />
      <Input 
        nameId="definition"
        id = {`${cardId}`}
        type="text" 
        label="Definition" 
        element="textarea"
        validators={
          [
            VALIDATOR_MINLENGTH(5)
          ]
        }
        errorText="Please enter a valid definition (at least 5 characters)."
        onInput = {inputHandler}
        initialValue={formState && formState.inputs[cardId].value.definition.value}
        initialIsValid={formState && formState.inputs[cardId].value.definition.isValid}
      />
      
      <Button type="button" onClick={() => removeSubCardHandler(cardId)}>Remove</Button>
      {/* <button type="button" onClick={() => removeSubCardHandler(cardId)}>Remove</button> */}
    </React.Fragment>
  )
}

export default TermFlashcard