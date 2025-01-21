import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { fetchImage } from '../../app/actions/image';
import Input from '../../components/Forms/FormElements/Input';
import ImageListUrl from '../../components/Forms/Image/ImagesListUrl';
import { useImage } from '../../hooks/imageHook';
import { TermFlashcardProps } from '../../types/cardTypes';
import { VALIDATOR_REQUIRE } from '../../utils/validators';

const TermFlashcard = ({cardId, inputHandler, removeSubCardHandler, flashcard, length}:TermFlashcardProps) => {
  const [imageState, searchKeywordHandler, openUnsplashHandler] = useImage({
    [cardId]: {
      isOpeningUnsplash: false,
      searchKeyword: '',
      isClickingButton: false,
      photos: []
    }
})

  const dispatch = useDispatch()
  const [pickedImage, setPickedImage] = useState('')
  return (
    <div className="border border-slate-100 p-4 mt-5.5 rounded-lg shadow-inner dark:border-slate-600">
      <div className='mb-5.5 flex flex-col gap-5.5 sm:flex-row border-b'>
        <div className='w-full sm:w-1/2 py-2 dark:border-strokedark dark:text-white'>{cardId}</div>
        {
          typeof length === 'number' && length >= 5 &&
          <div className="w-full sm:w-1/2 flex justify-end rounded py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white">
            <button 
              type='button' 
              onClick={() => removeSubCardHandler(cardId)}
            >
              <DeleteRoundedIcon />
            </button> 
          </div>
        }
      </div>
      <div className='flex flex-col gap-5.5 sm:flex-row'>
        {
          typeof flashcard !== 'string' && !flashcard
          && <>
            <div className='w-full sm:w-1/3'>
                <Input 
                  nameId='term'
                  id={`${cardId}`}
                  type='text' 
                  label='Term*' 
                  element='input'
                  validators={
                    [
                      VALIDATOR_REQUIRE()
                    ]
                  }
                  errorText='Please enter a valid term.'
                  onInput = {inputHandler}
                />
              </div>
              <div className='w-full sm:w-1/3'>
                <Input 
                  nameId='definition'
                  id = {`${cardId}`}
                  type='text' 
                  label='Definition*' 
                  element='textarea'
                  validators={
                    [
                      VALIDATOR_REQUIRE()
                    ]
                  }
                  errorText={`Please enter a valid definition.`}
                  onInput = {inputHandler}
                />
            </div> 
          </>
          }
          {
            typeof flashcard !== 'string' 
            && !Array.isArray(flashcard)
            && flashcard
            &&
            <>
              <div className='w-full sm:w-1/3'>
                <Input 
                nameId='term'
                id={`${cardId}`}
                type='text'
                label='Term*' 
                element='input'
                validators={
                  [
                    VALIDATOR_REQUIRE()
                  ]
                }
                errorText='Please enter a valid term.'
                onInput = {inputHandler}
                initialValue={flashcard.term.value}
                initialIsValid={true}
                />
                </div>
              <div className='w-full sm:w-1/3'>
              <Input 
                nameId='definition'
                id = {`${cardId}`}
                type='text' 
                label='Definition*' 
                element='textarea'
                validators={
                  [
                    VALIDATOR_REQUIRE()
                  ]
                }
                errorText={`Please enter a valid definition.`}
                onInput = {inputHandler}
                initialValue={flashcard?.definition?.value ?? ''}
                initialIsValid={true}
              />
            </div>
            </>
        }    
        <div>
          {
            pickedImage
            ? 
            <div data-modal-target="static-modal" data-modal-toggle="static-modal" className='static dark:border-strokedark dark:text-white cursor-pointer w-45 object-cover rounded-lg'>
              <img
                src={pickedImage}
                onClick={() => openUnsplashHandler(cardId)}
              />
            </div>
            : 
            typeof flashcard !== 'string' && !Array.isArray(flashcard) && flashcard?.imageUrl?.value 
            ? <div data-modal-target="static-modal" data-modal-toggle="static-modal" className='static dark:border-strokedark dark:text-white cursor-pointer w-45 object-cover rounded-lg'>
                <img
                  src={flashcard?.imageUrl?.value}
                  onClick={() => openUnsplashHandler(cardId)}
                />
            </div>
            : <div data-modal-target="static-modal" data-modal-toggle="static-modal" className='static dark:border-strokedark dark:text-white cursor-pointer w-45 object-cover rounded-lg'>
                <img
                  src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png'
                  onClick={() => openUnsplashHandler(cardId)}
                />
              </div>
            }
        </div> 
      </div>
      {
        imageState[cardId] && imageState[cardId].isOpeningUnsplash &&
          <div
            className='mt-4 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          >
            <div className='flex gap-4.5 align-center justify-center'>
              <input 
                placeholder='Enter image name'
                type='text'
                id='imageUrl'
                onChange={(event) => searchKeywordHandler(event, cardId)}
                value={imageState[cardId].searchKeyword}
                className={
                  "w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                }
              />
              <button 
                type='button' 
                className="flex items-center justify-center rounded bg-primary px-4.5 font-medium text-gray hover:bg-opacity-90"
                onClick={() => dispatch(fetchImage({
                  searchKeyword: imageState[cardId].searchKeyword,
                  inputId: cardId
                }))}
              >
                Search
              </button>
            </div>
            {
              imageState[cardId].isClickingButton && 
                <ImageListUrl 
                  photos={imageState[cardId].photos}
                  inputHandler={inputHandler}
                  cardId={cardId}
                setPickedImage={setPickedImage}                    
                />
            }
        </div>
      }
    </div>
  )
}

export default TermFlashcard