import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loading({height}) {
  return (
    <Box sx={{ display: 'flex', height: height ? height : '100vh', justifyContent: 'center', alignItems: 'center' }}>
      <CircularProgress />
    </Box>
  );
}