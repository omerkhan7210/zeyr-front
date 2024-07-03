import React,{useContext} from "react";
import { hostLink } from "../../Hostlink/hostlink";
import { ProductFetchContext } from "../../Context/ProductFetch";
import PriceFormatter from "../../Products/PriceFormatter";

export const CheckoutOrders = ({ item }) => {
  const {selectedCurrencyLocale,selectedCurrencyCode} = useContext(ProductFetchContext);

  return (
    <tr
      className="product"
    >
      <td className="product__image">
        <div className="product-thumbnail ">
          <div className="product-thumbnail__wrapper">
          {item.selectedVariations.attributeimg ?
         <img
         className="cart-item__image"
         src={`${hostLink}/uploads/` + item.selectedVariations.attributeimg }
         alt={item.name}
         height="201"
         width="150"
         loading="lazy"
       /> 
         :
         <img
          className="cart-item__image"
          src={item.featuredImage ? `${hostLink}/uploads/` + item.featuredImage : `${hostLink}/uploads/placeholder.jpg`}
          alt={item.name}
          height="201"
          width="150"
          loading="lazy"
        />
         }
          </div>
          <span className="product-thumbnail__quantity" aria-hidden="true">
            {item.quantity}
          </span>
        </div>
      </td>
      <th className="product__description" scope="row">
        <span className="product__description__name order-summary__emphasis">
          {item.name}
        </span>
        {item.selectedVariations && (
          <span className="product__description__variant order-summary__small-text">
            {item.selectedVariations.color && item.selectedVariations.color}<br/>
            {item.selectedVariations.size && item.selectedVariations.size}
          </span>
        )}
      </th>
      <td className="product__price">
        <span className="order-summary__emphasis skeleton-while-loading">
        <PriceFormatter price={item.price} locale={selectedCurrencyLocale} currencyCode={selectedCurrencyCode}/>

        </span>
      </td>
    </tr>
  );
};
