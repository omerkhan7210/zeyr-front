// HomePage.js
import React, { useState,useRef } from "react";
import { hostLink } from "../Hostlink/hostlink";
import axios from "axios";
import validator from "validator";
import DOMPurify from "dompurify";

const ContactPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [message, setMessage] = useState("");
  const [productInfo, setProductInfo] = useState("");
  const [successMsg,setSuccessMsg] = useState(false)
  const successMsgRef = useRef(null);

  // Step 2: Create a function to handle the change event
  const handleSelectChange = (event) => {
    // Update the state variable with the selected value
    setProductInfo(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email and password inputs
    if (!validator.isEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    try {
      const response = await axios.post(`${hostLink}/contact`, {
        name,
        email,
        phone,
        orderNumber,
        productInfo,
        message,
      });

    if(response.status == 200) {
      setSuccessMsg(true)
      // Inside your handleSubmit function after setting `setSuccessMsg(true)`
      successMsgRef.current.scrollIntoView({
        behavior: 'smooth', // Optional: You can use 'auto' or 'smooth' for scrolling behavior
        block: 'start',    // Optional: You can choose 'start', 'center', or 'end' to position the element
      });
    }
    else{ setSuccessMsg(false)}
    } catch (error) {
      console.error(error.response);
      // Sanitize the error message before displaying it
      setErrorMessage(DOMPurify.sanitize(error.response.data.message));
    }
  };

  return (
    <main
      id="MainContent"
      className="content-for-layout"
      role="main"
      tabIndex={-1}
    >
      <section
        id="shopify-section-template--14940997713985__form"
        className="shopify-section section section-contact-form"
      >
        <style
          data-shopify
          dangerouslySetInnerHTML={{
            __html:
              ".contact-form__discalimer {\n         margin-left: 40px;    \n         }\n         .form-success {\n         background: lightgreen;\n         padding: 0.5rem;\n         }\n         #ContactSubjectSelect {\n         border: none;\n         border-bottom: 1px solid var(--border-color);\n         padding-left: 0; \n         -webkit-appearance: auto;\n         }\n         #shopify-section-template--14940997713985__form .section-padding {\n         padding-top: 18px;\n         padding-bottom: 18px;\n         }\n         @media screen and (min-width: 769px) {            \n         #shopify-section-template--14940997713985__form .section-padding {\n         padding-top: 36px;\n         padding-bottom: 36px;\n         }    \n         }\n      ",
          }}
        />
        <div className="page-width section-padding" style={{ width: "860px" }}>
          <h1>Contact Us</h1>
          <div className="rte" style={{ marginBottom: "2rem" }}>
            <p>CLIENT SUPPORT IS AVAILABLE</p>
            <p>MONDAY THROUGH FRIDAY</p>
            <meta charSet="utf-8" />
            <p>10 AM TO 6 PM&nbsp;</p>
            <p>CLOSED ON ALL MAJOR US HOLIDAYS</p>
            <p>
              REACH US AT{" "}
              <a
                href="mailto:support@zeyrfineri.com"
                target="_blank"
                title="ZEYR FINERI SUPPORT EMAIL CUSTOMER SERVICE"
                rel="noopener noreferrer"
              >
                SUPPORT@ZEYRFINERI.COM
              </a>
              &nbsp;OR USE THE FORM BELOW
            </p>
          </div>
          <form
            id="ContactForm"
            acceptCharset="UTF-8"
            className="isolate"
            onSubmit={handleSubmit}
          >
{errorMessage && 
  <h3 class="h6 form-status form-error" role="alert" tabindex="-1" autofocus="">
        <svg class="icon icon--error" width="14" height="14" aria-hidden="true" focusable="false" role="presentation" viewBox="0 0 13 13"><circle cx="6.5" cy="6.50049" r="5.5" stroke="white" stroke-width="2"></circle><circle cx="6.5" cy="6.5" r="5.5" fill="#EB001B" stroke="#EB001B" stroke-width="0.7"></circle><path d="M5.87413 3.52832L5.97439 7.57216H7.02713L7.12739 3.52832H5.87413ZM6.50076 9.66091C6.88091 9.66091 7.18169 9.37267 7.18169 9.00504C7.18169 8.63742 6.88091 8.34917 6.50076 8.34917C6.12061 8.34917 5.81982 8.63742 5.81982 9.00504C5.81982 9.37267 6.12061 9.66091 6.50076 9.66091Z" fill="white"></path><path d="M5.87413 3.17832H5.51535L5.52424 3.537L5.6245 7.58083L5.63296 7.92216H5.97439H7.02713H7.36856L7.37702 7.58083L7.47728 3.537L7.48617 3.17832H7.12739H5.87413ZM6.50076 10.0109C7.06121 10.0109 7.5317 9.57872 7.5317 9.00504C7.5317 8.43137 7.06121 7.99918 6.50076 7.99918C5.94031 7.99918 5.46982 8.43137 5.46982 9.00504C5.46982 9.57872 5.94031 10.0109 6.50076 10.0109Z" fill="white" stroke="#EB001B" stroke-width="0.7"></path></svg>
 
        Please adjust the following:
      </h3>
}
            {successMsg ? 
           <h3 ref={successMsgRef} className="h6 form-status form-success" tabIndex={-1}>
  <svg className="icon icon--success" width={14} height={14} aria-hidden="true" focusable="false" role="presentation" viewBox="0 0 13 13">
    <path d="M6.5 12.35C9.73087 12.35 12.35 9.73086 12.35 6.5C12.35 3.26913 9.73087 0.65 6.5 0.65C3.26913 0.65 0.65 3.26913 0.65 6.5C0.65 9.73086 3.26913 12.35 6.5 12.35Z" fill="#428445" stroke="white" strokeWidth="0.7" /><path d="M5.53271 8.66357L9.25213 4.68197" stroke="white" /><path d="M4.10645 6.7688L6.13766 8.62553" stroke="white" /></svg>
  Thanks for contacting us. We'll get back to you as soon as possible.
</h3>

      : null
      }
            <div className="input-wrapper">
              <label className="visually-hidden" htmlFor="ContactForm-name">
                Name
              </label>
              <input
                className="field__input"
                autoComplete="name"
                type="text"
                id="ContactForm-name"
                name="contact[Name]"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label className="visually-hidden" htmlFor="ContactForm-email">
                Email <span aria-hidden="true">*</span>
              </label>
              <input
                autoComplete="email"
                type="email"
                id="ContactForm-email"
                className="field__input"
                name="contact[email]"
                spellCheck="false"
                autoCapitalize="off"
                aria-required="true"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label className="visually-hidden" htmlFor="ContactForm-phone">
                Phone Number
              </label>
              <input
                type="tel"
                id="ContactForm-phone"
                className="field__input"
                autoComplete="tel"
                name="contact[Phone Number]"
                pattern="[0-9\-]*"
                placeholder="Phone Number"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label
                htmlFor="ContactFormOrderNumber"
                className="visually-hidden"
              >
                Order Number
              </label>
              <input
                type="text"
                id="ContactFormOrderNumber"
                className="field__input"
                name="contact[order_number]"
                placeholder="Order Number"
                autoCorrect="off"
                autoCapitalize="off"
                required
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="ContactSubjectSelect" className="visually-hidden">
                Subject
              </label>
              <select
                className="content--full-width"
                name="contact[request_type]"
                id="ContactSubjectSelect"
                onChange={handleSelectChange}
                value={productInfo}
              >
                <option value="product-information">
                  Product Information{" "}
                </option>
                <option value="order-status">Order Status </option>
                <option value="return-exchange-status">
                  Return/Exchange Status{" "}
                </option>
                <option value="other">Other </option>
              </select>
            </div>
            <div>
              <label
                className="form__label field__label"
                htmlFor="ContactForm-body"
              >
                Message
              </label>
              <textarea
                rows={10}
                id="ContactForm-body"
                className="text-area field__input"
                name="contact[Message]"
                placeholder="Message"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <div className="section-cta cta-container flex ais">
              <button type="submit" className="btn btn--primary">
                Submit
              </button>
              <span className="contact-form__discalimer text--small">
                By pressing the submit button, I agree to ZEYR FINERI contacting
                me by email and/or phone. I also understand that any information
                shared in this form is subject to ZEYR FINERI’s Privacy Policy.
              </span>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
