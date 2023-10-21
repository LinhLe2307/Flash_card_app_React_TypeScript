import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';

import Button from '../../shared/components/FormElements/Button';
import ImageList from '../components/ImageList';
import { TermFlashcardProps } from '../types/cardTypes';
import './TermFlashcard.css';
import { useImage } from '../../shared/hooks/image-hook';


const TermFlashcard = ({cardId, inputHandler, removeSubCardHandler, formState}:TermFlashcardProps) => {
// const TermFlashcard = ({cardId, inputHandler, removeSubCardHandler, formState, imageState, searchKeywordHandler, openUnsplashHandler, searchingButtonHandler, addedPhotosHandler}:TermFlashcardProps) => {
  const termValue = formState && formState.inputs[cardId].value;

  const [imageState, searchKeywordHandler, openUnsplashHandler, searchingButtonHandler, addedPhotosHandler] = useImage({
    [cardId]: {
      isOpeningUnsplash: false,
      searchKeyword: '',
      isClickingButton: false,
      photos: []
    }
  })
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
          <div>
            <Button type="button" onClick={() => openUnsplashHandler(cardId)}><img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png"
              width="125px"
              /></Button>
          </div>
        </> 
        }
        {
          typeof termValue !== "string" && termValue
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
          <div>
              <img
                src={termValue.imageUrl?.value}
                width="125px"
                onClick={() => openUnsplashHandler(cardId)}
              />
          </div>
        </>
      }         
      </div>
      {
            imageState[cardId].isOpeningUnsplash ?
            <>
              <div>
                <input name="imageUrl" onChange={(event) => searchKeywordHandler(event, cardId)}/>
              </div>
              <Button type="button" onClick={() => searchingButtonHandler(cardId)}>Search</Button>

              {
                imageState[cardId].searchKeyword.length !== 0 &&
                <ImageList 
                  searchKeyword={imageState[cardId].searchKeyword} 
                  isSearching={imageState[cardId].isClickingButton} 
                  photos={imageState[cardId].photos}
                  addedPhotosHandler={addedPhotosHandler}
                  inputHandler={inputHandler}
                  cardId={cardId}
                />
              }
            </>
            
            : <></>
      }
    </div>
  )
}

export default TermFlashcard