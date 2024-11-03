import React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductsTable = ({rows, selectedProducts, deleteProduct}) => {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product ID</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.productid}>
                <TableCell>{row.productid}</TableCell>
                <TableCell>{row.productname}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>
                <Button sx={{margin:'0px 10px'}} 
                variant="outlined" 
                startIcon={<DeleteIcon />} 
                color='error'
                onClick={() => deleteProduct({productid:row.productid})}
                >
                    Delete
                    </Button>

                <Button sx={{margin:'0px 10px'}} 
                variant="contained" 
                color="success"
                onClick={() => selectedProducts({productid: row.productid, productname:row.productname, description:row.description, quantity:row.quantity})}
                >Update
                </Button>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default ProductsTable