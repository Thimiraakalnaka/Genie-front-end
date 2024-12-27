import React, { useEffect, useState } from 'react';
import { Box, Typography, Modal } from '@mui/material';

const UserForm = ({ addUser, open, handleClose, submitted, data, isEdit, updateUser }) => {


  const [formData, setFormData] = useState({
    id: '',
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    if (!submitted && !isEdit) {
      setFormData({
        id: '',
        firstname: '',
        lastname: '',
        email: '',
        password: ''
      });
    }
  }, [submitted, isEdit]);


  useEffect(() => {
    if (data?.id && data.id !== 0) {
      setFormData(data)
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      updateUser(formData);
    } else {
      addUser(formData);
    }

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
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 800,
            bgcolor: 'background.paper',
            border: '2px solid #007FFF',
            boxShadow: 24,
            borderRadius: 5,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}
        >
          <form onSubmit={handleSubmit} className="row g-3" >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {
                isEdit ? 'Update User' : 'Add New User'
              }
            </Typography>



            <div className="col-md-6">
              <label for="firstname" className="form-label">First Name</label>
              <input type="text"
                className="form-control"
                id="firstname"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label for="lastname" className="form-label">Last Name</label>
              <input type="text"
                className="form-control"
                id="lastname"
                name='lastname'
                value={formData.lastname}
                onChange={handleChange} />
            </div>

            <div className="col-12">
              <label for="email" className="form-label">Email</label>
              <input type="email"
                className="form-control"
                id="email"
                placeholder="example@gmail.com"
                name='email'
                value={formData.email}
                onChange={handleChange} />
            </div>


            <div className="col-md-6">
              <label for="password" className="form-label">Password</label>
              <input type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="col-12">
              <button type="submit" className="btn btn-primary">
                {
                  isEdit ? 'Update' : 'Add'
                }
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  )
}

export default UserForm