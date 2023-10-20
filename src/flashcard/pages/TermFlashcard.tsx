import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';

import { useState } from 'react';
import Button from '../../shared/components/FormElements/Button';
import ImageList from '../components/ImageList';
import { TermFlashcardProps } from '../types/cardTypes';
import './TermFlashcard.css';
import { EventHandler } from '../../shared/types/formTypes';


const TermFlashcard = ({cardId, inputHandler, removeSubCardHandler, formState}:TermFlashcardProps) => {
  const termValue = formState && formState.inputs[cardId].value;
  const [isLoadingImage, setIsLoadingImage] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  const searchImageHandler:EventHandler = (event) => {
    if (event) {
      setSearchKeyword(event.target.value)
      setIsSearching(false)
    }
  }

  const imageClickHandler = () => {
    setIsLoadingImage(prevState => !prevState)
  }

  const uploadImageHandler = (imageId: string) => {
    inputHandler(imageId, true, cardId, 'imageUrl')
  }

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
            <Button onClick={imageClickHandler}><img
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
                onClick={imageClickHandler}
              />
          </div>
        </>
      }         
      </div>
      {
            isLoadingImage && 
            <>
              <div>
                <input onChange={searchImageHandler}/>
              </div>
              <Button onClick={() => setIsSearching(true)}>Search</Button>
              <ImageList 
                searchKeyword={searchKeyword} 
                isSearching={isSearching} 
                uploadImageHandler={uploadImageHandler}
              />
              
            </>
      }
    </div>
  )
}

export default TermFlashcard