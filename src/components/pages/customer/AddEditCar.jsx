import React, { useState } from 'react';
import Input from '../../Layout/input/Input';
import { Box, Button, Paper, Typography } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../../config';

const AddEditCar = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    carImage: null,
  });

  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar open state
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Snackbar message

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
    navigate(-1)
  };

  const submitHandler = async (e) => {
    e.preventDefault();
      let form = e.target;
      let formData = new FormData(form);
      // let formObj = Object.fromEntries(formData.entries())
      // const response = await fetch("http://3.106.253.55/v1/admin/car/Addcar");

    try {
      const response = await axios.post(`${API_URL}car/Addcar`, formData);
      console.log("res",response.data.statusCode);
      if(response.data.statusCode === 200){
      setOpenSnackbar(true);
      setSnackbarMessage(response.data.message);
      setFormData({
        name: '',
        carImage: null,
      });
    }
    } catch (error) {
      console.error('Error sending data to API:', error);
    }
  };

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Paper sx={{ width: '100%', height: '60vh', p: 2 }}>
        <Typography variant="h5" mb={2}>
          Add/Edit Car Details
        </Typography>
        <form onSubmit={submitHandler}>
          <Input
            title="Car Name"
            name="name"
            className="pb-2"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            title="Car Image"
            type="file"
            name="carImage"
            onChange={handleChange}
            accept="image/*"
            required
          />
          <Box className="mt-4 d-flex gap-3">
            <Button color='secondary' variant="contained" onClick={() => navigate(-1)}>Back</Button>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </form>
        <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity="success"
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
      </Paper>
    </Box>
  );
};

export default AddEditCar;
