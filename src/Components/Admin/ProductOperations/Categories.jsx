// File: Categories.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CategoriesContextC } from '../../Context/CategoriesContext';
import { hostLink as hostlink } from '../../Hostlink/hostlink';

const Categories = () => {
  const [newCategory, setNewCategory] = useState('');
  const [parentCategory, setParentCategory] = useState(null);
  const { categories, setCategories, renderCategories } = useContext(CategoriesContextC);
  const [thumb,setThumb] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {

      // Convert the thumbnail images array to a FormData object to handle file upload
      if(thumb){

        const formDataWithFiles = new FormData();
        formDataWithFiles.append('thumb',thumb);
      }
  
      const response = await axios.post(`${hostlink}/categories`, {
        name: newCategory,
        parentId: parentCategory,
      });
      // Clear the input field and update the categories list
      setNewCategory('');
      setParentCategory(null);
      setCategories([...categories, response.data]);
      setThumb(null)
      const productId = response.data._id;
      if(response.data.message === "Success"){
        const response2 = await axios.post(`${hostlink}/upload-images/${productId}`, formDataWithFiles);
        console.log(response2.data)
      }
    } catch (error) {
    }
  };


  const renderParentCategoryOptions = (categories) => (
    <select
      value={parentCategory || ''}
      onChange={(e) => setParentCategory(e.target.value)}
      className='input-text w100'
    >
      <option value=''>Select Parent Category (Optional)</option>
      {categories.map((category) => (
        <option key={category._id} value={category._id}>
          {category.name}
        </option>
      ))}
    </select>
  );

        
  const handleFileChange = (e) => {
    const files = e.target.files;
      setThumb(files[0]);
  };
  
      // Function to handle image removal
const handleFeaturedImageRemove = () => {
  setThumb(null);
};

  return (
    <div className='d-flex flex-c justify-center align-center w75 mauto'>

      <div className='d-flex' style={{ width: '100%' }}>
        <form onSubmit={handleSubmit} className='d-flex flex-c justify-center align-center catform'>

          <h1 className="app-content-headerText" style={{ marginBottom: '2rem' }}>Add New Categories</h1>
          <div className="input-wrapper" style={{ width: '100%' }}>
            <input type='text'
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder='Enter a new category'
              required />
          </div>
        


          {categories.length > 0 ? (
            <p className='input-row w100'>{renderParentCategoryOptions(categories)}</p>
          ) : null}


<div className="input-wrapper" style={{ width: '100%',border:'none' }}>
          <input
                  id="file"
                    type='file'
                    name='featuredImage'
                    className='d-none'
                    accept='image/*'
                    onChange={handleFileChange}
                    style={{width:'100%'}}
                   
                  />
                  <label htmlFor="file" className="btn-1" style={{width:'100%'}}>Upload Thumbnail</label>
                 
          </div>

          {thumb && (
              <>
                    <div  className='d-flex flex-c mb2  position-r'>
                     
                    <img src={URL.createObjectURL(thumb)} alt='Featured' className='thumb-img-admin ' />
                    <button className=' position-a' style={{background:'transparent',border:'none',cursor:'pointer',left:'100%'}} onClick={handleFeaturedImageRemove}>x</button>

                    </div>
                    </>
                  )}
          <button type='submit' className="product-form__submit btn btn--primary ">
            Add Category
          </button>
        </form>
        {categories.length > 0 ? (
          <div className='catleft'>


            {renderCategories()}
          </div>
        ) : (
          <p style={{ textAlign: 'center' }}>No Categories Available</p>
        )}
      </div>

    </div>
  );
};

export default Categories;
