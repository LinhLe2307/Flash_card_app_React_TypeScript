import { useState } from 'react';
import Button from './Button';
import ImageListUrl from './ImagesListUrl';

import { TermFlashcardProps } from '../../../flashcard/types/cardTypes';
import { useImage } from '../../hooks/image-hook';

const ImageUrl = ({cardId, inputHandler, flashcard}: TermFlashcardProps) => {
    const [imageState, searchKeywordHandler, openUnsplashHandler, searchingButtonHandler, addedPhotosHandler] = useImage({
        [cardId]: {
          isOpeningUnsplash: false,
          searchKeyword: '',
          isClickingButton: false,
          photos: []
        }
    })

    const [pickedImage, setPickedImage] = useState('')

    return (
    <>
        <div className="flashcard__input_3">
          {
            pickedImage
            ? <img
              src={pickedImage}
              width="200px"
              onClick={() => openUnsplashHandler(cardId)}
            />
            : 
            typeof flashcard !== "string" && flashcard?.imageUrl.value 
            ? <div>
                <img
                  src={flashcard.imageUrl.value}
                  width="200px"
                  onClick={() => openUnsplashHandler(cardId)}
                />
            </div>
            : <div>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png"
                  width="200px"
                  onClick={() => openUnsplashHandler(cardId)}
                />
              </div>
            }
        </div>
          {
            imageState[cardId] && imageState[cardId].isOpeningUnsplash &&
              <div className='flashcard__input_4'>
                <div className={`form-control`}>
                  <input 
                    name="imageUrl" 
                    onChange={(event) => searchKeywordHandler(event, cardId)}
                    value={imageState[cardId].searchKeyword}
                  />
                </div>
                <Button type="button" onClick={() => searchingButtonHandler(cardId)}>Search</Button>
                  {
                    imageState[cardId].isClickingButton && 
                    <ImageListUrl 
                      searchKeyword={imageState[cardId].searchKeyword} 
                      isSearching={imageState[cardId].isClickingButton} 
                      photos={imageState[cardId].photos}
                      addedPhotosHandler={addedPhotosHandler}
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