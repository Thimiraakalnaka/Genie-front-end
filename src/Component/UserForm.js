import React, { useState } from 'react';
import { Box, Typography, Modal, TextField, Button } from '@mui/material';

const UserForm = ({ addUser, open, handleClose }) => {

    const [formData, setFormData] = useState({
        id: '',
        firstname: '',
        lastname: '',
        email: '',
        password: ''
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        addUser(formData);
        // You can handle form submission here (e.g., make an API call)
        handleClose();
      };

  return (
    <div>
         <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
       <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #007FFF',
          boxShadow: 24,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add New User
        </Typography>
        <TextField
          label="ID"
          name="id"
          value={formData.id}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="First Name"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Last Name"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
        />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Box>
      </Modal>
    </div>
  )
}

export default UserForm