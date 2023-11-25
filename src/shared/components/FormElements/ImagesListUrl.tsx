import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import { Box, ThemeProvider, createTheme } from '@mui/material';
import { ImageListProps } from '../../types/imageTypes';
// import './ImageList.css';

const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      bigMobile: 350,
      tablet: 650,
      desktop: 900
    }
  }
});


const ImageListUrl = ({photos, cardId, inputHandler, setPickedImage}: ImageListProps) => {
    return (
      <ThemeProvider theme={theme}>
        <Box 
        // sx={{ width: 700, height: 500, overflowY: 'scroll' }}
          sx={{
            width: 700, height: 500,
            // backgroundColor: "pink",
            display: "grid",
            gridTemplateColumns: {
              mobile: "repeat(1, 1fr)",
              bigMobile: "repeat(3, 1fr)",
              tablet: "repeat(2, 1fr)",
              desktop: "repeat(1, 1fr)"
            },
            // [`& .${imageListItemClasses.root}`]: {
            //   display: "flex",
            //   flexDirection: "column"
            // }
          }}
        >
          <ImageList 
          variant="masonry" cols={3} gap={8} >
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
      </ThemeProvider>
    )
}

export default ImageListUrl


