import React, { useEffect, useState } from 'react';
import { Box, Typography, Modal, TextField, Button } from '@mui/material';

const ProductForm = ({ addProduct, open, handleClose, submitted, data, isEdit, updateUser }) => {
    
    const [formData, setFormData] = useState({
        productid: '',
        productname: '',
        description: '',
        quantity: ''
      });

      useEffect(() => {
        if(!submitted && !isEdit){
            setFormData({
                productid: '',
                productname: '',
                description: '',
                quantity: ''
              });
        }
    }, [submitted, isEdit]);


    useEffect(() => {
        if(data?.productid && data.productid !==0){
            setFormData(data)
        }
    },[data]);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if(isEdit){
            updateUser(formData);
        }else{
            addProduct(formData);
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
          {
            isEdit? 'Update Product' : 'Add Product'
          }
        </Typography>
        <TextField
          label="Product ID"
          name="productid"
          value={formData.productid}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Product Name"
          name="productname"
          value={formData.productname}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          fullWidth
        />
        <Button variant="contained" type="submit">
          {
            isEdit ? 'Update' : 'Add'
          }
        </Button>
      </Box>
      </Modal>
    </div>
  )
}

export default ProductForm