import { useQuery } from '@tanstack/react-query';
import photoApi from '../../shared/api/photoApi';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ImageItem from './ImageItem';

import './ImageList.css';

interface ImageListPProps { 
  searchKeyword: string, 
  isSearching: boolean, 
  uploadImageHandler:(imageId: string) => void 
}

const getUnsplashImage = async(query: string) => {
    const staleTime = 1000 * 60 * 60 * 2
    try {
      const image = await photoApi.getImage(query)
      console.log(image)
      return image
    } catch(err) {
      console.log(err)
    }
  }
  
const ImageList = ({searchKeyword, isSearching, uploadImageHandler}: ImageListPProps) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["unsplash"],
        queryFn: () => getUnsplashImage(searchKeyword),
        enabled: !!isSearching
    })
    const photos = data?.data.results || data

    const chosenImageHandler = (imageId: string) => {
      uploadImageHandler(imageId)
    }

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
                photos?.map(item => <div key={item.urls.small}>
                  <img className="gallery__img" alt="unsplash" src={item.urls.small} onClick={() => chosenImageHandler(item.urls.small)}/>
              </div>)
            }
        </div>
    )
}

export default ImageList