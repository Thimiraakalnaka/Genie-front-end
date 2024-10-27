import React from 'react'
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


const UsersTable = ({rows, selectedUser, deleteUser}) => {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Password</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.firstname}</TableCell>
                <TableCell>{row.lastname}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.password}</TableCell>
                <TableCell>
                <Button sx={{margin:'0px 10px'}} 
                variant="outlined" 
                startIcon={<DeleteIcon />} 
                color='error'
                onClick={() => deleteUser({id:row.id})}
                >
                    Delete
                    </Button>

                <Button sx={{margin:'0px 10px'}} 
                variant="contained" 
                color="success"
                onClick={() => selectedUser({id: row.id, firstname:row.firstname, lastname:row.lastname, email:row.email, password:row.password})}
                >Update
                </Button>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default UsersTable