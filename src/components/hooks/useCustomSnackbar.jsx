// useCustomSnackbar.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useCustomSnackbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');

  const showSnackbar = (message, severity = 'success') => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    navigate(-1)
  };

  return {
    open,
    message,
    severity,
    showSnackbar,
    handleClose,
  };
};

export default useCustomSnackbar;
