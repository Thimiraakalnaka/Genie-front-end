import React, { useEffect, useState } from 'react';
import { Box, Typography, Modal, TextField, Button } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';


const ProductForm = ({ addProduct, open, handleClose, submitted, data, isEdit, updateProduct }) => {
    
    const [formData, setFormData] = useState({
        productname: '',
        description: '',
        quantity: ''
      });

      useEffect(() => {
        if(!submitted && !isEdit){
            setFormData({
                productname: '',
                description: '',
                quantity: ''
              });
        }
    }, [submitted, isEdit]);


    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if(isEdit){
            updateProduct(formData);
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
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800,
          bgcolor: 'background.paper',
          border: '2px solid #007FFF',
          boxShadow: 24,
          borderRadius:5,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
      >
        <form onSubmit={handleSubmit} className="row g-3" >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {
            isEdit? 'Update Product' : 'Add Product'
          }
        </Typography>
        
        {/* 
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
        </Button> */}


  <div className="col-md-6">
    <label for="productname" className="form-label">Product Name</label>
    <input type="text" 
    className="form-control" 
    id="productname" 
    name="productname"
    value={formData.productname} 
    onChange={handleChange}
    />
  </div>
  <div className="col-md-6">
    <label for="brand" className="form-label">Brand</label>
    <input type="text" className="form-control" id="brand"/>
  </div>
  <div className="mb-3">
    <label for="description" className="form-label">Description</label>
    <textarea className="form-control" 
    id="description" 
    rows="3" 
    name='description'
    value={formData.description} 
    onChange={handleChange}
    >
    </textarea>
  </div>
  <div className="col-12">
    <label for="Price" className="form-label">Price</label>
    <input type="text" className="form-control" id="Price" placeholder="Rs 0.00"/>
  </div>
  <div className="col-md-6">
    <label for="formFile" className="form-label">Default file input example</label>
    <input className="form-control" type="file" id="formFile"/>
  </div>
  <div className="col-md-4">
    <label for="category" className="form-label">Category</label>
    <select id="category" className="form-select">
            <option value="">Select category</option>
            <option value="Laptop">Laptop</option>
            <option value="Headphone">Headphone</option>
            <option value="Mobile">Mobile</option>
            <option value="Electronics">Electronics</option>
            <option value="Toys">Toys</option>
            <option value="Fashion">Fashion</option>
    </select>
  </div>
  <div className="col-md-2">
    <label for="quantity" className="form-label">Quantity</label>
    <input type="text" 
    className="form-control" 
    id="quantity" 
    name="quantity"
    value={formData.quantity} 
    onChange={handleChange}
    />
  </div>
  {/* <div className="col-12">
    <div className="form-check">
      <input className="form-check-input" type="checkbox" id="gridCheck"/>
      <label className="form-check-label" for="gridCheck">
        Available
      </label>
    </div>
  </div> */}
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

export default ProductForm