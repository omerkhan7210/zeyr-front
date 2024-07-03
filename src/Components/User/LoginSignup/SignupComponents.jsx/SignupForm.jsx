import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
import validator from 'validator';
import PopupOtp from './PopupOtp';
import { hostLink as hostlink } from '../../../Hostlink/hostlink';


const SignupForm = ({isAdmin}) => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [otpMessage, setOTPMessage] = useState('');
  const history = useNavigate();
  const [selectedRole, setSelectedRole] = useState('Customer');

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

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


  if (validator.isEmpty(password)) {
    setErrorMessage('Please enter your password.');
    return;
  }

    try {
      const response = await axios.post(`${hostlink}/signup`, { fname,email });
      setErrorMessage(response.data.message);
      setShowOtpPopup(true);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(`${hostlink}/verify-otp`, { fname,lname,email, password ,otpCode,isAdmin,selectedRole });
      
      setOTPMessage(response.data.message);
      setShowOtpPopup(false);
       if(!isAdmin){
// Store the token in a cookie
document.cookie = `token=${response.data.token}; path=/`;
history('/');
       }
      
    } catch (error) {
      setOTPMessage(error.response.data.message);
    }
  };

  const handleCloseOtpPopup = () => {
    setShowOtpPopup(false);
  };

  return (
    <main
    id="MainContent"
    className="content-for-layout"
    role="main"
    tabIndex="-1"
    style={isAdmin ? { width: "100%" } : {}}
  >
    
      <div
        id="shopify-section-template--14940997288001__main"
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
          class="customer customer--register section-padding page-width text-center"
          style={{ pageWidth: "578px" }}
        >
          <svg style={{ display: "none" }}>
            <symbol id="icon-error" viewBox="0 0 13 13">
              <circle
                cx="6.5"
                cy="6.50049"
                r="5.5"
                stroke="white"
                stroke-width="2"
              ></circle>
              <circle
                cx="6.5"
                cy="6.5"
                r="5.5"
                fill="#EB001B"
                stroke="#EB001B"
                stroke-width="0.7"
              ></circle>
              <path
                d="M5.87413 3.52832L5.97439 7.57216H7.02713L7.12739 3.52832H5.87413ZM6.50076 9.66091C6.88091 9.66091 7.18169 9.37267 7.18169 9.00504C7.18169 8.63742 6.88091 8.34917 6.50076 8.34917C6.12061 8.34917 5.81982 8.63742 5.81982 9.00504C5.81982 9.37267 6.12061 9.66091 6.50076 9.66091Z"
                fill="white"
              ></path>
              <path
                d="M5.87413 3.17832H5.51535L5.52424 3.537L5.6245 7.58083L5.63296 7.92216H5.97439H7.02713H7.36856L7.37702 7.58083L7.47728 3.537L7.48617 3.17832H7.12739H5.87413ZM6.50076 10.0109C7.06121 10.0109 7.5317 9.57872 7.5317 9.00504C7.5317 8.43137 7.06121 7.99918 6.50076 7.99918C5.94031 7.99918 5.46982 8.43137 5.46982 9.00504C5.46982 9.57872 5.94031 10.0109 6.50076 10.0109Z"
                fill="white"
                stroke="#EB001B"
                stroke-width="0.7"
              ></path>
            </symbol>
          </svg>
          <h1 class="section-heading">
            {!isAdmin ?
            "Create account"
            :
            "Create a user"
            }
            </h1>
          <p style={isAdmin ? { display: "none" } : {}}>
            Create an account to access orders, and customer information.
            Friends of Pearl can access special offers and first looks.
          </p>
          <form
            id="create_customer"
            onSubmit={handleSignup}
            accept-charset="UTF-8"
            novalidate="novalidate"
          >
            {errorMessage && <p>{errorMessage}</p>}
            <div class="input-wrapper">
              <label for="RegisterForm-FirstName" class="visually-hidden">
                First name
              </label>
              <input
                type="text"
                name="customer[first_name]"
                id="RegisterForm-FirstName"
                autocomplete="given-name"
                placeholder="First name"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
              />
            </div>
            <div class="input-wrapper">
              <label for="RegisterForm-LastName" class="visually-hidden">
                Last name
              </label>
              <input
                type="text"
                name="customer[last_name]"
                id="RegisterForm-LastName"
                autocomplete="family-name"
                placeholder="Last name"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
                required
              />
            </div>
            <div class="input-wrapper">
              <label for="RegisterForm-email" class="visually-hidden">
                Email
              </label>
              <input
                type="email"
                name="customer[email]"
                id="RegisterForm-email"
                spellcheck="false"
                autocapitalize="off"
                autocomplete="email"
                aria-required="true"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          {isAdmin &&
            <div className="input-wrapper" style={{borderBottom:'0'}}>
            <label for="RegisterForm-email" class="visually-hidden">
                Select Role
              </label>
              <select name="roles" id="roles" 
              style={{width:'100%'}}
              value={selectedRole}
              onChange={handleRoleChange}
              >
                
                {selectedRole ? null : <option value="">Select a role</option>}
                <option value="admin">Admin</option>
                <option value="reader">Reader</option>
                <option value="contributor">Contributor</option>
                <option value="editor">Editor</option>
              </select>
            </div>
            }
            <div class="input-wrapper">
              <label for="RegisterForm-password" class="visually-hidden">
                Password
              </label>
              <input
                type="password"
                name="customer[password]"
                id="RegisterForm-password"
                aria-required="true"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div class="cta-container">
              <button class="btn btn--primary">Create an account</button>
              <br />
              {!isAdmin &&
              
              <Link to="/login" class="link-styled">
                Already has an account?
              </Link>
              }
            </div>
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
  );
};

export default SignupForm;
