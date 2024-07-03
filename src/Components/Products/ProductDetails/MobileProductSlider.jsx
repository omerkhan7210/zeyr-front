import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { hostLink } from '../../Hostlink/hostlink';
export const MobileProductSlider = ({productImagesArray}) => {

    const responsive = {
      superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3,
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
      },
    };
   return (
        <Carousel
          draggable={true}
          swipeable={true}
          responsive={responsive}
          autoPlay={true}
          autoPlaySpeed={10000}
          keyBoardControl={true}
          arrows={false}
          infinite={true}
        >
          {productImagesArray ? (  productImagesArray.length > 0 ? (
          productImagesArray.map((item,index) => (
      
            <img  src={`${hostLink}/uploads/${item}`}  />
          ))
          ): null ): <p>Loading products...</p>}
        </Carousel>
      );
}
