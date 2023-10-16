import React from 'react'
import Input from '../../shared/components/FormElements/Input'
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators'

import Button from '../../shared/components/FormElements/Button'
import { TermFlashcardProps } from '../types/cardTypes'

const TermFlashcard = ({cardId, inputHandler, removeSubCardHandler}:TermFlashcardProps) => {
  return (
    <React.Fragment>
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
      />
      {/* <input 
            id={cardId}
            onChange={flashCardInputHandler}
            name="term"
            /> 

        <input 
            id={cardId}
            onChange={flashCardInputHandler}
            name="definition"
            />  */}
      
      <Button onClick={() => removeSubCardHandler(cardId)}>Remove</Button>
    </React.Fragment>
  )
}

export default TermFlashcard