import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import { Box, ThemeProvider, createTheme } from '@mui/material';
import { ImageListProps } from '../../types/imageTypes';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 350,     // bigMobile
      md: 650,     // tablet
      lg: 900,     // desktop
      xl: 1200     // wideDesktop
    }
  }
});

const ImageListUrl = ({photos, cardId, inputHandler, setPickedImage}: ImageListProps) => {
    return (
      <ThemeProvider theme={theme}>
        <Box 
          sx={{
            width: 800, height: 550,
            display: "grid",
            gridTemplateColumns: {
              mobile: "repeat(1, 1fr)",
              bigMobile: "repeat(3, 1fr)",
              tablet: "repeat(2, 1fr)",
              desktop: "repeat(1, 1fr)"
            }
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


