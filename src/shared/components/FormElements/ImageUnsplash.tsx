import { useState } from 'react';
import Button from './Button';
import ImagesListUnsplash from './ImagesListUnsplash';

import { useImage } from '../../hooks/image-hook';
import { InputHandlerProps } from '../../types/formTypes';

const ImageUnsplash = ({cardId, inputHandler}: {cardId: string, inputHandler: InputHandlerProps }) => {
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
        <div>
            {
                pickedImage 
                ? 
                    <Button type="button" onClick={() => openUnsplashHandler(cardId)}><img
                    src={pickedImage}
                    width="125px"
                    /></Button> 
                : 
                    <Button type="button" onClick={() => openUnsplashHandler(cardId)}><img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png"
                    width="125px"
                    /></Button>
            }
          </div>
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
                    <ImagesListUnsplash 
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
              {/* <div>
                <ImageUpload id={cardId} center onInput={inputHandler} errorText={"Wrong file"} nameId="imageUrl"/>
              </div> */}
            </>
      }
    </div>
  )
}

export default ImageUnsplash