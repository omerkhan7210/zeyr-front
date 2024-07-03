import React,{useContext, useState} from 'react'
import { hostLink } from '../../../Hostlink/hostlink';
import { ProductDetailsContext } from "../ProductDetailPage";

export const MobileImages = ({imagesArray}) => {
    const { product } = useContext(ProductDetailsContext);

    const prodName = product.name;
  
  return (
    <div className="product-thumbnails-mobile">
  <ul className="product-thumbnails-mobile__inner list-unstyled flex">
  {imagesArray && imagesArray.length > 0 ? (
              imagesArray.map(
                (
                  productImg,
                  index // Added "index" to the map function
                ) => (
                    <li  key={index} className="product-thumbnails-mobile__item product__media-item">
                    <img loading="lazy" src={`${hostLink}/uploads/` + productImg} alt={prodName} width={1440} height={1920.0} style={{imageFocal: 'middle'}} />
                </li>
                 
                )
              )
            ) : (
                <li  className="product-thumbnails-mobile__item product__media-item">
                <img loading="lazy"  src={`${hostLink}/uploads/` + product.featuredImage} alt={prodName} width={1440} height={1920.0} style={{imageFocal: 'middle'}} />
            </li>
             
            )}
   
      </ul>
</div>

  )
}
