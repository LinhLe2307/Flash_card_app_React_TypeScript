import { useQuery } from '@tanstack/react-query';
import photoApi from '../../shared/api/photoApi';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import { ImageGenericProps, ImageListPProps } from '../../shared/types/imageTypes';
import './ImageList.css';


const getUnsplashImage = async(query: string, addedPhotosHandler:ImageGenericProps<[]>, cardId:string) => {
    try {
      const image = await photoApi.getImage(query)
      addedPhotosHandler(image.data.results, cardId)
      return image
    } catch(err) {
      console.log(err)
    }
  }
  
const ImageList = ({searchKeyword, isSearching, photos, addedPhotosHandler, cardId, inputHandler}: ImageListPProps) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["unsplash"],
        queryFn: () => getUnsplashImage(searchKeyword, addedPhotosHandler, cardId),
        enabled: !!isSearching
    })

    if (isLoading) {
      return <LoadingSpinner asOverlay/>
    }
    
    if (error) {
        return <ErrorModal
          error={"Cannot load the image"} 
          onClear={() => !error}
        />
    }
    return (
        <div id='image-wrapper'>
            {
                photos?.map(item => <div key={item['urls']['small']}>
                  <img className="gallery__img" alt="unsplash" src={item['urls']['small']} onClick={() => inputHandler(item['urls']['small'], true, cardId, 'imageUrl')}/>
              </div>)
            }
        </div>
    )
}

export default ImageList