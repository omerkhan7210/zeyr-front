import React, { useContext, useEffect, useState } from "react";
import { PaymentSectionBillingAddress } from "./PaymentSectionBillingAddress";
import { TopSection } from "../Step2ShippingInfo/TopSection";
import { hostLink } from "../../Hostlink/hostlink";
import axios from "axios";
import { CheckoutContext } from "../../Context/CheckoutBillingShippingAddressContext";
import { CartContextC } from "../../Context/CartContext";
import { tokenContextC } from "../../Context/TokenContext";


export const Main = () => {
  const [changeAddress, setChangeAddress] = useState(false);
const {fetchOrder,orderId,addresses} = useContext(CheckoutContext)
const {userUUID} = useContext(CartContextC)
const {isTokenExpired} = useContext(tokenContextC)
const [order,setOrder] = useState([])
const [paymentMethod,setPaymentMethod] = useState('COD')
  const GetBack = () => {
    setChangeAddress(true);

    document.cookie =
      "CheckoutShippingToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    window.location.href = "/checkout";
  };

  useEffect(()=>{
    const fetchData = async ()=>{

      const o = await fetchOrder();
      setOrder(o);
    }
    fetchData()
  },[orderId])
  
// Function to format the order ID with leading zeros
function formatOrderId(orderId, length) {
  const orderIdString = orderId.toString();
  const zerosToAdd = length - orderIdString.length;
  if (zerosToAdd <= 0) {
    return orderIdString; // No padding needed
  }
  const paddedOrderId = '0'.repeat(zerosToAdd) + orderIdString;
  return `#${paddedOrderId}`;
}
  
const handleSubmit = async (e) => {
  e.preventDefault();
 
  try {
  // Loop through each order
  for (const orderItem of order) {
    const order_id = orderId;
    const formattedOrderId = formatOrderId(order_id, 4);
    // Send a POST request to your server's API endpoint for each order
    const response = await axios.post(`${hostLink}/complete-order`, { formattedOrderId, order: orderItem, userUUID,paymentMethod,orderId });
    // Handle the response from the server
   
    if (response.status === 200) {
               if(!isTokenExpired){
                document.cookie = "CheckoutInfoToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                  document.cookie = "CheckoutShippingToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
                  window.location.href = "/my-zf"
                }
                  document.cookie = "CheckoutInfoToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                  document.cookie = "CheckoutShippingToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
                  document.cookie = `token=${response.data.token}; path=/`;
                  window.location.href = "/my-zf"
           }
    }
   
  } catch (error) {
    console.error(error)
    }
};


  return (
    <>
      <TopSection
        setChangeAddress={setChangeAddress}
      />
      <form
        className="edit_checkout animate-floating-labels display-table"
        acceptCharset="UTF-8"
        onSubmit={handleSubmit}
      >
        <div className="section section--payment-method" style={{marginTop:'2rem'}}>
          <div className="section__header">
            <h2 className="section__title" id="main-header" tabIndex={-1}>
              Payment method
            </h2>
            {/* <p className="section__text">
              All transactions are secure and encrypted.
            </p> */}
          </div>
          <div className="section__content">
            <div
              className="hidden notice notice--error default-background"
              id="card-fields__processing-error"
              role="alert"
            >
              <svg
                className="icon-svg icon-svg--size-24 notice__icon"
                
              >
                <use xlinkHref="#error" />
              </svg>
              <div className="notice__content">
                <p className="notice__text">
                  There was a problem processing the payment. Try refreshing
                  this page or check your internet connection.
                </p>
              </div>
            </div>
            <div data-payment-subform="required">
              <fieldset className="content-box">
                <legend style={{color:'black'}}>
                  Cash On Delivery
                </legend>

                <div className="card-fields-styling-options" />
               
              </fieldset>
            </div>
          </div>
        </div>
        <PaymentSectionBillingAddress />
        <div className="step__footer">
        <button
            name="button"
            type="submit"
            id="continue_button"
            className="step__footer__continue-btn btn"
          >
            <span className="btn__content">Pay Now</span>
            <svg
              className="icon-svg icon-svg--size-18 btn__spinner icon-svg--spinner-button"
              aria-hidden="true"
              focusable="false"
            >
              <use xlinkHref="#spinner-button" />
            </svg>
          </button>
          <a href='#' className="step__footer__previous-link" onClick={GetBack}>
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
              Return to shipping
            </span>
          </a>
        </div>
      </form>
    </>
  );
};
