import React, { useContext, useEffect,useState } from "react";
import { CheckoutContext } from "../../Context/CheckoutBillingShippingAddressContext";
import PriceFormatter from "../../Products/PriceFormatter";
import { ProductFetchContext } from "../../Context/ProductFetch";
import axios from "axios";
import { hostLink } from "../../Hostlink/hostlink";
export const TopSection = ({
  setChangeAddress
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const {selectedCurrencyLocale,selectedCurrencyCode} = useContext(ProductFetchContext);
  const {
    addresses,
    step2Complete,
    shippingMethod,
    fetchAddressesid,
    fetchOrder,
    fetchShippingMethod,
    fetchAddresses,
  } = useContext(CheckoutContext)

  const [orderID,setOrderID] = useState()
  useEffect(() => {
    try {
      if (step2Complete) {
        const fetchData = async () => {
          setIsLoading(true); // Set loading to true when data fetching starts
  
          try {
            // Fetch the order data every time the component is mounted or refreshed
            const orderData = await fetchOrder();
            // Now, you can fetch the addresses using the 'b_address_id' from the order
            if (orderData.length > 0) {
              const shippingMethodId = orderData[0].shipping_methods_id;
              await fetchAddressesid(orderData[0].b_address_id);
              await fetchShippingMethod(shippingMethodId);
              const orderid = orderData[0].order_id;
              setOrderID(orderid)
            }
            setIsLoading(false); // Set loading to false when data fetching is completed
          } catch (error) {
            console.error(error);
            setIsLoading(false); // Set loading to false in case of an error
          }
        };
        fetchData();
      } else {
        fetchAddresses();
        setIsLoading(false); // Set loading to false when fetching addresses is completed
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false); // Set loading to false in case of an error
    }
  }, [step2Complete]);

  const handleRemoveOrder = async ()=>{
    const response = axios.delete(`${hostLink}/remove-order/${orderID}`)
    return response
  }
  
  const handleChange = async (check) => {
    setChangeAddress(true);
    // Clear the token from the cookie
    if (check === "info") {
      document.cookie =
        "CheckoutInfoToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    } else if (check === "shipping") {
      document.cookie =
        "CheckoutShippingToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";    
    } else if (check === "contact") {
      document.cookie =
        "CheckoutInfoToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "CheckoutShippingToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
    if(step2Complete){
      try{
        const message = await handleRemoveOrder()
        if(message === 'success'){
          window.location.href = "/checkout";
        }
      }catch(err){
        console.log(err)
      }
    }
    window.location.href = "/checkout";
    
  };
  return (
    <>
    {isLoading ? (
      // Display a loading indicator (e.g., a spinner)
      <div>Loading...</div>
    ) : (
    <div className="section">
      <div className="content-box">
        <div
          role="table"
          className="content-box__row content-box__row--tight-spacing-vertical"
        >
          <div role="row" className="review-block">
            <div className="review-block__inner">
              <div role="rowheader" className="review-block__label">
                Contact
              </div>
              <div role="cell" className="review-block__content">
                <bdo dir="ltr">
                  {addresses.length > 0 ? addresses[0].email : null}
                </bdo>
              </div>
            </div>
            <div role="cell" className="review-block__link">
              <a
                className="link--small"
                onClick={() => handleChange("contact")}
                style={{ cursor: "pointer" }}
              >
                <span aria-hidden="true">Change</span>
                <span className="visually-hidden">
                  Change contact information
                </span>
              </a>
            </div>
          </div>
          {addresses.length > 0 ? (
            <div role="row" className="review-block">
              <div className="review-block__inner">
                <div role="rowheader" className="review-block__label">
                  Ship to
                </div>
                <div role="cell" className="review-block__content">
                  <address className="address address--tight">
                    {addresses[0].company}, {addresses[0].addressLine1},
                    {addresses[0].addressLine2}, {addresses[0].city},
                    {addresses[0].zipCode}, {addresses[0].country}
                  </address>
                </div>
              </div>
              <div role="cell" className="review-block__link">
                <a
                  className="link--small"
                  onClick={() => handleChange("info")}
                  style={{ cursor: "pointer" }}
                >
                  <span aria-hidden="true">Change</span>
                  <span className="visually-hidden">
                    Change shipping address
                  </span>
                </a>
              </div>
            </div>
          ) : null}

          {step2Complete && (
            <div role="row" class="review-block">
              <div class="review-block__inner">
                <div role="rowheader" class="review-block__label">
                  Shipping method
                </div>
                <div
                  role="cell"
                  class="review-block__content"
                  data-review-section="shipping-cost"
                >
                  {shippingMethod && shippingMethod.length > 0
                    ? shippingMethod[0].name +
                      " " +
                      shippingMethod[0].description
                    : null
                    } 
                 
                </div>
              </div>
              <div role="cell" class="review-block__link">
                <a
                  onClick={() => handleChange("shipping",)}
                  style={{ cursor: "pointer" }}
                >
                  <span aria-hidden="true">Change</span>
                  <span class="visually-hidden">Change shipping method</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    )}
    </>
  );
};
