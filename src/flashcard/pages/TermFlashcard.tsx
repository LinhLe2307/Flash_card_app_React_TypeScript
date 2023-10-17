import Input from '../../shared/components/FormElements/Input'
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators'

import Button from '../../shared/components/FormElements/Button'
import { TermFlashcardProps } from '../types/cardTypes'
import './TermFlashcard.css'

const TermFlashcard = ({cardId, inputHandler, removeSubCardHandler, formState}:TermFlashcardProps) => {
  const termValue = formState && formState.inputs[cardId].value;

  return (
    <div className="flashcard">
      {
        typeof termValue !== "string" && !termValue
        && <>
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
        </> 
        }
        {
          typeof termValue !== "string" && termValue
        &&
        <>
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
            initialValue={termValue.term.value}
            initialIsValid={termValue.term.isValid}
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
            initialValue={termValue.definition.value}
            initialIsValid={termValue.definition.isValid}
          />
        </>
      }
          
      <Button type="button" onClick={() => removeSubCardHandler(cardId)}>Remove</Button>
    </div>
  )
}

export default TermFlashcard