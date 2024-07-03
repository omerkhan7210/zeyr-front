import React,{useContext} from "react";
import { hostLink } from "../Hostlink/hostlink";
import AddtoWishlistButton from '../Wishlist/AddtoWishlistButton'
import { ProductFetchContext } from "../Context/ProductFetch";
import PriceFormatter from "../Products/PriceFormatter";

export const ProductCard = ({item}) => {
 
  const productImagesArray = JSON.parse(item.productImages);
  const {selectedCurrencyLocale,selectedCurrencyCode} = useContext(ProductFetchContext);


  return (
    <div id={6974809473089} className="product-card pcslider">
      <div
        className="product-card__media container media media-ratio"
        style={{ "--media-ratio": "133.48164627363738%" }}
      >
        <a
          href={`/products/${item.slug}`}
          title={item.name}
          tabIndex={-1}
        >
          <div className="media--primary">
            <img
              loading="lazy"
              src={`${hostLink}/uploads/${item.featuredImage}`}
              alt={item.name}
              width={2697}
              height="3600.0000000000005"
            />
          </div>
          {!productImagesArray[0].includes('.mp4')  && productImagesArray && productImagesArray.length > 0 &&
              <div className="media--rollover visually-hidden">
                <img
                  loading="lazy"
                  src={`${hostLink}/uploads/` + productImagesArray[0]}
                  alt={item.name}
                  width="2160"
                  height="2880.0"
                />
              </div>
              }
        </a>
      </div>
      <div className="product-info__floating content--floating content--full-width">
        <div className="product-card__info flex jcb flex--mobile flex--column">
          
        {item.name}
          <div />
          <div className="price-rating__wrapper body-1">
            <div
              id="price-template--14963723796545__10a006d5-a823-42fb-92bb-5d9eaa3b6fa0"
              className="price flex aic flex--wrap flex--gap"
              role="status"
              style={{ gap: "0 .5rem" }}
            >
              <span
                className="price-item price-item--regular"
                aria-label="Regular price"
              >
              <PriceFormatter price={item.price} locale={selectedCurrencyLocale} currencyCode={selectedCurrencyCode}/>

              </span>
              
            </div>
          </div>
        </div>
        <div className="product-card__info product-card--floating" id={item.id}>
          <div
            className="product-form__error-message-wrapper"
            role="alert"
            hidden
          >
            <span className="product-form__error-message" />
          </div>
          <form
            method="post"
            id="product-form-template--14963723796545__10a006d5-a823-42fb-92bb-5d9eaa3b6fa0"
            acceptCharset="UTF-8"
            className="form"
            
          >
          
            <div className="loading-overlay__spinner" hidden>
              <svg
                aria-hidden="true"
                focusable="false"
                role="presentation"
                className="spinner"
                viewBox="0 0 66 66"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  className="path"
                  fill="none"
                  strokeWidth={6}
                  cx={33}
                  cy={33}
                  r={30}
                />
              </svg>
            </div>
            <button
              type="submit"
              name="add"
              className="product-form__submit btn btn--primary content--full-width"
              hidden
              aria-haspopup="dialog"
              tabIndex={-1}
            >
              <span>Add to bag</span>
            </button>
          </form>
        </div>
      <AddtoWishlistButton product={item}/>
      </div>
    </div>
  );
};
