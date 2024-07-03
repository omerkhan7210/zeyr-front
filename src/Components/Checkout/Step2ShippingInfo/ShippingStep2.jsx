import React, { useState, useEffect, useContext } from "react";
import { tokenContextC } from "../../Context/TokenContext";
import { hostLink as hostlink } from "../../Hostlink/hostlink";
import axios from "axios";
import { WrongAddressNotice } from "./WrongAddressNotice";
import { ShippingPricesDetails } from "./ShippingPricesDetails";
import { TopSection } from "./TopSection";
import { CartContextC } from "../../Context/CartContext";
import { CheckoutContext } from "../../Context/CheckoutBillingShippingAddressContext";
import { ProductFetchContext } from "../../Context/ProductFetch";
import { Link } from "react-router-dom";

export const ShippingStep2 = ({
  step2Complete,
}) => {

  const { 
    setFormData,
    selectedShippingMethod,
    setSelectedShippingMethod,
    totalPrice,
    totalPriceWithShipping,
    setOrderId,
    correctAddress,
    fetchAddresses,
    addresses
  } = useContext(CheckoutContext)
  const { cartItems } = useContext(CartContextC);
  const { checkoutInfoToken } = useContext(tokenContextC);
  const [changeAddress, setChangeAddress] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const {selectedCurrencyCode} = useContext(ProductFetchContext);
 

  useEffect(() => {
    if (checkoutInfoToken) {
      fetchAddresses();
    }
    if (changeAddress) {
      setFormData(addresses);
    }
   
  }, []);

  function generateOTP() {
    const charset = '0123456789'; // Characters to use for generating OTP
    let otp = '';
  
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      otp += charset[randomIndex];
    }
  
    return otp;
  }
  
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      try {
        
    // Generate OTP code (4-digit code) for the entire order
    const orderIdN = generateOTP();
    setOrderId(orderIdN)

        // Validate that the selectedShippingMethod is available
        if (!selectedShippingMethod) {
          setErrorMessage("Please select a shipping method.");
          return;
        }
    
        // Validate that the cartItems array is not empty
        if (cartItems.length === 0) {
          setErrorMessage("Cart is empty.");
          return;
        }
    
        for (const item of cartItems) {
          const orderDataItem = {
            orderid: orderIdN,
            email: addresses[0].email,
            shippingMethodId: selectedShippingMethod.id,
            totalPrice: totalPrice,
            totalPriceWithShipping: totalPriceWithShipping,
            cart_items_id: item.id ? item.id : item.membership_id,
            currency_code: selectedCurrencyCode
          };
           
          // Make a POST request to create the order for the current item
          const response = await axios.post(`${hostlink}/create-order`, orderDataItem);
     
             if (response.data.formattedOrderId) {
              // Clear the token from the cookie
              document.cookie =
                "CheckoutInfoToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              document.cookie = `CheckoutShippingToken=${response.data.token}; path=/`;
              window.location.href = "/checkout";
            }
        }
    
      } catch (error) {
        setErrorMessage(error.message);
        console.error("Error creating order:", error);
      }
    };

    const GetBack = () => {
      setChangeAddress(true);
  
      document.cookie =
        "CheckoutInfoToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  
      window.location.href = "/checkout";
    };
  
 

  return addresses.length > 0 ? (
    <div className="step display-table">
      <form
        className="edit_checkout"
        acceptCharset="UTF-8"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="step__sections">
          <TopSection
            addresses={addresses}
            step2Complete={step2Complete}
            setChangeAddress={setChangeAddress}
          />

          {!correctAddress ? (
            <WrongAddressNotice />
          ) : (
            <ShippingPricesDetails
              setSelectedShippingMethod={setSelectedShippingMethod}
              setErrorMessage={setErrorMessage}
            />
          )}
        </div>
        {errorMessage && (
          <p style={{ marginTop: "1rem", color: "red" }}>{errorMessage.data}</p>
        )}
        <div className="step__footer">
          <button
            name="button"
            type="submit"
            id="continue_button"
            className="step__footer__continue-btn btn"
          >
            <span className="btn__content">Continue to payment</span>
            <svg
              className="icon-svg icon-svg--size-18 btn__spinner icon-svg--spinner-button"
              aria-hidden="true"
              focusable="false"
            >
              <use xlinkHref="#spinner-button" />
            </svg>
          </button>
          <Link
            className="step__footer__previous-link"
            onClick={GetBack}
          >
            <svg
              focusable="false"
              aria-hidden="true"
              className="icon-svg icon-svg--color-accent icon-svg--size-10 previous-link__icon"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 10 10"
            >
              <path d="M8 1L7 0 3 4 2 5l1 1 4 4 1-1-4-4" />
            </svg>
            <span className="step__footer__previous-link-content">
              Return to information
            </span>
          </Link>
        </div>
      </form>
    </div>
  ) : null;
};
