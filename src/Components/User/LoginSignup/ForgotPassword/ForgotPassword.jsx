import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import validator from 'validator';
import DOMPurify from 'dompurify';
import ResetPassword from './ResetPasswordPopup';
import { Link } from 'react-router-dom';
import { hostLink } from '../../../Hostlink/hostlink';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const history = useNavigate();
  const [otpCode, setOtpCode] = useState(0);
  const [newPassword, setNewPassword] = useState('');
  const [message,setMessage] = useState('')
  const [messagePopup, setMessagePopup] = useState('');
  const [showOtpPopup, setShowOtpPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  // Validate email and password inputs
  if (!validator.isEmail(email)) {
    setMessage('Please enter a valid email address.');
    return;
  }
    try {
      const response = await axios.post(`${hostLink}/forgot-password`, { email });
      setMessage(response.data.message)
      setShowOtpPopup(true)
    } catch (error) {
      // Sanitize the error message before displaying it
      setMessage(DOMPurify.sanitize(error.response.data.message));
    }
  };


  const handleSubmitPopup = async (e) => {
    e.preventDefault();

  
   // Validate email and password inputs
   if (validator.isEmpty(newPassword)) {
    setMessage('Please enter your new password.');
    return;
  }

    try {
      const response = await axios.post(`${hostLink}/reset-password`, {
        email,
        otpCode,
        newPassword,
      });
      setMessagePopup(response.data.message);
      {message === "Success" ? (
        setTimeout(()=>{
          history('/my-zf')
        },1000)
      ) : null}
    } catch (error) {
      setMessagePopup(error.response.data.message);
    }
  };

  
  const handleCloseOtpPopup = () => {
    setShowOtpPopup(false);
  };

  return (
    <main id="MainContent" class="content-for-layout" role="main" tabIndex="-1">
      <section
        id="shopify-section-template--14940997681217__main"
        class="shopify-section"
      >
        <link
          href="/cdn/shop/t/300/assets/customer.css?v=134172538491655289751689270880"
          rel="stylesheet"
          type="text/css"
          media="all"
        />
        <style data-shopify="">
          {`
        #shopify-section-template--14940997681217__main .section-padding {
         padding-top: 25px;
         padding-bottom: 25px;
         }
         @media screen and (min-width: 769px) {        
         #shopify-section-template--14940997681217__main .section-padding {
         padding-top: 50px;
         padding-bottom: 50px;
         }
         }
         `}
        </style>
        <div
          class="customer customer--login section-padding page-width text-center"
          style={{pageWidth: "578px"}}
        >
          <div id="recover" style={{display:"block"}}>
            <h1 class="section-heading" tabIndex="-1">
              Reset your password
            </h1>
            <div>
              <p>We will send you an email to reset your password</p>
              <form method="post" onSubmit={handleSubmit}>
                <div class="input-wrapper">
                  <label for="RecoverEmail" class="visually-hidden">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    id="RecoverEmail"
                    autocorrect="off"
                    autocapitalize="off"
                    autocomplete="email"
                    placeholder="Email"
                  />
                </div>
                <div class="cta-container">
                  <button class="btn btn--primary">Submit</button>
                  <br />
                  <Link to="/login" class="link-styled">
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
          {message === "Success"
            ? showOtpPopup && (
                <div className="d-flex align-center justify-center flex-c w100">
                  <h2>Reset Password</h2>
                  <ResetPassword
                    messagePopup={messagePopup}
                    email={email}
                    handleSubmit={handleSubmitPopup}
                    setOtpCode={setOtpCode}
                    setNewPassword={setNewPassword}
                    handleClose={handleCloseOtpPopup}
                  />
                </div>
              )
            : message}
        </div>
      </section>
    </main>
  );
};

export default ForgotPassword;
