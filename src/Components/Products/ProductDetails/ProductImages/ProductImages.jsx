import React, { useContext, useState } from "react";
import SingleProductImage from "./SingleProductImage";
import { ProductDetailsContext } from "../ProductDetailPage";

const ProductImages = ({imagesArray,setActive}) => {

  const { product } = useContext(ProductDetailsContext);

  const prodName = product.name;
  
  return (
    <>
      <link
        href="/cdn/shop/t/300/assets/slider.css"
        rel="stylesheet"
        type="text/css"
        media="all"
      />
      <div id="main-carousel" className="splide is-initialized" role="region">
        <div className="splide__track" id="main-carousel-track">
          <ul  id="main-carousel-list" className={`${ imagesArray && imagesArray.length > 2 ? 'fullheight' : ""} splide__list list-unstyled`}>
          
            {imagesArray && imagesArray.length > 0 ? (
              imagesArray.map(
                (
                  productImg,
                  index
                ) => (
        <SingleProductImage
          i={index}
          setActive={setActive}
          productImg={productImg}
          prodName={prodName}
        /> 
                )
              )
            ) : (
              <SingleProductImage
              setActive={setActive}
              productImg={product.featuredImage}
              prodName={prodName}
            /> // Added "key" prop to SingleProductImage
            )}
          </ul>
        </div>
      </div>
      <script type="text/javascript">
        {`
            var main;
            document.addEventListener("DOMContentLoaded", function () {
              main = new Splide(
                "#shopify-section-template--14940997058625__main .splide",
                {
                  pagination: true,
                  arrows: false,
                  type: "loop",
                  autoHeight: true,
                  mediaQuery: "min",
                  breakpoints: {
                    769: {
                      pagination: false,

                      destroy: true,
                    },
                  },
                }
              );

              main.on("pagination:mounted", function (data) {
                const videos = [];
                document
                  .querySelectorAll(".splide__slide.media-video")
                  .forEach((el) => {
                    if (!el.classList.contains("splide__slide--clone")) {
                      videos.push(el.dataset.mediaPosition);
                    }
                  });

                data.items.forEach(function (item, index) {
                  videos.forEach((el) => {
                    if (el == index + 1) {
                      item.button.classList.add("video");
                    }
                  });
                });
              });
              main.mount();
            });`}
      </script>
    </>
  );
};

export default ProductImages;
