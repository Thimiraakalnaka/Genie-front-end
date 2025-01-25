import React, { useEffect, useState } from 'react';
import { Box, Typography, Modal} from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';
import axiosInstance from '../axiosConfig';


const ProductForm = ({ addProduct, open, handleClose, submitted, data, isEdit, updateProduct, getProducts }) => {
    
    const [formData, setFormData] = useState({
        productname: '',
        brand:'',
        description: '',
        price:'',
        category:'',
        quantity: ''
      });

      useEffect(() => {
        if(isEdit && data){
            setFormData(data);
        }else if(!isEdit && !submitted){
          setFormData({
            productname: '',
            brand:'',
            description: '',
            price:'',
            category:'',
            quantity: ''
            });
        }
    }, [data, isEdit, submitted]);

    const [image, setImage] = useState(null);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      };

      const handleImageChange = (e) => {
        setImage(e.target.files[0]);
        // setProduct({...product, image: e.target.files[0]})
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const reader = new FileReader();
    
        reader.onload = () => {
            const productData = {
                ...formData,
                imageName: image.name,
                imageType: image.type,
                imageDate: reader.result.split(",")[1], 
            };
    
        if (isEdit) {
          axiosInstance.put("http://localhost:8080/api/v1/updateproduct", productData, {
              headers: {
                  "Content-Type": "application/json",
              },
          })
          .then((response) => {
              console.log("Product updated successfully:", response.data);
              handleClose();
              getProducts(); 
          })
          .catch((error) => {
              console.error("Error updating product:", error);
          });
      } else {
          axiosInstance.post("http://localhost:8080/api/v1/addproduct", productData, {
              headers: {
                  "Content-Type": "application/json",
              },
          })
          .then((response) => {
              console.log("Product added successfully:", response.data);
              handleClose();
              getProducts(); 
          })
          .catch((error) => {
              console.error("Error adding product:", error);
          });
      }
        };
    
        if (image) reader.readAsDataURL(image);
        else console.error("No image selected.");
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
    <input type="text" 
    className="form-control" 
    id="brand"
    name='brand'
    value={formData.brand}
    onChange={handleChange}/>
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
    <input type="text" 
    className="form-control" 
    id="price" 
    placeholder="Rs 0.00"
    name='price'
    value={formData.price}
    onChange={handleChange}/>
  </div>
  <div className="col-md-6">
    <label for="formFile" className="form-label">Default file input example</label>
    <input className="form-control" type="file" id="formFile" onChange={handleImageChange}/>
  </div>
  <div className="col-md-4">
    <label for="category" className="form-label">Category</label>
    <select id="category" className="form-select" name='category' value={formData.category} onChange={handleChange}>
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