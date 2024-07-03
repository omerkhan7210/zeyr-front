/* eslint-disable react/prop-types */
// src/App.js
import {useContext, useEffect, useState} from 'react';
import ProductItem from "./ProductsList/ProductItem";
import { ProductFetchContext } from "../Context/ProductFetch"; // Update the path accordingly
import ErrorMessage from "../ErrorBoundary/ErrorMessage";
import { Refine } from "../FilterProducts/Refine";
import { useLocation } from "react-router-dom";
import { RefineMobile } from '../FilterProducts/FilterMobile/RefineMobile';

const DisplayProducts = ({ products }) => {
  
  const location = useLocation();
  const pathname = location.pathname;
  const trimmedPathname = pathname.slice(1);
  const { loading, error, handleRetry } = useContext(ProductFetchContext);

  const [filterOptions,setFilterOptions] = useState({
    colors:[],
    sizes:[],
    availability:[]
  })
  const filterAvail = localStorage.getItem('filtersActive');
const [filtersActive,setFiltersActive] = useState(filterAvail !== 'null' ? filterAvail : null)
const [fProducts,setFProducts] = useState(null)
useEffect(()=>{
  localStorage.setItem('filtersActive',filtersActive)
},[filtersActive])

useEffect(() => {
  if (filtersActive && products) {
    let filteredProducts = [...products]
    let filteredProductsColors = []; // Start with all products
    let filteredProductsSizes = []
    let filteredProductsAvail= []
    let filteredProductsNotAvail= []
   // Filter based on sizes
    if (filterOptions.sizes.length > 0) {
      filteredProductsSizes = filteredProducts.filter((product) =>
        product.variations.some((v) =>
          v.attributeValues.some((av) => filterOptions.sizes.includes(av.attributeValue) || filterOptions.sizes.includes(av.attributeValue.toUpperCase())  )
        )
      );
    }
    
    // Filter based on colors
    if (filterOptions.colors.length > 0) {
      filteredProductsColors = filteredProducts.filter((product) =>
        product.variations.some((v) =>
        v.attributeValues.some((av)=> filterOptions.colors.includes(av.attributeValue) || filterOptions.colors.includes(av.attributeValue.toUpperCase()))
        )
      );
    }
    
// Filter based on colors
if (filterOptions.availability.length > 0) {
  filteredProductsAvail = filteredProducts.filter((product) =>
    product.variations.some((v) =>
     (filterOptions.availability.includes('instock') &&  v.attributestock > 0)
    )
  );
}

// Filter based on colors
if (filterOptions.availability.length > 0) {
  filteredProductsNotAvail = filteredProducts.filter((product) =>
    product.variations.every((v) =>
     (filterOptions.availability.includes('outstock') &&  v.attributestock === 0)
    )
  );
}

filteredProducts = [...filteredProductsColors,...filteredProductsSizes,...filteredProductsAvail,...filteredProductsNotAvail]

  
     filteredProducts = [...new Set(filteredProducts)];
     
    setFProducts(filteredProducts);
  }
}, [filtersActive, filterOptions, products]);

const [mobWidth,setMobWidth] = useState(false)

useEffect(()=>{
  if(window.innerWidth <  768){
    setMobWidth(true)
  }else{
    setMobWidth(false)
  }
},[mobWidth])


  return (
    <>
      {loading ? (
        <div className="d-flex justify-center align-center w100 pi2">
          <div className="loading-spinner">
            <img
              src="/images/loading.svg"
              alt="Loading Products PLease Wait..."
            />
          </div>
        </div>
      ) : error ? (
        <div className="network-error d-flex justify-center flex-c w25 mauto">
          {error === 500 ? <ErrorMessage /> : <p>Server Error</p>}
          <button onClick={handleRetry}>Retry</button>
        </div>
      ) : (
        <>
          <section
            id="shopify-section-template--14940996862017__banner"
            className="shopify-section section section-collection-banner has-image"
          >
  
            <div className="container flex scroll-animation animation-scale aie jcc scroll-animation--active">
              <div className="content--wrapper text-center">
                <div className="content">
                  <h1 className="h5" style={{ marginBottom: 0 }}>
                    <span className="visually-hidden">Collection: </span>
                    {trimmedPathname.includes("-")
                      ? trimmedPathname.replace(/-/g, " ").toUpperCase()
                      : trimmedPathname.toUpperCase()}
                    {}
                  </h1>
                </div>
              </div>
            </div>
          </section>

          <div
            id="shopify-section-template--14940996862017__product-grid"
            className="shopify-section section product-grid-section"
          >
            <style data-shopify="">
              {`
	.section-template--14940996862017__product-grid-padding {
      padding-top: 0px;
      padding-bottom: 27px;
      }
      .promo-banner {
      grid-column: 1/span var(--banner-width);
      }  
      @media screen and (min-width: 1024px) {
      .section-template--14940996862017__product-grid-padding {
      padding-top: 0px;
      padding-bottom: 36px;            
      }.section-template--14940996862017__product-grid-padding {
      padding-left: 20px;
      padding-right: 20px;
      }
      .breadcrumbs {
      padding: 12px 0 12px 70px;
      }}
	  `}
            </style>

            {mobWidth ?
            <RefineMobile setFilterOptions={setFilterOptions} setFiltersActive={setFiltersActive}/>
            :
            <Refine setFilterOptions={setFilterOptions} setFiltersActive={setFiltersActive}/>
            }


            <div
              className="page-width section-template--14940996862017__product-grid-padding"
              style={{ pageWidth: "100%" }}
            >
              <div data-view="4" id="ProductGridContainer">
                <div className="collection">
                  <div className="loading-overlay content--floating"></div>
                  <div
                    data-next-page="/en-pk/collections/mens-tees?page=2"
                    data-pagination-event="infinite"
                  >
                    {products.length > 0 ? (
                      <>
                        <ul
                          id="product-grid"
                          data-id="template--14940996862017__product-grid"
                          className="collection__grid list-unstyled"
                        >
                          {filtersActive &&
                          fProducts ?
                          fProducts.length > 0 ?
                          fProducts.map((product) => (
                            <ProductItem key={product.id} product={product} />
                          )) : 
                          <p>No Products Available For The Provided Filters</p>
                 
                          : 
                          products.map((product) => (
                            <ProductItem key={product.id} product={product} />
                          ))
                        }
                          
                        </ul>
                      </>
                    ) : (
                      <p>No Products</p>
                    )}
                  </div>
                </div>
                <div className="pagination pagination--load-more flex flex--column aic container">
                  <ul className="flex list-unstyled visually-hidden">
                    <li>1 - </li>
                    <li
                      id="LoadMoreCurrent"
                      data-load-more-size="16"
                      data-load-more-total-size="35"
                    >
                      35
                    </li>
                    <li className="text-uppercase"> of 35 items</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DisplayProducts;
