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
              <TableCell>Image</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Catergory</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.productid}>
                <TableCell>{row.productid}</TableCell>
                <TableCell>
                  {row.imageUrl ? (
                    <img
                      src={row.imageUrl}
                      alt={row.imageName}
                      style={{ width: '75px', height: 'auto' }}
                    />
                  ) : (
                    'No Image'
                  )}
                </TableCell>
                <TableCell>{row.productname}</TableCell>
                <TableCell>{row.brand}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>
                <Button sx={{margin:'0px 10px',width:'auto'}} 
                variant="outlined" 
                startIcon={<DeleteIcon />} 
                color='error'
                onClick={() => deleteProduct({productid:row.productid})}
                >
                    Delete
                    </Button>

                <Button sx={{margin:'0px 10px',width:'auto'}} 
                variant="contained" 
                color="success"
                onClick={() => selectedProducts({productid: row.productid, productname:row.productname, brand:row.brand, 
                  description:row.description, price:row.price, category:row.category, quantity:row.quantity})}
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