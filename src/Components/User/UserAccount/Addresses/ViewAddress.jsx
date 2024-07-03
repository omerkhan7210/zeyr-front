import React, { useState, useEffect, useContext } from 'react';
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import AddressForm from './AddressForm';
import { tokenContextC } from '../../../Context/TokenContext';
import { hostLink as hostlink } from '../../../Hostlink/hostlink';

const ViewAddress = () => {
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const {token,isTokenExpired} = useContext(tokenContextC);
  const [btnText,setBtnText] = useState('Add Address');
  const [loading,setLoading] = useState(false)
  const [errorMessage,setErrorMessage] = useState('')
  const [addressId,setAddressId] = useState(0);
  const history = useNavigate();


  if(isTokenExpired){
    history('/login')
  }

  const [formData, setFormData] = useState({
      firstName: '',
        lastName: '',
        company: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        country: '',
        zipCode: '',
        phone: ''
  });


  // Fetch the addresses for the logged-in user
  async function fetchAddresses() {
    try {
      const response = await axios.get(`${hostlink}/retrieve-address`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAddresses(response.data.addresses);
      
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchAddresses();
  }, []);

  
  // Handle form submission to add a new address
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await axios.post(
        `${hostlink}/address`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Update the addresses list with the newly added address
      setAddresses([...addresses, response.data.address]);
      // Clear the form data
        setLoading(false)
        setFormData({
          firstName: '',
          lastName: '',
          company: '',
          addressLine1: '',
          addressLine2: '',
          city: '',
          country: '',
          zipCode: '',
          phone: ''
        });
        setShowForm(false)
      
      
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response.data.message)
    }finally{
      setLoading(false)
    }
  };

  const handleEditButton = async (addressId)=>{
    // Find the address to be edited from the addresses list
    const addressToEdit = addresses.find((address) => address.id === addressId);
    // Populate the form data with the address details to be edited
    setFormData({
      firstName: addressToEdit.firstName,
      lastName: addressToEdit.lastName,
      company: addressToEdit.company,
      addressLine1: addressToEdit.addressLine1,
      addressLine2: addressToEdit.addressLine2,
      city: addressToEdit.city,
      country: addressToEdit.country,
      zipCode: addressToEdit.zipCode,
      phone: addressToEdit.phone,
    });
    setBtnText("Edit Address")
    // Show the form for editing the address
    setShowForm(true);
    setAddressId(addressId)
  }
  
  // Function to handle editing an address
  const handleEditAddress = async () => {

    try{
 // Send a request to delete the address from the backend
      await axios.put(`${hostlink}/address/${addressId}`,formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
      }); // Fetch updated addresses from the backend
      
    fetchAddresses();
  } catch (error) {
    console.error(error);
    setErrorMessage(error.response.data.message)
  }finally{
    setLoading(false)
  }
  };

  // Function to handle deleting an address
  const handleDeleteAddress = async (addressId) => {
    try {
      // Send a request to delete the address from the backend
      await axios.delete(`${hostlink}/address/${addressId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update the addresses list by removing the deleted address
      setAddresses(addresses.filter((address) => address._id !== addressId));
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle setting a default address
  const handleSetDefaultAddress = async (addressId) => {
    try {
      // Send a request to the backend to set the address as the default address
      await axios.put(
        `${hostlink}/address/${addressId}/set-default`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Fetch updated addresses from the backend
      fetchAddresses();
      // Find the address to be set as default from the addresses list
      const addressToSetDefault = addresses.find((address) => address.id === addressId);

      // Update the addresses list to unset default from other addresses
      setAddresses((prevAddresses) => {
        return prevAddresses.map((address) =>
          address.id === addressId
            ? { ...address, isDefault: true } // Set the selected address as default
            : { ...address, isDefault: false } // Unset default for other addresses
        );
      });

    } catch (error) {
      console.error(error);
    }
        };
      


  return (
    <main
      id="MainContent"
      className="content-for-layout"
      role="main"
      tabIndex="-1"
    >
      <div
        id="shopify-section-template--14940996698177__main"
        className="shopify-section"
      >
        <link
          href="/cdn/shop/t/300/assets/customer.css"
          rel="stylesheet"
          type="text/css"
          media="all"
        />
        <link
          href="/cdn/shop/t/300/assets/pagination.css"
          rel="stylesheet"
          type="text/css"
          media="all"
        />
        <script src="/cdn/shop/t/300/assets/customer.js" defer=""></script>
        <style data-shopify="">
          {`
        #shopify-section-template--14940996698177__main .section-padding {
         padding-top: 25px;
         padding-bottom: 25px;
         }
         @media screen and (min-width: 769px) {        
         #shopify-section-template--14940996698177__main .section-padding {
         padding-top: 50px;
         padding-bottom: 50px;
         }
         }
         `}
        </style>
        <div
          className="customer addresses section-padding page-width text-center"
          data-customer-addresses=""
        >
          <svg style={{ display: "none" }}>
            <symbol id="icon-caret" viewBox="0 0 10 6">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z"
                fill="currentColor"
              ></path>
            </symbol>
          </svg>
          <h1>Addresses</h1>
          <a href="/my-zf" className="linsk-styled" >
            Return to Account details
          </a>
          <div data-address="" style={{marginBlock:'1rem'}}>
            <button
              className="btn btn--primary"
              type="button"
              aria-controls="AddAddress"
              onClick={() => setShowForm(!showForm)}
            >
              Add a new address
            </button>
            <div id="AddAddress">
              {showForm && (
                <>
                  <h2 id="AddressNewHeading">Add a new address</h2>
                  <AddressForm
                    handleSubmit={
                      btnText === "Add Address"
                        ? handleSubmit
                        : handleEditAddress
                    }
                    formData={formData}
                    setFormData={setFormData}
                    btnText={btnText}
                    loading={loading}
                    errorMessage={errorMessage}
                    setShowForm={setShowForm}
                  />
                </>
              )}
            </div>
          </div>
          <ul role="list">
            {addresses.length > 0 ? (
              <>
                {addresses.map((address) => (
                  <>
                    <li key={address.id}>
                      {address.isDefault == "1" ? (
                        <h2>Default Address</h2>
                      ) : null}
                      <p>
                        {address.firstName} {address.lastName}
                      </p>

                      <p>{address.company}</p>
                      <p>{address.addressLine1}</p>
                      <p>{address.addressLine2}</p>
                      <p>
                        {address.country},{address.city}, {address.state}{" "}
                        {address.zipCode}
                      </p>
                      <p>{address.phone}</p>
                      <div className="flex justify-center align-center mt1">
                        <input
                          style={{ marginTop: "0", marginRight: "10px" }}
                          type="checkbox"
                          id="address_default_address_new"
                          name="address[default]"
                          checked={address.isDefault}
                          onChange={() => handleSetDefaultAddress(address.id)}
                        />
                        <label htmlFor={`defaultbox-${address.id}`}>
                          Set as default address
                        </label>
                      </div>
                      <button
                        onClick={() => handleEditButton(address.id)}
                        className="btn btn--primary"
                        type="button"
                        id="EditFormButton_7657358131265"
                        data-address-id="7657358131265"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteAddress(address.id)}
                        className="btn btn--primary"
                        type="button"
                        data-confirm-message="Are you sure you wish to delete this address?"
                      >
                        Delete
                      </button>
                    </li>
                  </>
                ))}
              </>
            ) : (
              <p>You have no addresses</p>
            )}
          </ul>
        </div>
        <script>
          {`
         window.onload = () => {
           typeof CustomerAddresses !== 'undefined' && new CustomerAddresses();
         }
      `}
        </script>
      </div>
    </main>
  );
};

export default ViewAddress;
