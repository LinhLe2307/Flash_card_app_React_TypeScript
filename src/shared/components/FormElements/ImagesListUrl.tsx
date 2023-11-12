import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useQuery } from '@tanstack/react-query';
import photoApi from '../../api/photoApi';
import ErrorModal from '../UIElements/ErrorModal';

import { Box } from '@mui/material';
import { ImageGenericProps, ImageListProps } from '../../types/imageTypes';
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
  
const ImageListUrl = ({searchKeyword, isSearching, photos, addedPhotosHandler, cardId, inputHandler, setPickedImage}: ImageListProps) => {
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
      <Box sx={{ width: 700, height: 500, overflowY: 'scroll', margin: "auto" }}>
        <ImageList 
         variant="masonry" cols={3} gap={8}>
          {photos?.map((item) => (
            <ImageListItem key={item['urls']['small']}>
              <img
                srcSet={`${item['urls']['small']}`}
                src={`${item['urls']['small']}`}
                alt={"test"}
                loading="lazy"
                onClick={() => {
                  return (
                    inputHandler(item['urls']['small'], true, cardId, 'imageUrl'),
                    setPickedImage(item['urls']['small'])
                  )
                }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    )
}

export default ImageListUrl


