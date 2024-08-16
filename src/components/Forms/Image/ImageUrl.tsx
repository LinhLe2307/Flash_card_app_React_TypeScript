import React, { useState } from 'react';
import ImageListUrl from './ImagesListUrl';

import { useDispatch } from 'react-redux';
import { fetchImage } from '../../../app/actions/image';
import { useImage } from '../../../hooks/imageHook';
import { TermFlashcardProps } from '../../../types/cardTypes';

const ImageUrl = ({cardId, inputHandler, flashcard}: TermFlashcardProps) => {
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
      <>
        <div>
          {
            pickedImage
            ? 
            <div data-modal-target="static-modal" data-modal-toggle="static-modal" className='static dark:border-strokedark dark:text-white cursor-pointer w-40 h-40 object-cover rounded-lg'>
              <img
                src={pickedImage}
                onClick={() => openUnsplashHandler(cardId)}
              />
            </div>
            : 
            typeof flashcard !== 'string' && !Array.isArray(flashcard) && flashcard?.imageUrl?.value 
            ? <div data-modal-target="static-modal" data-modal-toggle="static-modal" className='static dark:border-strokedark dark:text-white cursor-pointer w-40 h-40 object-cover rounded-lg'>
                <img
                  src={flashcard?.imageUrl?.value}
                  onClick={() => openUnsplashHandler(cardId)}
                />
            </div>
            : <div data-modal-target="static-modal" data-modal-toggle="static-modal" className='static dark:border-strokedark dark:text-white cursor-pointer w-40 h-40 object-cover rounded-lg'>
                <img
                  src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png'
                  onClick={() => openUnsplashHandler(cardId)}
                />
              </div>
            }
        </div>
        
        {
          imageState[cardId] && imageState[cardId].isOpeningUnsplash &&
            <div
              className='mt-4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            >
              <input 
                name='imageUrl' 
                onChange={(event) => searchKeywordHandler(event, cardId)}
                value={imageState[cardId].searchKeyword}
              />
              <button type='button' onClick={() => dispatch(fetchImage({
                searchKeyword: imageState[cardId].searchKeyword,
                inputId: cardId
              }))}>Search</button>
              {/* <Button type='button' onClick={() => searchingButtonHandler(cardId)}>Search</Button> */}
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
    </>
  )
}

export default ImageUrl