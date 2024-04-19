import React, { useEffect } from 'react';
import { Snackbar as SBar, Alert } from '@mui/material';

const Snackbar = (props) => {
  const { open, message, severity, handleClose } = props

  useEffect(() => {
  }, [open, message, severity]);
  return (
    <SBar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </SBar>
  );
};

export default Snackbar;
