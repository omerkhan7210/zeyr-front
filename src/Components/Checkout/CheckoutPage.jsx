import React, {  useState, useContext, Suspense, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MainContent } from "./Step1ContactInfo/MainContent";
import { CheckoutSidebar } from "./OrderSummary/CheckoutSidebar";
import { MainFooter } from "./MainFooter";
import { ShippingStep2 } from "./Step2ShippingInfo/ShippingStep2";
import { RequiredFieldPopup } from "./RequiredFieldPopup";
import { Main } from "./Step3Payment/Main";
import { CheckoutContext } from "../Context/CheckoutBillingShippingAddressContext";
import { CartContextC } from "../Context/CartContext";

export const CheckoutPage = () => {

  const {cartItems} = useContext(CartContextC)
  const history = useNavigate()
 
const {showRequiredFieldPopup,step1Complete,step2Complete,setStep1Complete} = useContext(CheckoutContext)

  const handleChange = () => {
    // Clear the token from the cookie
    document.cookie =
      "CheckoutInfoToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    history("/checkout"); // Redirect to the login page after logout
  };
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if cartItems are available after a delay
    const timeoutId = setTimeout(() => {
      if (cartItems.length) {
        setIsLoading(false);
        // Continue with your logic, e.g., rendering the page
      } else {
        // Redirect to the home page if cartItems don't load
        window.location.href = '/';
      }
    }, 2000); // Adjust the delay time (in milliseconds) as needed

    // Cleanup the timeout to prevent memory leaks
    return () => clearTimeout(timeoutId);
  }, [cartItems]);

  // Additional logic for handling loading state, e.g., showing a loading spinner
  if (isLoading) {
    return  <p className='cart-sidebar-loading' style={{height:'100vh'}}> <img src='/images/loadingGIF.gif'  width={"30px"} /></p> 
    ;
  }


  return (
    <div className="content checkoutpage">
      {cartItems.length > 0 ? 
       <div className="wrap">
        <div className="main" role="main">
          {showRequiredFieldPopup && <RequiredFieldPopup />}

          <div className="main__header">
            <div className="logo-container">
              <a href="/">
                <img
                  src="cdn/shop/files/logo_be4041d5-a81e-4d1e-a43d-29b0b0d52cbe.png?v=1678302533"
                  alt="AMIRI"
                 
                  width="426"
                  height="24.507042253521124"
                  className="header__heading-logo"
                />
              </a>
            </div>
            <nav aria-label="Breadcrumb">
              <ol className="breadcrumb " role="list">
                <li className="breadcrumb__item breadcrumb__item--completed">
                  <a className="breadcrumb__link" href="/cart">
                    Cart
                  </a>
                  <svg
                    className="icon-svg icon-svg--color-adaptive-light icon-svg--size-10 breadcrumb__chevron-icon"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <use xlinkHref="#chevron-right" />
                  </svg>
                </li>
                {!step1Complete && (
                  <li
                    className="breadcrumb__item 
                         breadcrumb__item--current"
                    aria-current="step"
                  >
                    <span className="breadcrumb__text">Information</span>
                    <svg
                      className="icon-svg icon-svg--color-adaptive-light icon-svg--size-10 breadcrumb__chevron-icon"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <use xlinkHref="#chevron-right" />
                    </svg>
                  </li>
                )}
                {step1Complete && (
                  <li className="breadcrumb__item breadcrumb__item--completed">
                    <Link
                      className="breadcrumb__link"
                      onClick={() => handleChange()}
                    >
                      Information
                    </Link>
                    <svg
                      className="icon-svg icon-svg--color-adaptive-light icon-svg--size-10 breadcrumb__chevron-icon"
                      aria-hidden="true"
                      focusable="false"
                    >
                      {"{"}" "{"}"}
                      <use xlinkHref="#chevron-right" />
                      {"{"}" "{"}"}
                    </svg>
                  </li>
                )}

                <li
                  className={`breadcrumb__item ${
                    !step1Complete
                      ? "breadcrumb__item--blank"
                      : "breadcrumb__item--current"
                  } `}
                >
                  <span className="breadcrumb__text">Shipping</span>
                  <svg
                    className="icon-svg icon-svg--color-adaptive-light icon-svg--size-10 breadcrumb__chevron-icon"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <use xlinkHref="#chevron-right" />
                  </svg>
                </li>
                <li className="breadcrumb__item breadcrumb__item--blank">
                  <span className="breadcrumb__text">Payment</span>
                </li>
              </ol>
            </nav>
          </div>
          {!step1Complete && (
            <MainContent
              setStep1Complete={setStep1Complete}
            />
          )}
          {step1Complete && !step2Complete && (
            <ShippingStep2
              step2Complete={step2Complete}
            />
          )}

          {step2Complete && <Main step2Complete={step2Complete} />}
          <MainFooter step1Complete={step1Complete} />
        </div>
        <Suspense fallback={<p>Loading cart items...</p>}>
        <CheckoutSidebar />
      </Suspense>
      </div>
      : null}
      
    </div>
  );
};

export default CheckoutPage;
