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
    <div>
          {
            pickedImage
            ? <Button type="button" onClick={() => openUnsplashHandler(cardId)}><img
            src={pickedImage}
            width="125px"
            /></Button> 
            : 
            typeof flashcard !== "string" && flashcard?.imageUrl.value 
            ? <div>
                <img
                  src={flashcard.imageUrl.value}
                  width="125px"
                  onClick={() => openUnsplashHandler(cardId)}
                />
            </div>
            : <div>
                <Button type="button" onClick={() => openUnsplashHandler(cardId)}><img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png"
                  width="125px"
                  /></Button>
              </div>
            }
          {
            imageState[cardId] && imageState[cardId].isOpeningUnsplash &&
            <>
              <div>
                <div className={`form-control`}>
                  <input name="imageUrl" onChange={(event) => searchKeywordHandler(event, cardId)}/>
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
            </>
      }
    </div>
  )
}

export default ImageUrl