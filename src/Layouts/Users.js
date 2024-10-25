import React, { useEffect, useState } from 'react';
import UsersTable from '../Component/UsersTable';
import Axios from 'axios';
import { Button, Typography } from '@mui/material';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';


export default function Users() {
  const [users, setUsers]= useState([]);
  
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
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Users
        <Button sx={{  float:'right'}} variant="contained" endIcon={<PersonAddAltIcon />}  >Add users</Button>
      </Typography>
    <UsersTable rows={users}/>
      
    </div>
  );
}
