import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';

import Button from '../../shared/components/FormElements/Button';
import ImageUnsplash from '../../shared/components/FormElements/ImageUnsplash';
import { TermFlashcardProps } from '../types/cardTypes';
import './TermFlashcard.css';


const TermFlashcard = ({cardId, inputHandler, removeSubCardHandler, flashcard}:TermFlashcardProps) => {

  return (
    <div className="flashcard">
      <div id="wrapper">
        <div className='flashcard__id'>{cardId}</div>
        <div className='flashcard__button'>
          <Button 
            type="button" 
            onClick={() => removeSubCardHandler(cardId)} 
            inverse
            size="small"
          >
            <DeleteRoundedIcon />
          </Button> 
        </div>
      </div>
      <div className="flashcard__input">
      {
        typeof flashcard !== "string" && !flashcard
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
          typeof flashcard !== "string" && flashcard
          &&
          <>
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
            initialValue={flashcard.term.value}
            initialIsValid={true}
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
            initialValue={flashcard.definition.value}
            initialIsValid={true}
          />
        </>
      }         
      </div>
      <ImageUnsplash 
        flashcard={flashcard}
        cardId={cardId} 
        inputHandler={inputHandler}
        removeSubCardHandler={removeSubCardHandler}
        />
      <></>
    </div>
  )
}

export default TermFlashcard