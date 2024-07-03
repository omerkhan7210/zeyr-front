import React,{useContext} from 'react';
import ProductAddEditForm from './ProductAddEditForm/ProductAddEditForm';
import { AddProductAdminContext } from '../../Context/AddProductContext';



const AddProduct = () => {

  const {handleSubmit} = useContext(AddProductAdminContext)

  return (
    <>
      <ProductAddEditForm handleSubmit={handleSubmit}/>
    </>
  );
};

export default AddProduct;
