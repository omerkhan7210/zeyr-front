import React,{useContext, useEffect, useState} from "react";
import { CartContextC } from "../../Context/CartContext";
import { hostLink as hostlink } from "../../Hostlink/hostlink";
import { ProductFetchContext } from "../../Context/ProductFetch";
import PriceFormatter from "../../Products/PriceFormatter";

const CartItemRows = ({item})=>{

  
	const [quantity, setQuantity] = useState(item.quantity);
  const {selectedCurrencyLocale,selectedCurrencyCode} = useContext(ProductFetchContext);

  
	const handleQuantityChange = (event) => {
	  const newQuantity = parseInt(event.target.value, 10);
	  setQuantity(newQuantity);
	};
	const {decreaseQuantity,increaseQuantity,removeFromCart} = useContext(CartContextC);
  const totalPrice = <PriceFormatter price={item.quantity * item.price} locale={selectedCurrencyLocale} currencyCode={selectedCurrencyCode}/>

  const handleIncreaseQuantity = () => {
    increaseQuantity(item.id);
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      decreaseQuantity(item.id);
      setQuantity(quantity - 1);
    }
  };

    return (
      <tr
        className="cart-item"
        id="CartItem-1"
        data-product-id="40473032654913"
      >
        <td className="cart-item__media">
          <a
            href={`/products/` + item.id}
            className="cart-item__link"
            aria-hidden="true"
            tabIndex="-1"
          >
            {" "}
          </a>
          <div className="cart-item__image-container gradient global-media-settings">
            <img
              src={`${hostlink}/uploads/` + item.featuredImage}
              alt={item.name}
              className="cart-item__image"
              loading="lazy"
              width="150"
              height="201"
            />
          </div>
        </td>
        <td className="cart-item__details">
          <a
            className="cart-item__name link-styled"
            href={`/products/` + item.id}
          >
            {item.name}
          </a>
          <div className="product-option"> <PriceFormatter price={item.price} locale={selectedCurrencyLocale} currencyCode={selectedCurrencyCode}/></div>

          <dl className="cart-item__variants flex">
            {/* Display selected variations */}
            {item.selectedVariations && (
              <span>
                {item.selectedVariations.color && item.selectedVariations.color != "" ? (
                  <div className="product-option">
                    <dt hidden="">Color: </dt>
                    <dd>{item.selectedVariations.color}</dd>
                  </div>
                ) : null}
                {item.selectedVariations.size && item.selectedVariations.size != "" ? (
                  <div className="product-option">
                    <dt hidden="">Size: </dt>
                    <dd>{item.selectedVariations.size}</dd>
                  </div>
                ) : null}
              </span>
            )}
          </dl>
          <p className="product-option"></p>
          <ul
            className="discounts list-unstyled"
            role="list"
            aria-label="Discount"
          ></ul>
        </td>
        <td className="cart-item__quantity">
          <div className="cart-item__quantity-wrapper">
            <label className="visually-hidden" htmlFor="Quantity-1">
              Quantity
            </label>
            <quantity-input className="quantity">
              <button
                className="btn btn--unstyled quantity__button no-js-hidden"
                name="minus"
                type="button"
                onClick={handleDecreaseQuantity}
              >
                <span className="visually-hidden">
                  Decrease quantity for {item.name}
                </span>
                -
              </button>
              <input
                className="quantity__input"
                type="number"
                name="updates[]"
                min="0"
                id="Quantity-1"
                data-index="1"
                value={quantity}
              />
              <button
                className="btn btn--unstyled quantity__button no-js-hidden"
                name="plus"
                type="button"
                onClick={handleIncreaseQuantity}
              >
                <span className="visually-hidden">
                  Increase quantity for {item.name}
                </span>
                +
              </button>
            </quantity-input>

            <a
              id="Remove-1"
              className="button button--tertiary"
              style={{ cursor: "pointer" }}
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </a>
          </div>
          <div className="cart-item__error" id="Line-item-error-1" role="alert">
            <small className="cart-item__error-text"></small>
            <svg
              aria-hidden="true"
              focusable="false"
              role="presentation"
              className="icon icon-error"
              viewBox="0 0 13 13"
            >
              <circle
                cx="6.5"
                cy="6.50049"
                r="5.5"
                stroke="white"
                strokeWidth="2"
              ></circle>
              <circle
                cx="6.5"
                cy="6.5"
                r="5.5"
                fill="#EB001B"
                stroke="#EB001B"
                strokeWidth="0.7"
              ></circle>
              <path
                d="M5.87413 3.52832L5.97439 7.57216H7.02713L7.12739 3.52832H5.87413ZM6.50076 9.66091C6.88091 9.66091 7.18169 9.37267 7.18169 9.00504C7.18169 8.63742 6.88091 8.34917 6.50076 8.34917C6.12061 8.34917 5.81982 8.63742 5.81982 9.00504C5.81982 9.37267 6.12061 9.66091 6.50076 9.66091Z"
                fill="white"
              ></path>
              <path
                d="M5.87413 3.17832H5.51535L5.52424 3.537L5.6245 7.58083L5.63296 7.92216H5.97439H7.02713H7.36856L7.37702 7.58083L7.47728 3.537L7.48617 3.17832H7.12739H5.87413ZM6.50076 10.0109C7.06121 10.0109 7.5317 9.57872 7.5317 9.00504C7.5317 8.43137 7.06121 7.99918 6.50076 7.99918C5.94031 7.99918 5.46982 8.43137 5.46982 9.00504C5.46982 9.57872 5.94031 10.0109 6.50076 10.0109Z"
                fill="white"
                stroke="#EB001B"
                strokeWidth="0.7"
              ></path>
            </svg>
          </div>
        </td>
        <td className="cart-item__totals right small-hide">
          <div className="loading-overlay hidden">
            <div className="loading-overlay__spinner">
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
                  strokeWidth="6"
                  cx="33"
                  cy="33"
                  r="30"
                ></circle>
              </svg>
            </div>
          </div>
          <div className="cart-item__price-wrapper">
            <span className="price price--end">{totalPrice}</span>
          </div>
        </td>
      </tr>
    );
}

export default CartItemRows;