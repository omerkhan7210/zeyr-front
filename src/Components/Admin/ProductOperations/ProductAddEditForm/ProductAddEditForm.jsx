import React,{useContext, useEffect, useState} from "react";
import ProductVariationsAttributes from "./ProductVariationsAttributes";
import { AddProductAdminContext } from "../../../Context/AddProductContext";
import { CategoriesContextC } from "../../../Context/CategoriesContext";
import { hostLink } from "../../../Hostlink/hostlink";

const ProductAddEditForm = ({handleSubmit,title,productID})=>{

    const {handleFileChange,
      handleImageRemove,setFormData,
      formData,errorMessage,successMessage
      ,handleFeaturedImageRemove} = useContext(AddProductAdminContext)
    const {renderCategoriesCheckboxes,categories} = useContext(CategoriesContextC) ;

    useEffect(() => {
      if (formData && formData.productImages) {
        // Parse the string into a JavaScript array
        setFormData({
          ...formData,
          thumbnailImages: JSON.parse(formData.productImages)
        });
      }
    }, [formData.productImages]);

    console.log(formData)


    return (
      <div className="d-flex justify-center flex-c align-center add-edit-product">
      <h3>{title ? title : "Add New Product"}</h3>
        <form onSubmit={(e) => {
          productID ?
          handleSubmit(e, productID)
          :
          handleSubmit(e)
          }} 
          encType='multipart/form-data' 
          className="d-flex border1 add-product-form"
          >
          
          <div className="form-container-left d-flex justify-center flex-c align-center add-product-left">
          
            <p className='input-row w100 input-wrapper'>
          <input
              type='text'
              placeholder='Product Name'
              defaultValue={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input-text w100" required
            />
            </p>

            <p className='input-row w100 input-wrapper'>
            <input
              type='number'
              placeholder='Enter Price'
              defaultValue={ formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="input-text w100" required
            />
            
            </p>
            {formData.isOnSale ?
            <p className='input-row w100 input-wrapper'>
            <input
              type='number'
              placeholder='Enter Sale Price'
              defaultValue={ formData.salePrice === 0 ?  null : formData.salePrice}
              onChange={(e) => setFormData({ ...formData, salePrice: e.target.value })}
              className="input-text w100"
              required
            />
            </p>
            :null}
            <p className='input-row w100 input-wrapper'>
              <input
                type='text'
                placeholder='SKU Number'
                defaultValue={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                className="input-text w100" required
              />
            </p>
            <p className='input-row w100'>
            <textarea
              placeholder='Short Description'
              defaultValue={ formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              className="input-text w100" required
            />
            </p>

            <p className='input-row w100'>
            <textarea
              placeholder='Long Description'
              defaultValue={ formData.longDescription}
              onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
              className="input-text w100" required
            />
            </p>
            
          
            <ProductVariationsAttributes/>

          
           
            <div className='product-img-container-admin d-flex justify-evenly w100 g2 mb2'>
            { !formData.featuredImage &&
              <div className='featured-img-container d-flex flex-c  justify-center align-center'>
                  <input
                  id="file"
                    type='file'
                    name='featuredImage'
                    className='d-none'
                    accept='image/*'
                    onChange={handleFileChange}
                  />
                  <label htmlFor="file" className="btn-1">Upload Featured Image</label>
                 
              </div>
            }
    
            {formData.thumbnailImages && !formData.thumbnailImages.length>0 &&
             <div className='featured-img-container d-flex flex-c justify-center align-center'>
                  
             <input
             type="file"
               id='file2'
               name='thumbnailImages'
               className='d-none'
               accept='image/*'
               multiple
               onChange={handleFileChange}
             />
             <label htmlFor="file2" className="btn-1">Upload Thumbnails</label>
            
         </div>
            }
             
            </div>
            <button type="submit" className='btn btn--primary mb1'>
          {/* {loading ? 'Loading...' : 'Add Product'} */}
          {title ? title : "Add Product"}
        </button>
        
          
        {errorMessage && <p>{errorMessage}</p>}
        {successMessage && <p>{successMessage}</p>}
          </div>

          <div className="form-container-right d-flex flex-c align-start g2 pi2 add-product-right" style={{height:'100%'}}>
            <div className="d-flex g2 align-start flex-c">
              <div className='d-flex label-container  justify-center g1 flex-c align-start'>
              
                <label className="form-control">
                  <input
                    type='checkbox'
                    defaultChecked={ formData.isOnSale}
                    onChange={(e) => setFormData({ ...formData, isOnSale: e.target.checked })}
                  />
                  On Sale
                </label>
                <label className="form-control">
                  <input
                    type='checkbox'
                    defaultChecked={ formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  />
                  Featured
                </label>
        
              </div>
              <div className='d-flex label-container justify-center g1 flex-c align-start'>
          
            <label>
              <input
                type="radio"
                value="default"
                checked={ formData.status === 'default' }
                onChange={(e) => setFormData({ ...formData, status: e.target.value })} 
              />
              Draft
            </label>

            <label>
              <input
                type="radio"
                value="published"
                checked={ formData.status === 'published' }
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              />
              Published
            </label>
              </div>
            </div>
            <div className="d-flex align-start flex-c">
              <h5 style={{margin:'0'}}>Select Categories</h5>
             
              {categories.length > 0 && renderCategoriesCheckboxes(categories,formData.categories)}
              
            </div>
            {formData.featuredImage && (
  <>
    <h6 style={{ margin: '0' }}>Featured Image</h6>
    <div className='d-flex flex-c position-r'>
      {formData.featuredImage instanceof File ? 
          <img
            src={URL.createObjectURL(formData.featuredImage)}
            alt='Featured'
            className='featured-img-admin mw100'
          />
          :
          <img
          src={`${hostLink}/uploads/${formData.featuredImage}`}
          alt='Featured'
          className='featured-img-admin mw100'
        />
      }
          <button
            className='btn btn--primary position-a'
            style={{ background: 'red', left: '100%' }}
            onClick={handleFeaturedImageRemove}
          >
            x
          </button>
      
    </div>
  </>
)}

              
<div className='thumbnail-img-container'>
  {formData.thumbnailImages && formData.thumbnailImages.length > 0 && (
    <>
      <h6 style={{ margin: '0' }}>Thumbnails</h6>
      <div className='position-r d-flex'>
        {formData.thumbnailImages.map((item, index) => (
          <div key={index} className="border1 p1">
            <button className='btn' style={{ background: 'transparent', border: 'none', left: '10%' }} onClick={() => handleImageRemove(index)}>x</button>
            {(item instanceof File && item.type.startsWith('video/')) || item.includes('mp4') ? (
              // If it's a video file, render a video tag
              <video controls className='thumbnail-video-admin '>
                <source src={item instanceof File ? URL.createObjectURL(item) : `${hostLink}/uploads/${item}`} alt={`Thumbnail ${index + 1}`} type={item.type} />
                Your browser does not support the video tag.
              </video>
            ) : (
              // If it's an image file, render an image tag
              <img src={item instanceof File ? URL.createObjectURL(item) : `${hostLink}/uploads/${item}`} alt={`Thumbnail ${index + 1}`} className='thumbnail-img-admin ' />
            )}
          </div>
        ))}
      </div>
    </>
  )}
</div>

          </div>

          
        </form>
        </div>
    )
}

export default ProductAddEditForm;