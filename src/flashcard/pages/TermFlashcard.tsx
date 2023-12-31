import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';

import Button from '../../shared/components/FormElements/Button';
import { useImage } from '../../shared/hooks/image-hook';
import ImagesList from '../components/ImagesList';
import { TermFlashcardProps } from '../types/cardTypes';
import './TermFlashcard.css';


const TermFlashcard = ({cardId, inputHandler, removeSubCardHandler, flashcard}:TermFlashcardProps) => {
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
          <div>
            <Button type="button" onClick={() => openUnsplashHandler(cardId)}><img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png"
              width="125px"
              /></Button>
          </div>
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
            initialValue={flashcard.term}
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
            initialValue={flashcard.definition}
            initialIsValid={true}
          />
          <div>
              <img
                src={flashcard.imageUrl}
                width="125px"
                onClick={() => openUnsplashHandler(cardId)}
              />
          </div>
        </>
      }         
      </div>
      {
            imageState[cardId].isOpeningUnsplash &&
            <>
              <div>
                <input name="imageUrl" onChange={(event) => searchKeywordHandler(event, cardId)}/>
              </div>
              <Button type="button" onClick={() => searchingButtonHandler(cardId)}>Search</Button>
                {
                  imageState[cardId].isClickingButton && 
                  <ImagesList 
                    searchKeyword={imageState[cardId].searchKeyword} 
                    isSearching={imageState[cardId].isClickingButton} 
                    photos={imageState[cardId].photos}
                    addedPhotosHandler={addedPhotosHandler}
                    inputHandler={inputHandler}
                    cardId={cardId}
                  />
                }
            </>
      }
    </div>
  )
}

export default TermFlashcard