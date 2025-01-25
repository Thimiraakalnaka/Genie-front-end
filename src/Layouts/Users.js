import React, { useEffect, useState } from 'react';
import UsersTable from '../Component/UsersTable';
// import Axios from 'axios';
import {Button, Typography } from '@mui/material';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import UserForm from '../Component/UserForm';
import axiosInstance from '../axiosConfig';


export default function Users() {
  const [users, setUsers]= useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedUser, setSelectedUser]= useState([]);
  
  useEffect(() =>{
    getUsers();
  },[]);

  const getUsers = () =>{
    axiosInstance.get('http://localhost:8080/api/v1/getusers')
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

    axiosInstance.post('http://localhost:8080/api/v1/register', payload)
    .then(() => {
      getUsers();
      setSubmitted(false);
      handleClose();
    })
    .catch(error => {
      console.error("Axios Error :", error);
    });
  }

  const updateUser = (data) => {
    setSubmitted(true);

    const payload ={
      id: data.id,
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: data.password
    }

    axiosInstance.put('http://localhost:8080/api/v1/updateuser', payload)
    .then(() => {
      getUsers();
      setSubmitted(false);
      handleClose();
    })
    .catch(error => {
      console.error("Axios Error :", error);
    });

  }

  const deleteUser = (data)=>{

    const payload ={
      id: data.id,
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: data.password
    }
    
    axiosInstance.delete('http://localhost:8080/api/v1/deleteuser', {data:payload})
    .then(() => {
      getUsers();
    })
    .catch(error => {
      console.error("Axios Error deleting user:", error);
    });


  }

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setIsEdit(false);
    setSelectedUser({});
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Users
        <Button sx={{float:'right',width:'auto'}} variant="contained" endIcon={<PersonAddAltIcon />} onClick={handleOpen}> Add users</Button>
       
      </Typography>
    <UsersTable rows={users}  
    selectedUser={data=>{
      setSelectedUser(data);
      setIsEdit(true);
      handleOpen();
    }}
    
    deleteUser={data => window.confirm('Are you sure?') && deleteUser(data)}/>

    <UserForm 
    open={open} 
    handleClose={handleClose} 
    addUser={addUser} 
    submitted={submitted} 
    data={selectedUser} 
    isEdit={isEdit}
    updateUser={updateUser}
    />
    </div>
  );
}
