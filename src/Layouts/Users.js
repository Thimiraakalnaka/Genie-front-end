import React, { useEffect, useState } from 'react';
import UsersTable from '../Component/UsersTable';
import Axios from 'axios';
import {Button, Typography } from '@mui/material';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import UserForm from '../Component/UserForm';


export default function Users() {
  const [users, setUsers]= useState([]);
  const [submitted, setSubmitted] = useState(false);
  
  useEffect(() =>{
    getUsers();
  },[]);

  const getUsers = () =>{
    Axios.get('http://localhost:8080/api/v1/getusers')
    .then(response => {
      setUsers(response.data);
    })
    .catch(error => {
      console.error("Axios Error :", error);
    });
  }

  const addUser = (data) => {
    setSubmitted(true);

    const payload ={
      id: data.id,
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: data.password
    }

    Axios.post('http://localhost:8080/api/v1/adduser', payload)
    .then(() => {
      getUsers();
      setSubmitted(false);
    })
    .catch(error => {
      console.error("Axios Error :", error);
    });
  }

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Users
        <Button sx={{float:'right'}} variant="contained" endIcon={<PersonAddAltIcon />} onClick={handleOpen}> Add users</Button>
       
      </Typography>
    <UsersTable rows={users}/>
    <UserForm open={open} handleClose={handleClose} addUser={addUser} />
      
    </div>
  );
}
