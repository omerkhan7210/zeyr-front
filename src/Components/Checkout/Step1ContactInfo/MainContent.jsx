import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CustomerInfoForm } from "./CustomerInfoForm";
import { ShippingForm } from "./ShippingForm";
import { tokenContextC } from "../../Context/TokenContext";
import { UserDetailsContext } from "../../Context/UserDetails";
import validator from "validator";
import axios from "axios";
import { hostLink as hostlink } from "../../Hostlink/hostlink";
import { CheckoutContext } from "../../Context/CheckoutBillingShippingAddressContext";

export const MainContent = ({
  setStep1Complete,
}) => {

  const{ 
    setShowRequiredFieldPopup,
    setFormData,
    formData,
    fieldsWithRedBorder,
    setFieldsWithRedBorder
  } = useContext(CheckoutContext)
  const { isTokenExpired } = useContext(tokenContextC);
  const { accountDetails } = useContext(UserDetailsContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [checkBox, setCheckBox] = useState(false);
const [emailUser,setEmailUser] = useState('')

  const handleLogout = () => {
    // Clear the token from the cookie
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    window.location.href = "/checkout";
  };
  // Handle form submission to add a new address
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (checkBox) {
      // Validate email and password inputs
      if (!validator.isEmail(formData.email)) {
        setErrorMessage("Please enter a valid email address.");
        return;
      }
    }

    try {
      if (checkBox) {
       const email = formData.email;
       const response = await axios.post(`${hostlink}/newsletter-form`, {
        email,
      });

      }

      // Check if any required fields are empty
      const requiredFields = [
        "firstName",
        "lastName",
        "addressLine1",
        "city",
        "country",
        "zipCode",
        "phone",
        "email",
      ];
      
      const emptyFields = requiredFields.filter((field) => !formData[field]);

      if (emptyFields.length > 0) {
        // At least one required field is empty, show the popup
        setShowRequiredFieldPopup(true);
        // Hide the popup after a few seconds (e.g., 3 seconds)
        // Highlight empty fields with red border
        setFieldsWithRedBorder(emptyFields);

        setTimeout(() => {
          setShowRequiredFieldPopup(false);
        }, 3000); // 3000 milliseconds (3 seconds)
      } else {
       try {
        
        const response2 = await axios.post(
          `${hostlink}/checkout-shipping-address`,
          formData
        );
        // Clear the form data
        setFormData({
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
        if (response2.status === 201) {
          setStep1Complete(true);

          document.cookie = `CheckoutInfoToken=${response2.data.token}; path=/`;
          
          window.location.href = "/checkout";
        }
       } catch (error) {
        console.error(error)
       }
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response);
    }
  };
  useEffect(() => {
    const setEmailUserFunc = async () => {
      setEmailUser(accountDetails.email);
    };
  
    const updateFormData = async () => {
      if (!isTokenExpired) {
        await setEmailUserFunc();
        setFormData({ ...formData, email: emailUser });
      }
    };
  
    updateFormData(); // Call the function immediately when the component mounts
  
  }, [isTokenExpired, accountDetails, emailUser, setFormData, setEmailUser]);

  
  return (
    <div className="main__content">
      <div
        className="step"
        data-step="contact_information"
        data-last-step="false"
      >
        <form
          className="edit_checkout animate-floating-labels"
          acceptCharset="UTF-8"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="step__sections">
            <div className="section section--contact-information">
              <div className="section__header">
                <div className="layout-flex layout-flex--tight-vertical layout-flex--loose-horizontal layout-flex--wrap">
                  <h2
                    className="section__title layout-flex__item layout-flex__item--stretch"
                    id="main-header"
                    tabIndex={-1}
                  >
                    Contact
                  </h2>
                  {isTokenExpired && (
                    <p className="layout-flex__item">
                      <span aria-hidden="true">Have an account?</span>
                      <Link to="/login">
                        <span className="visually-hidden">
                          Have an account?
                        </span>
                        Log in
                      </Link>
                    </p>
                  )}
                </div>
              </div>
              {!isTokenExpired && accountDetails && (
                <div
                  className="section__content"
                  data-section="customer-information"
                  data-shopify-pay-validate-on-load="true"
                >
                  <div
                    className="logged-in-customer-information"
                    style={{
                      display: "flex",
                      justifyContent: "start",
                      alignItems: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    <p className="logged-in-customer-information__paragraph">
                      <span className="page-main__emphasis">
                        {accountDetails.fname + " " + accountDetails.lname}
                      </span>
                      <span
                      className="emailUser"
                      >
                        ({accountDetails.email})
                      </span>
                      <br />
                    </p>
                    <a
                      style={{ cursor: "pointer", marginLeft: "auto" }}
                      onClick={() => handleLogout()}
                    >
                      Log out
                    </a>
                  </div>
                </div>
              )}
              <CustomerInfoForm
                isTokenExpired={isTokenExpired}
                formData={formData}
                setFormData={setFormData}
                errorMessage={errorMessage}
                checkBox={checkBox}
                setCheckBox={setCheckBox}
                fieldsWithRedBorder={fieldsWithRedBorder}
              />
            </div>
            <ShippingForm
              formData={formData}
              setFormData={setFormData}
              errorMessage={errorMessage}
              fieldsWithRedBorder={fieldsWithRedBorder}
            />
          </div>
          <div className="step__footer">
            <button
              name="button"
              type="submit"
              id="continue_button"
              className="step__footer__continue-btn btn"
            >
              <span
                className="btn__content"
                data-continue-button-content="true"
              >
                Continue to shipping
              </span>
              <svg
                className="icon-svg icon-svg--size-18 btn__spinner icon-svg--spinner-button"
                aria-hidden="true"
                focusable="false"
              >
                <use xlinkHref="#spinner-button" />
              </svg>
            </button>
            <Link className="step__footer__previous-link" to="/cart">
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
                Return to cart
              </span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
