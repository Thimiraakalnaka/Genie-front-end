import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import {Button, Typography } from '@mui/material';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import ProductForm from '../Component/ProductForm';
import ProductsTable from '../Component/ProductsTable';

const Products = () => {
    const [products, setProducts]= useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedProducts, setSelectedProducts]= useState([]);
  
  useEffect(() =>{
    getUsers();
  },[]);

  const getUsers = () =>{
    Axios.get('http://localhost:8080/api/v1/getproduct')
    .then(response => {
      setProducts(response.data);
    })
    .catch(error => {
      console.error("Axios Error :", error);
    });
  }

  const addProduct = (data) => {
    setSubmitted(true);

    const payload ={
        productid: data.productid,
        productname: data.productname,
        description: data.description,
        quantity: data.quantity
    }

    Axios.post('http://localhost:8080/api/v1/addproduct', payload)
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
      productid: data.productid,
      productname: data.productname,
      description: data.description,
      quantity: data.quantity
    }

    Axios.put('http://localhost:8080/api/v1/updateuser', payload)
    .then(() => {
      getUsers();
      setSubmitted(false);
      handleClose();
    })
    .catch(error => {
      console.error("Axios Error :", error);
    });

  }

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setIsEdit(false);
    setSelectedProducts({});
  };

  
  return (
    <div>
        <Typography variant="h4" gutterBottom>
        Products
        <Button sx={{float:'right'}} variant="contained" endIcon={<PersonAddAltIcon />} onClick={handleOpen}> Add Product</Button>
       
      </Typography>
    <ProductsTable rows={products}  
    selectedProducts={data=>{
      setSelectedProducts(data);
      setIsEdit(true);
      handleOpen();
    }}
    
    // deleteUser={data => window.confirm('Are you sure?') && deleteUser(data)}
    />

    <ProductForm 
    open={open} 
    handleClose={handleClose} 
    addProduct={addProduct} 
    submitted={submitted} 
    data={selectedProducts} 
    isEdit={isEdit}
    updateUser={updateUser}
    />
    </div>
  )
}

export default Products