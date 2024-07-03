import React, { useState, useEffect, useContext, createContext } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import ProductImages from "./ProductImages/ProductImages";
import { hostLink as hostlink } from "../../Hostlink/hostlink";
import { SizeDrawer } from "./Drawers/SizeDrawer";
import { VariantsDrawer } from "./Drawers/VariantsDrawer";
import { ShippingDrawer } from "./Drawers/ShippingDrawer";
import { Link } from "react-router-dom";
import { StickyHeaderProduct } from "./StickyHeaderProduct";
import AddtoWishlistButton from "../../Wishlist/AddtoWishlistButton";
import { ProductRecommendations } from '../ProductRecommendations';
import {RecentlyViewed} from '../RecentlyViewedProducts/RecentlyViewed'
import { MobileImages } from './ProductImages/MobileImages';
import { MobileProductSlider } from './MobileProductSlider';
import PriceFormatter from '../PriceFormatter';
import { ProductFetchContext } from '../../Context/ProductFetch';
import { ProductZoomCarousel } from './Drawers/ProductZoomCarousel';
import { NotifyModal } from './Drawers/NotifyModal';

export const ProductDetailsContext = createContext();

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isShippingDrawerOpen, setIsShippingDrawerOpen] = useState(false);
  const [isSizeGuideDrawerOpen, setIsSizeGuideDrawerOpen] = useState(false);
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false);
  const [imagesArray,setImagesArray] = useState([])
const {selectedCurrencyLocale,selectedCurrencyCode} = useContext(ProductFetchContext);
  const stickyDiv = document.querySelector(".sticky-atc");
  const triggerButton = document.querySelector(
    ".product__info-select-size-trigger"
  );
  const [active,setActive] = useState(false)

  window.addEventListener("scroll", () => {
    if (triggerButton) {
      const triggerButtonRect = triggerButton.getBoundingClientRect();

      if (!isNavDrawerOpen) {
        if (window.scrollY >= triggerButtonRect.top) {
          stickyDiv.classList.add("active");
        } else {
          stickyDiv.classList.remove("active");
        }
      }
    }
  });

  const handleNavbar = (button) => {
    if (button == "shipping") {
      setIsShippingDrawerOpen(!isShippingDrawerOpen);
    } else if (button == "sizeGuide") {
      setIsSizeGuideDrawerOpen(!isSizeGuideDrawerOpen);
    } else if (button == "nav") {
      setIsNavDrawerOpen(!isNavDrawerOpen);

      stickyDiv.classList.remove("active");
    }
  };

  useEffect(()=>{

    // Fetch product details for the specific productId
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`${hostlink}/products/${productId}`);
         setProduct(response.data.product);
         
         const pimages = JSON.parse(response.data.product.productImages)
          const productImagesArray = [response.data.product.featuredImage, ...pimages];
         setImagesArray(productImagesArray)
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
   
    fetchProductDetails();
  }, [hostlink, productId]);
  if (!product) {
    return  <p className='cart-sidebar-loading'> <img src='/images/loadingGIF.gif'  width={"30px"}/></p>;
  }


  return (
    <>
      <ProductDetailsContext.Provider
        value={{ product, hostlink, handleNavbar }}
      >
        <main
          id="MainContent"
          className="content-for-layout product-page-images"
          role="main"
          tabIndex={-1}
        >
          <div
            id="shopify-section-template--14940997058625__shogun-above"
            className="shopify-section"
          />
          <section
            id="shopify-section-template--14940997058625__main"
            className="shopify-section section has-image"
          >
            <section
              id="MainProduct-template--14940997058625__main"
              className="product-wrapper no-scrollbar flex flex--mobile is-stacked"
              data-section="template--14940997058625__main"
            >
              <div
                className="product__media flex--one-half"
                style={{ zIndex: "0" }}
              >
                <ProductImages imagesArray={imagesArray} setActive={setActive}/>
              </div>
              <div className="product__info-container no-scrollbar container flex--one-half product-item--sticky">
                <div
                  id="ProductInfo-template--14940997058625__main"
                  className="product__info"
                >
                  <div className="sticky-scroll-here" />
                  <div className="product__block-container product__block-no-padding">
                    <div className="product__info-subdetails flex flex--column jcc aic body-1">
                      {product.isOnSale && product.salePrice > 0 ?
                    <div className="sale" style={{marginBottom:'1rem'}}>
                      <div className="left">{ ((product.price-product.salePrice)/product.price)*100}% OFF</div>
                    </div>
                    : null
                      }
                      <h1 className="product__title h5">{product.name}</h1>
                      <div className="product__info-subdetails-price-color flex jcc aic">
                        <div
                          id="price-template--14940997058625__main"
                          className="price flex aic flex--wrap flex--gap"
                          role="status"
                          style={{ flexGap: "0 0.5rem" }}
                        >
                          
                          <span
                            className={`price-item price-item--regular ${product.isOnSale && product.salePrice > 0 && "linethroughprice"}`}
                            aria-label="Regular price"
                          >
                            
                            <PriceFormatter price={product.price} locale={selectedCurrencyLocale} currencyCode={selectedCurrencyCode}/>
                          </span>
                          {product.isOnSale && product.salePrice > 0 && 
                            <span
                            className="price-item price-item--regular"
                            aria-label="Regular price"
                            style={{marginLeft:'1rem'}}
                          >
                            <PriceFormatter price={product.salePrice} locale={selectedCurrencyLocale} currencyCode={selectedCurrencyCode}/>
                          </span>
                          }
                          <div className="price__unit-price">
                            <small hidden aria-hidden="true">
                              <span className="visually-hidden">
                                Unit price
                              </span>
                              <span>
                                <span />
                                <span aria-hidden="true">/</span>
                                <span className="visually-hidden">
                                  &nbsp;per&nbsp;
                                </span>
                                <span> </span>
                              </span>
                            </small>
                          </div>
                        </div>
                        <span className="product__info-subdetails-color flex aic">
                          {product.shortDescription}
                        </span>
                      </div>
                      <VariantsDrawer isNavDrawerOpen={isNavDrawerOpen} />
                    </div>
                  <div className='d-mobile-slider'>
                 <MobileProductSlider imagesArray={imagesArray}/>
                 </div>
                  </div>
                  <div className="product__block-container body-1">
                    <div className="product__description" data-appmate>
                      {product.longDescription}
                      <AddtoWishlistButton product={product} />
                    </div>
                    <p>
                      <span>sku:</span>
                      <span id="VariantSku">{product.sku}</span>
                    </p>
                    <div>
                      <p>
                        <br />
                        Free Shipping & Returns <br />
                        Duties & Taxes Included
                      </p>
                    </div>
                    <ShippingDrawer
                      isShippingDrawerOpen={isShippingDrawerOpen}
                    />
                  </div>
                  <SizeDrawer isSizeGuideDrawerOpen={isSizeGuideDrawerOpen} />

                  <MobileImages imagesArray={imagesArray}/>
                </div>
              </div>
              
<NotifyModal/>
             {active &&
              <ProductZoomCarousel imagesArray={imagesArray} setActive={setActive}/>
             }
              <StickyHeaderProduct handleNavbar={handleNavbar} />
            </section>
          </section>
       
      <ProductRecommendations/>
      <RecentlyViewed/>
      <div
            id="shopify-section-template--14940997058625__338aae6b-2e2d-44ec-9f43-b0cfc3409f5b"
            className="shopify-section section section-breadcrumbs"
          >
            <nav
              className="breadcrumbs body-1"
              role="navigation"
              aria-label="breadcrumbs"
            >
              <Link
                to="/"
                className="link-styled--grey-reversed"
                title="Back to the frontpage"
              >
                Home
              </Link>
              <span aria-hidden="true">/</span>
              <span>{product.name}</span>
            </nav>
          </div>
        </main>
      </ProductDetailsContext.Provider>
    </>
  );
};

export default ProductDetailsPage;
