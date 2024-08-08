import React from 'react';
import { Box } from '@mui/material';

const Background = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #f3f4f6 0%, #ffffff 100%)',
        backgroundImage: 'url(https://images.pexels.com/photos/2736499/pexels-photo-2736499.jpeg)', // Optional: add a subtle pattern
        backgroundSize: 'cover',
        padding: 2,
      }}
    >
      {children}
    </Box>
  );
};

export default Background;
