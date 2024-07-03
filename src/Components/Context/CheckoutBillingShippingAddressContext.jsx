import React, { createContext,useContext,useState,useEffect } from 'react'
import axios from 'axios';
import { hostLink } from '../Hostlink/hostlink';
import { tokenContextC } from './TokenContext';

export const CheckoutContext = createContext();

export const CheckoutBillingShippingAddressContext = ({children}) => {

    const {checkoutShippingToken,checkoutInfoToken,isCheckoutInfoTokenExpired,isCheckoutShippingTokenExpired} = useContext(tokenContextC)
    const [correctAddress, setCorrectAddress] = useState(true);
    const [selectedShippingMethod, setSelectedShippingMethod] = useState(null);
    const [showRequiredFieldPopup, setShowRequiredFieldPopup] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalPriceWithShipping, setTotalPriceWithShipping] = useState(0);
    const [orderId, setOrderId] = useState(localStorage.getItem("orderId") || 0);
    if(orderId){
      localStorage.setItem("orderId",orderId)
    }
    const [fieldsWithRedBorder, setFieldsWithRedBorder] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [step1Complete, setStep1Complete] = useState(false);
    const [step2Complete, setStep2Complete] = useState(false);
  const [shippingMethod, setShippingMethod] = useState("");
    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      company: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      country: "",
      zipCode: "",
      phone: "",
      email: "",
    });

  useEffect(() => {
  
    if (!isCheckoutInfoTokenExpired) {
      setStep1Complete(true);
    }

    if (isCheckoutInfoTokenExpired) {
      setStep1Complete(false);
    }
    if (isCheckoutShippingTokenExpired) {
      setStep2Complete(false);
    }
    if (!isCheckoutShippingTokenExpired) {
      setStep1Complete(true);
      setStep2Complete(true);
    }
  });

    async function fetchAddresses() {
        try {
          const response = await axios.get(
            `${hostLink}/retrieve-checkout-address`,
            {
              headers: {
                Authorization: `Bearer ${checkoutInfoToken}`,
              },
            }
          );
          setAddresses(response.data.addresses);
        } catch (error) {
          console.error(error);
        }
      }

      
  // Fetch the addresses for the logged-in user
  async function fetchShippingMethod(shippingMethodId) {
    try {
      const response = await axios.get(
        `${hostLink}/fetch-shipping-method/${shippingMethodId}`
      );
      setShippingMethod(response.data);
    } catch (error) {
      console.error(error);
    }
  }


      async function fetchAddressesid(bid) {
        try {
          const response = await axios.get(
            `${hostLink}/retrieve-checkout-address-bid`,
            {
              params: {
                bid: bid // Pass the 'bid' parameter using the 'params' object
              }
            }
          );
          setAddresses(response.data.addresses);
        } catch (error) {
          console.error(error);
        }
      }

  const fetchOrder = async ()=> {
    try {
      const response = await axios.get(`${hostLink}/fetch-order`, {
        headers: {
          Authorization: `Bearer ${checkoutShippingToken}`,
        },
        params: {
          orderId: orderId 
        }
      });
      return response.data.order;
    } catch (error) {
      console.error(error);
    }
  }

  

  return (
    <CheckoutContext.Provider value={{
        correctAddress,
        selectedShippingMethod,
        showRequiredFieldPopup,
        totalPrice,
        totalPriceWithShipping,
        orderId,
        formData,
        fieldsWithRedBorder,
        addresses,
        step1Complete,
        step2Complete,
        shippingMethod,
        fetchShippingMethod,
        fetchAddressesid,
        setStep1Complete,
        setStep2Complete,
        setAddresses,
        setFieldsWithRedBorder,
        fetchOrder,
        fetchAddresses,
        setCorrectAddress,
        setFormData,
        setOrderId,
        setSelectedShippingMethod,
        setShowRequiredFieldPopup,
        setTotalPriceWithShipping,
        setTotalPrice,
        orderId
        }}>
        {children}
    </CheckoutContext.Provider>
  )
}
