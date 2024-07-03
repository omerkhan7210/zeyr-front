import React, { useState, useEffect,useContext } from "react";
import axios from "axios";
import { hostLink } from "../../Hostlink/hostlink";
import PriceFormatter from "../../Products/PriceFormatter";
import { ProductFetchContext } from "../../Context/ProductFetch";

export const ShippingPricesDetails = ({
  setSelectedShippingMethod,
  setErrorMessage,
}) => {
  const [shippingMethods, setShippingMethods] = useState([]);

  const {selectedCurrencyLocale,selectedCurrencyCode} = useContext(ProductFetchContext);

  useEffect(() => {
    // Fetch shipping methods from the backend API
    axios
      .get(`${hostLink}/retrieve-shipping`)
      .then((response) => {
        setShippingMethods(response.data);
      })
      .catch((error) => {
        console.error("Error fetching shipping methods:", error);
      });
  }, []);

  // Function to handle the selection of a shipping method
  const handleShippingMethodSelection = (method) => {
    setSelectedShippingMethod(method);
    setErrorMessage("");
  };
  return (
    <div className="section section--shipping-method">
      <div className="section__header">
        <h2 className="section__title" id="main-header" tabIndex={-1}>
          Shipping method
        </h2>
      </div>
      <div className="section__content">
        <fieldset className="content-box" data-shipping-methods>
          <legend className="visually-hidden">Choose a shipping method</legend>
          {shippingMethods.map((method) => (
            <div className="content-box__row content-box" key={method.id}>
              <div className="radio-wrapper">
                <div className="radio__input">
                  <input
                    className="input-radio"
                    type="radio"
                    name="checkout[shipping_rate][id]"
                    id={`checkout_shipping_rate_id_${method.name.replace(
                      /\s/g,
                      ""
                    )}`}
                    onChange={() => handleShippingMethodSelection(method)}
                  />
                </div>
                <label
                  className="radio__label"
                  htmlFor={`checkout_shipping_rate_id_${method.name.replace(
                    /\s/g,
                    ""
                  )}`}
                >
                  <span className="radio__label__primary">
                    {method.name} ({method.description})
                  </span>
                  <span className="radio__label__accessory">
                    <span className="content-box__emphasis">
                      {method.price === 0 ?
                    null: 
<PriceFormatter price={method.price} locale={selectedCurrencyLocale} currencyCode={selectedCurrencyCode}/>

                    }
                      
                    </span>
                  </span>
                </label>
              </div>
            </div>
          ))}
        </fieldset>
      </div>
    </div>
  );
};
