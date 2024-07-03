// src/components/ProductItem.js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AddtoWishlistButton from "../../Wishlist/AddtoWishlistButton";
import { hostLink as hostlink } from "../../Hostlink/hostlink";
import { ProductFetchContext } from '../../Context/ProductFetch';
import PriceFormatter from '../../Products/PriceFormatter';

const ProductItem = ({ product }) => {
  const productImagesArray = JSON.parse(product.productImages);
  const {selectedCurrencyLocale,selectedCurrencyCode} = useContext(ProductFetchContext);

  return (
    <>
      <li className="grid__item">
        <div id="6974807179329" className="product-card" data-appmate="">
          <div
            className="product-card__media container  media media-ratio"
            style={{ "--media-ratio": "133.48164627363738%" }}
          >
            <Link
              to={`/products/${product.slug}`}
              title={product.name}
            >
              <div className="media--primary">
                <picture>
                  <source
                    srcSet={`${hostlink}/uploads/${product.featuredImage}?v=1693904317&width=1024 1024w, ${hostlink}/uploads/${product.featuredImage}?v=1693904317&width=1280 1280w, ${hostlink}/uploads/${product.featuredImage}?v=1693904317&width=1440 1440w, ${hostlink}/uploads/${product.featuredImage}?v=1693904317&width=1600 1600w, ${hostlink}/uploads/${product.featuredImage}?v=1693904317&width=1980 1980w, ${hostlink}/uploads/${product.featuredImage}?v=1693904317&width=2160 2160w`}
                    sizes="100vw"
                    media="(min-width: 1025px)"
                  />

                  <source
                    srcSet={`${hostlink}/uploads/${product.featuredImage}?v=1693904317&width=750 750w, ${hostlink}/uploads/${product.featuredImage}?v=1693904317&width=992 992w`}
                    sizes="100vw"
                    media="(min-width: 767px) and (max-width: 1024px)"
                  />

                  <source
                    srcSet={`${hostlink}/uploads/${product.featuredImage}?v=1693904317&width=160 160w, ${hostlink}/uploads/${product.featuredImage}?v=1693904317&width=320 320w, ${hostlink}/uploads/${product.featuredImage}?v=1693904317&width=375 375w, ${hostlink}/uploads/${product.featuredImage}?v=1693904317&width=550 550w, ${hostlink}/uploads/${product.featuredImage}?v=1693904317&width=750 750w`}
                    sizes="100vw"
                  />

                  <img
                    loading="lazy"
                    src={`${hostlink}/uploads/${product.featuredImage}`}
                    alt="Navigate to product AMIRI PREMIER TEE - BLACK"
                    width="2697"
                    height="3600.0000000000005"
                  />
                </picture>
              </div>
              {!productImagesArray[0].includes('.mp4')  && 
              <div className="media--rollover visually-hidden">
                <img
                  loading="lazy"
                  src={`${hostlink}/uploads/` + productImagesArray[0]}
                  alt={product.name}
                  width="2160"
                  height="2880.0"
                />
              </div>
              }
            </Link>
          </div>
          <div className="product-card__info">
            <div className="flex--column flex jcb flex--mobile">
              <div>
                <div className="product-card__title">
                  <Link className="link-styled" to={`/products/${product.slug}`}>
                    {product.name}
                  </Link>
                </div>
              </div>
              <div className="price-rating__wrapper body-1">
                <div
                  id="price-"
                  className="price flex aic flex--wrap flex--gap"
                  role="status"
                  style={{ gap: "0.5rem" }}
                >
                  <span
                    className="price-item price-item--regular"
                    aria-label="Regular price"
                  >
                    <PriceFormatter price={product.price} locale={selectedCurrencyLocale} currencyCode={selectedCurrencyCode}/>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <AddtoWishlistButton product={product} />
        </div>
      </li>
    </>
  );
};

export default ProductItem;
