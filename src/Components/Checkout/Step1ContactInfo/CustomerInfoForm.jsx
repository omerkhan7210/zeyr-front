import React, { useContext } from "react";
import { CheckoutContext } from "../../Context/CheckoutBillingShippingAddressContext";

export const CustomerInfoForm = ({
  isTokenExpired,
  errorMessage,
  setCheckBox,
  checkBox,
}) => {

const {
  fieldsWithRedBorder,
  setFormData,
  formData
} = useContext(CheckoutContext)

  return (
    <div className="section__content">
      {errorMessage && <p style={{color:'red'}}>{errorMessage.data.message}!</p>}
      {isTokenExpired && (
        <div className="fieldset">
          <div className="field field--required">
            <div className="field__input-wrapper">
              <label
                className="field__label field__label--visible"
                htmlFor="checkout_email"
              >
                Email
              </label>
              <input
                placeholder="Email"
                className={`field__input  ${
                  fieldsWithRedBorder.includes("email") ? "red-border" : ""
                }`}
                type="email"
                name="checkout[email]"
                id="checkout_email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>
        </div>
      )}
      
      {isTokenExpired && 
      <div className="fieldset-description">
      <div className="section__content">
        <div className="checkbox-wrapper">
          <div className="checkbox__input">
            <input
              className="input-checkbox"
              type="checkbox"
              defaultChecked={checkBox}
              name="checkout[buyer_accepts_marketing]"
              id="checkout_buyer_accepts_marketing"
              onChange={() => setCheckBox(!checkBox)}
            />
          </div>
          <label
            className="checkbox__label"
            htmlFor="checkout_buyer_accepts_marketing"
          >
            Email me with news and offers
          </label>
        </div>
      </div>
    </div>
      }
      
    </div>
  );
};
