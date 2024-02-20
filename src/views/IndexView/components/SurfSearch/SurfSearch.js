import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { alpha, useTheme } from '@mui/material/styles'
import { TextField, InputAdornment, Button, Select, MenuItem, FormControl, Grid, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

import Container from '../../../../pages/components/Container'

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
}

const images = [
  {
    group: [
      {
        cover:
          'https://img1.10bestmedia.com/Images/Photos/230197/p-tourmaline-Rocky-Bluffs--Courtesy-Lisa-Field--SanDiegoorg_55_660x440_201404241143.JPG',
        title: 'Tourmaline Beach, CA'
      },
      {
        cover: 'https://media.cntraveler.com/photos/606f6f1dac52332b71f171af/16:9/w_2560,c_limit/639571857',
        title: 'Blacks Beach, CA'
      }
    ]
  },
  {
    group: [
      {
        cover: 'https://travel.usnews.com/images/Pacific_Beach_Getty_Images.jpg',
        title: 'Pacific Beach, CA'
      },
      {
        cover: 'https://www.surf-forecast.com/system/images/11594/large/Coronado-Beaches.jpg?1410114932',
        title: 'Coronado Beach, CA'
      }
    ]
  }
]

const SurfSearch = () => {
  const theme = useTheme()

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'), {
    defaultMatches: true
  })

  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(to bottom, ${alpha(theme.palette.background.paper, 0)}, ${alpha(
          theme.palette.primary.main,
          1
        )} 100%)`,
        backgroundImage: "url('https://surfshotsd.s3.amazonaws.com/20240105060155/surfpic3-scaled.jpeg')",
        backgroundRepeat: 'repeat-x',
        position: 'relative'
      }}
    >
      <Box paddingY={{ xs: 0, sm: '4rem', md: '4rem' }}>
        <Container sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box maxWidth={{ xs: 1 }}>
            <Typography
              variant={isMobile ? 'h4' : 'h3'}
              color='white'
              gutterBottom
              sx={{
                fontWeight: 700,
                textAlign: 'center'
              }}
            >
              Find your shoot in your favorite{' '}
              <Typography
                color={'white'}
                component={'span'}
                variant={'inherit'}
                sx={{
                  background: `linear-gradient(180deg, transparent 82%, #ffdf00a6 0%)`
                }}
              >
                surfing spot.
              </Typography>
            </Typography>
            <TextField
              variant='filled'
              sx={{
                backgroundColor: '#fff',
                borderRadius: 0.5,
                width: '100%',
                '& .MuiFilledInput-input': {
                  padding: 4
                },
                marginTop: 2
              }}
              placeholder='La Jolla Shores, CA'
              InputProps={{
                startAdornment: (
                  <InputAdornment>
                    <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }}>
                      <Select
                        labelId='demo-simple-select-standard-label'
                        id='demo-simple-select-standard'
                        value={0}
                        // onChange={handleChange}
                        disableUnderline
                      >
                        <MenuItem value={0}>All Media</MenuItem>
                        <MenuItem value={10}>Photos</MenuItem>
                        <MenuItem value={20}>Videos</MenuItem>
                      </Select>
                    </FormControl>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position='end'>
                    {isMobile ? (
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    ) : (
                      <Button
                        startIcon={<SearchIcon />}
                        sx={{ backgroundColor: '#377dff', height: 38, paddingInline: '20px', color: '#fff' }}
                      >
                        Search
                      </Button>
                    )}
                  </InputAdornment>
                ),
                disableUnderline: true
              }}
            />
            {isMobile ? (
              <Carousel responsive={responsive} showDots={false} arrows={true}>
                {images.map(imageGroup =>
                  imageGroup.group.map((image, imageIndex) => (
                    <Box
                      key={imageIndex}
                      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: '40px' }}
                    >
                      <Box
                        sx={{
                          width: '160px', // Set width to 300px
                          height: '100px',
                          borderRadius: '10px',
                          border: '3px solid lightblue',
                          padding: '5px',
                          overflow: 'hidden' // This will keep the image within the border
                        }}
                      >
                        <Box
                          component='img'
                          src={image.cover}
                          sx={{
                            width: '100%', // This will make the image fill the box
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform .2s', // Animation
                            '&:hover': {
                              transform: 'scale(1.1)' // Zoom on hover
                            },
                            borderRadius: '10px'
                          }}
                        />
                      </Box>
                      <Typography
                        variant='h6'
                        gutterBottom
                        sx={{ color: 'white', textAlign: 'center', fontSize: '14px', width: 'fit-content' }}
                      >
                        {image.title}
                      </Typography>
                    </Box>
                  ))
                )}
              </Carousel>
            ) : (
              <Grid container spacing={2} sx={{ pt: 8 }}>
                {images.map(imageGroup =>
                  imageGroup.group.map((image, imageIndex) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={imageIndex}>
                      <Box
                        sx={{
                          width: '250px', // Set width to 300px
                          height: '150px',
                          borderRadius: '10px',
                          border: '3px solid lightblue',
                          padding: '5px',
                          overflow: 'hidden' // This will keep the image within the border
                        }}
                      >
                        <Box
                          component='img'
                          src={image.cover}
                          sx={{
                            width: '100%', // This will make the image fill the box
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform .2s', // Animation
                            '&:hover': {
                              transform: 'scale(1.1)' // Zoom on hover
                            },
                            borderRadius: '10px'
                          }}
                        />
                      </Box>
                      <Typography variant='h6' gutterBottom sx={{ color: 'white', textAlign: 'center' }}>
                        {image.title}
                      </Typography>
                    </Grid>
                  ))
                )}
              </Grid>
            )}

            <Box
              display='flex'
              flexDirection={{ xs: 'column', sm: 'row' }}
              alignItems={{ xs: 'stretched', sm: 'flex-start' }}
              marginTop={4}
            ></Box>
          </Box>
        </Container>
      </Box>
      <Box
        component={'svg'}
        preserveAspectRatio='none'
        xmlns='http://www.w3.org/2000/svg'
        x='0px'
        y='0px'
        viewBox='0 0 1920 100.1'
        sx={{
          width: '100%',
          marginBottom: theme.spacing(-1)
        }}
      >
        <path fill='#f7f7f9' d='M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z'></path>
      </Box>
    </Box>
  )
}

export default SurfSearch
