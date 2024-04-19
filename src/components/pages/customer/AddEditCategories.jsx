import React, { useState } from 'react';
import Input from '../../Layout/input/Input';
import { Box, Button, Paper, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../../config';
import useCustomSnackbar from '../../hooks/useCustomSnackbar';
import Snackbar from '../../Layout/SnackBar';

const AddEditCategories = () => {
  const navigate = useNavigate();
  const {showSnackbar, open, message, severity, handleClose} = useCustomSnackbar();
  const [formData, setFormData] = useState({
    name: '',
    Image: null,
  });


  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));

  };

  const submitHandler = async (e) => {
    e.preventDefault();
      let form = e.target;
      let formData = new FormData(form);
      let formObj = Object.fromEntries(formData.entries())
      console.log('formObj', formObj)

    try {
      const response = await axios.post(`${API_URL}car/AddCarCategory`, formData);

      if(response.data.status === 'OK'){
        showSnackbar(response.data.message, 'success');
        setFormData({
          name: '',
          Image: null,
        });
      }
      // Handle the API response as needed
    } catch (error) {
      console.error('Error sending data to API:', error);
    }
  };

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Snackbar open={open} message={message} severity={severity} handleClose={handleClose}/>
      <Paper sx={{ width: '100%', height: 'auto', p: 2 }}>
        <Typography variant="h5" mb={2}>
          Add/Edit Fuel Type
        </Typography>
        <form onSubmit={submitHandler}>
          <Input
            title="Car Model"
            name="name"
            className="pb-2"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            title="Car Model Image"
            type="file"
            name="Image"
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
      </Paper>
    </Box>
  );
};

export default AddEditCategories;

