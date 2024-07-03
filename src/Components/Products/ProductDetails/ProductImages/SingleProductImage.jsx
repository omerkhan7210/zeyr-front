import React from "react";
import { hostLink as hostlink } from '../../../Hostlink/hostlink';
const SingleProductImage = ({ productImg, prodName, i,setActive }) => {

  return (
    <li
      data-media-position={i}
      className={`${productImg.includes('.mp4') ? "splide__slide product__media-item media-video" : "splide__slide media-ratio product__media-item"}`}
       onClick={()=> setActive(true)}
    >
      {productImg.includes('.mp4') ? 
       <video autoPlay loop playsInline>
       <source src={`${hostlink}/uploads/${productImg}`} type="video/mp4" />
     </video>
      :
      <img
        src={`${hostlink}/uploads/` + productImg}
        alt={prodName}
        width={2697}
        height="3600.0000000000005"
      />
      }

    </li>
  );
};
export default SingleProductImage;