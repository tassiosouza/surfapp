/* eslint-disable react/no-unknown-property */
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import Lottie from 'react-lottie';

const Preview = () => {

  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('/assets/surf-loading.json')
      .then(response => response.json())
      .then(data => setAnimationData(data));
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <Box>
      <Typography
        variant="h4"
        color="text.primary"
        sx={{
          fontWeight: 700,
        }}
      >
        San Diego, California
      </Typography>
      <Typography
        variant="h7"
        color="text.secondary"
        sx={{ fontWeight: 400 }}
      >
        Recent uploads from San Diego, Ca.
      </Typography>
      <Divider sx={{pt:'15px'}}></Divider>
      <div>
        {animationData && <Lottie options={defaultOptions} height={400} width={400} />}
      </div>
    </Box>
  );
};

export default Preview;
