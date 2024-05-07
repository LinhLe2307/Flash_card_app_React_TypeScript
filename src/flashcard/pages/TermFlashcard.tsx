import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_REQUIRE } from '../../shared/util/validators';

import Button from '../../shared/components/FormElements/Button';
import ImageUrl from '../../shared/components/FormElements/ImageUrl';
import { TermFlashcardProps } from '../types/cardTypes';
import './TermFlashcard.css';


const TermFlashcard = ({cardId, inputHandler, removeSubCardHandler, flashcard, length}:TermFlashcardProps) => {

  return (
    <div className="flashcard card-form">
      <div id="wrapper">
        <div className='flashcard__id'>{cardId}</div>
        {
          typeof length === 'number' && length >= 4 &&
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
        }
      </div>
      <div className="flashcard__input">
        {
          typeof flashcard !== "string" && !flashcard
          && <>
            <div className="flashcard__input_1">
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
              </div>
              <div className="flashcard__input_2">
              <Input 
                nameId="definition"
                id = {`${cardId}`}
                type="text" 
                label="Definition" 
                element="textarea"
                validators={
                  [
                    VALIDATOR_REQUIRE()
                  ]
                }
                errorText="Please enter a valid definition."
                onInput = {inputHandler}
              />
            </div> 
          </>
          }
          {
            typeof flashcard !== "string" 
            && !Array.isArray(flashcard)
            && flashcard
            &&
            <>
              <div className="flashcard__input_1">
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
                </div>
              <div className="flashcard__input_2">
              <Input 
                nameId="definition"
                id = {`${cardId}`}
                type="text" 
                label="Definition" 
                element="textarea"
                validators={
                  [
                    VALIDATOR_REQUIRE()
                  ]
                }
                errorText="Please enter a valid definition {'\n'}
                (at least 5 characters)."
                onInput = {inputHandler}
                initialValue={flashcard?.definition?.value ?? ''}
                initialIsValid={true}
              />
            </div>
            </>
        }         
        <ImageUrl 
          flashcard={flashcard}
          cardId={cardId} 
          inputHandler={inputHandler}
          removeSubCardHandler={removeSubCardHandler}
          />
      </div>
    </div>
  )
}

export default TermFlashcard