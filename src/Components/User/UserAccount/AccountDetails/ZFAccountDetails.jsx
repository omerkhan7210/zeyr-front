import React, { useContext, useEffect, useState } from 'react'
import { UserDetailsContext } from '../../../Context/UserDetails';
import { tokenContextC } from '../../../Context/TokenContext';
import axios from 'axios';
import { hostLink as hostlink } from '../../../Hostlink/hostlink';
import validator from 'validator';
import PopupOtp from '../../LoginSignup/SignupComponents.jsx/PopupOtp';


export const ZFAccountDetails = () => {
    
    const {accountDetails} = useContext(UserDetailsContext)
    const [fname, setFname] = useState(accountDetails.fname);
    const [lname, setLname] = useState(accountDetails.lname);
    const [email, setEmail] = useState(accountDetails.email);
    const [password, setPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // New state for password confirmation
    const [otpCode, setOtpCode] = useState('');
    const [showOtpPopup, setShowOtpPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [otpMessage, setOTPMessage] = useState('');
    const [showNewPassField,setShowNewPassField] = useState(false)
    const {token} = useContext(tokenContextC)
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(null);

    const VerifyPassword = async (currentPassword) => {
        try {
          const response = await axios.post(
            `${hostlink}/verify-password`,
            { currentPassword }, // Move currentPassword into the data object
            {
              headers: {
                Authorization: `Bearer ${token}`, // Pass the JWT token in the request headers
              },
            }
          );
          if (response.data.success) {
            return true;
          }else{
            return false
          }
        } catch (error) {
          console.error(error);
        }
      };

      const handlePasswordChange = async (e) => {
        const password = e.target.value;
        setCurrentPassword(password)
        
        try {
          const isCorrect = await VerifyPassword(password);
          setIsPasswordCorrect(isCorrect);
        } catch (error) {
          console.error('Error verifying password:', error);
          // Handle the error, such as displaying an error message to the user
        }
      };
      useEffect(()=>{
        
            if(isPasswordCorrect){
                setShowNewPassField(true)
                setErrorMessage('')
            }else{
              setShowNewPassField(false)
                setErrorMessage('Current password is wrong.');
            }
        
      // Validate password confirmation
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match.');
        return;
      }
      if(password === currentPassword){
        setErrorMessage('Old password and new password can not be the same .');
        return;
      }


      },[isPasswordCorrect,password,confirmPassword])

    const handleSignup = async (e) => {
      e.preventDefault();
  
        // Validate email and password inputs
    if (!validator.isEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
  // Validate first name and last name inputs
  if (!validator.isAlpha(fname, 'en-US', { ignore: ' ' })) {
    setErrorMessage('Please enter a valid first name.');
    return;
  }
  
  if (!validator.isAlpha(lname, 'en-US', { ignore: ' ' })) {
    setErrorMessage('Please enter a valid last name.');
    return;
  }
  
  if (isPasswordCorrect && validator.isEmpty(currentPassword)) {
    setErrorMessage('Please enter the old password.');
    return;
  }

  if (isPasswordCorrect && validator.isEmpty(password)) {
    setErrorMessage('Please enter your new password.');
    return;
  }
  if (isPasswordCorrect && validator.isEmpty(confirmPassword)) {
    setErrorMessage('Please confirm your new password.');
    return;
  }
  if (password === currentPassword) {
    setErrorMessage('Please enter a new password.');
    return;
  }
  
      try {
        const response = await axios.post(`${hostlink}/update-account-details`, 
        { fname,lname,email,password }, {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the JWT token in the request headers
          },
        });
        if(!response.data.success){
          setShowOtpPopup(true);
        }
        setErrorMessage(response.data.message);
      } catch (error) {
        setErrorMessage(error.response.data.message);
      }
    };
  
    const handleVerifyOtp = async () => {
      try {
        const response = await axios.post(`${hostlink}/change-details-otp`, { fname,lname,email, password ,otpCode });
        
        setOTPMessage(response.data.message);
        setShowOtpPopup(false);
         
        // Store the token in a cookie
        document.cookie = `token=${response.data.token}; path=/`;
        history('/');
      } catch (error) {
        setOTPMessage(error.response.data.message);
      }
    };
  
    const handleCloseOtpPopup = () => {
      setShowOtpPopup(false);
    };

  return (
   
    <main id="MainContent" className="content-for-layout" role="main" tabIndex="-1">
      <div
        id="shopify-section-template--14940997288001__main"
        className="shopify-section"
      >
        <link
          href="/cdn/shop/t/300/assets/customer.css?v=134172538491655289751689270880"
          rel="stylesheet"
          type="text/css"
          media="all"
        />
        <style data-shopify="">
          {`
        #shopify-section-template--14940997288001__main .section-padding {
         padding-top: 18px;
         padding-bottom: 18px;
         }
         @media screen and (min-width: 769px) {        
         #shopify-section-template--14940997288001__main .section-padding {
         padding-top: 36px;
         padding-bottom: 36px;
         }
         }
         `}
        </style>
        <div
          className="customer customer--register section-padding page-width text-center"
          style={{ pageWidth: "578px" }}
        >
          <svg style={{ display: "none" }}>
            <symbol id="icon-error" viewBox="0 0 13 13">
              <circle
                cx="6.5"
                cy="6.50049"
                r="5.5"
                stroke="white"
                strokeWidth="2"
              ></circle>
              <circle
                cx="6.5"
                cy="6.5"
                r="5.5"
                fill="#EB001B"
                stroke="#EB001B"
                strokeWidth="0.7"
              ></circle>
              <path
                d="M5.87413 3.52832L5.97439 7.57216H7.02713L7.12739 3.52832H5.87413ZM6.50076 9.66091C6.88091 9.66091 7.18169 9.37267 7.18169 9.00504C7.18169 8.63742 6.88091 8.34917 6.50076 8.34917C6.12061 8.34917 5.81982 8.63742 5.81982 9.00504C5.81982 9.37267 6.12061 9.66091 6.50076 9.66091Z"
                fill="white"
              ></path>
              <path
                d="M5.87413 3.17832H5.51535L5.52424 3.537L5.6245 7.58083L5.63296 7.92216H5.97439H7.02713H7.36856L7.37702 7.58083L7.47728 3.537L7.48617 3.17832H7.12739H5.87413ZM6.50076 10.0109C7.06121 10.0109 7.5317 9.57872 7.5317 9.00504C7.5317 8.43137 7.06121 7.99918 6.50076 7.99918C5.94031 7.99918 5.46982 8.43137 5.46982 9.00504C5.46982 9.57872 5.94031 10.0109 6.50076 10.0109Z"
                fill="white"
                stroke="#EB001B"
                strokeWidth="0.7"
              ></path>
            </symbol>
          </svg>
          <h1 className="section-heading">Update account details</h1>
          <a href="/my-zf" className="linsk-styled" style={{marginBottom:'2rem'}} >
            Return to Account details
          </a>
          <form
            id="create_customer"
            className='update-account'
            onSubmit={handleSignup}
            acceptCharset="UTF-8"
            noValidate="noValidate"
          >
            
            {accountDetails && 
            <>
            <div className="input-wrapper">
              <label htmlFor="RegisterForm-FirstName">
                Your First name
              </label>
              <input
                type="text"
                name="customer[first_name]"
                id="RegisterForm-FirstName"
                autoComplete="given-name"
                placeholder="First name"
                value={accountDetails.fname }
                onChange={(e) => setFname(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="RegisterForm-LastName">
                Your Last name
              </label>
              <input
                type="text"
                name="customer[last_name]"
                id="RegisterForm-LastName"
                autoComplete="family-name"
                placeholder="Last name"
                value={accountDetails.lname}
                onChange={(e) => setLname(e.target.value)}
                required
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="RegisterForm-email">
                Your Email
              </label>
              <input
                type="email"
                name="customer[email]"
                id="RegisterForm-email"
                spellcheck="false"
                autocapitalize="off"
                autoComplete="email"
                aria-required="true"
                placeholder="Email"
                value={accountDetails.email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="RegisterForm-password">
                Enter Your Current Password
              </label>
              <div className='flex align-center'>
              <input
                type="password"
                name="customer[password]"
                id="RegisterForm-password"
                aria-required="true"
                placeholder="Password"
                onChange={(e)=>handlePasswordChange(e)}
                required
              />
              {isPasswordCorrect && 
              <i className='fa fa-check'></i>
              }
              </div>
             
            </div>

            {showNewPassField && 
            <>
                {/* new pass field */}
                <div className="input-wrapper">
                <label htmlFor="RegisterForm-password">
                  Enter Your New Password
                </label>
                <input
                  type="password"
                  name="customer[password]"
                  id="RegisterForm-password"
                  aria-required="true"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                </div>
                {/* confirm new pass field */}
                <div className="input-wrapper">
                <label htmlFor="RegisterForm-password">
                  Confirm Your New Password
                </label>
                <input
                  type="password"
                  name="customer[password]"
                  id="RegisterForm-password"
                  aria-required="true"
                  placeholder="Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                </div>
            </>
            }
             <div class="cta-container">
             {errorMessage && <p>{errorMessage}</p>}
              <button class="btn btn--primary" type='submit'>Save Changes</button>
              
            </div>
            </>
            }
         
          </form>

          {showOtpPopup && (
            <PopupOtp
              show={showOtpPopup}
              handleClose={handleCloseOtpPopup}
              handleVerifyOtp={handleVerifyOtp}
              otpMessage={otpMessage}
              setOtpCode={setOtpCode}
              handleChange={(e) => setOtpCode(e.target.value)}
            />
          )}
        </div>
      </div>
    </main>
  )
}
