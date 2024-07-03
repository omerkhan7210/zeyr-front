import React, {useEffect,useContext, useState } from 'react';
import ProductAddEditForm from './ProductAddEditForm/ProductAddEditForm';
import axios from 'axios';
import { AddProductAdminContext } from '../../Context/AddProductContext';
import { hostLink } from '../../Hostlink/hostlink';
import { AdminContextC } from '../../Context/AdminContext';


const EditProduct = () => {
  const{productID} = useContext(AdminContextC)
  const {setFormData} = useContext(AddProductAdminContext)

  const {handleSubmitEdit} = useContext(AddProductAdminContext)
  
const fetchProductDetails = async () => {
  try {
    const response = await axios.get(`${hostLink}/products/${productID}`);
    setFormData(response.data.product)
 
  } catch (error) {
    console.error(error);
  }
};

  useEffect(() => {
    // Fetch product details by productId
    fetchProductDetails();
  }, []);


  return (
        <ProductAddEditForm handleSubmit={handleSubmitEdit} productID={productID}  title={"Edit Product"}/>
       
  );
};

export default EditProduct;
