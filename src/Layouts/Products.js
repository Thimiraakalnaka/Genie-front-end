import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import {Button, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ProductForm from '../Component/ProductForm';
import ProductsTable from '../Component/ProductsTable';

const Products = () => {
    const [products, setProducts]= useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedProducts, setSelectedProducts]= useState([]);
   
  
  useEffect(() =>{
    getProducts();
  },[]);

  const getProducts = async () => {
    try {
      const response = await Axios.get('http://localhost:8080/api/v1/getproduct');
      const productList = await Promise.all(
        response.data.map(async (product) => {
          if (product.imageName) {
            const imageResponse = await Axios.get(
              `http://localhost:8080/api/v1/product/${product.productid}/image`,
              { responseType: 'blob' }
            );
            product.imageUrl = URL.createObjectURL(imageResponse.data);
          }
          return product;
        })
      );
      setProducts(productList);
    } catch (error) {
      console.error('Axios Error:', error);
    }
  };

  const updateProduct = (data) => {
    setSubmitted(true);

    const payload ={
      productid: data.productid,
      productname: data.productname,
      brand:data.brand,
      description: data.description,
      price:data.price,
      category:data.category,
      quantity: data.quantity
    }

    Axios.put('http://localhost:8080/api/v1/updateproduct', payload)
    .then(() => {
      getProducts();
      setSubmitted(false);
      handleClose();
    })
    .catch(error => {
      console.error("Axios Error :", error);
    });

  }

  const deleteProduct = (data)=>{

    const payload ={
      productid: data.productid,
      productname: data.productname,
      brand:data.brand,
      description: data.description,
      price:data.price,
      category:data.category,
      quantity: data.quantity
    }
    
    Axios.delete('http://localhost:8080/api/v1/deleteproduct', {data:payload})
    .then(() => {
      getProducts();
    })
    .catch(error => {
      console.error("Axios Error deleting product:", error);
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
        <Button sx={{float:'right'}} variant="contained" endIcon={<AddCircleOutlineIcon />} onClick={handleOpen}> Add Product</Button>
       
      </Typography>
    <ProductsTable rows={products}  
      selectedProducts={(data)=>{
        setSelectedProducts(data);
        setIsEdit(true);
        handleOpen();
    }}
    
    deleteProduct={data => window.confirm('Are you sure?') && deleteProduct(data)}
    />

    <ProductForm 
    open={open} 
    handleClose={handleClose} 
    // addProduct={addProduct} 
    submitted={submitted} 
    data={selectedProducts} 
    isEdit={isEdit}
    updateProduct={updateProduct}
    getProducts={getProducts}
    />
    </div>
  )
}

export default Products