import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useQuery } from '@tanstack/react-query';
import photoApi from '../../shared/api/photoApi';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import { ImageGenericProps, ImageListPProps } from '../../shared/types/imageTypes';
// import './ImageList.css';


const getUnsplashImage = async(query: string, addedPhotosHandler:ImageGenericProps<[]>, cardId:string) => {
  try {
      const image = await photoApi.getImage(query)
      addedPhotosHandler(image.data.results, cardId)
      return image
    } catch(err) {
      console.log(err)
    }
  }
  
const ImagesList = ({searchKeyword, isSearching, photos, addedPhotosHandler, cardId, inputHandler}: ImageListPProps) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["unsplash"],
        queryFn: () => getUnsplashImage(searchKeyword, addedPhotosHandler, cardId),
        enabled: !!isSearching
    })

    if (isLoading) {
      return <h1>Loading...</h1>
    }
    
    if (error) {
        return <ErrorModal
          error={"Cannot load the image"} 
          onClear={() => !error}
        />
    }
    return (
        <ImageList sx={{ width: 900, height: 500 }} variant="woven" cols={4} gap={8}>
          {photos?.map((item) => (
            <ImageListItem key={item['urls']['small']}>
              <img
                srcSet={`${item['urls']['small']}`}
                src={`${item['urls']['small']}`}
                alt={"test"}
                loading="lazy"
                onClick={() => inputHandler(item['urls']['small'], true, cardId, 'imageUrl')}
              />
            </ImageListItem>
          ))}
        </ImageList>
    )
}

export default ImagesList


