import React, { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { tokenContextC } from '../Context/TokenContext';
import { AdminContextC } from '../Context/AdminContext';

const AdminLogin = () => {
  const {handleSubmit,errorMessage,loading,successMessage,email,setEmail,password,setPassword} = useContext(AdminContextC)
  const {adminToken,isAdminTokenExpired} = useContext(tokenContextC)
  useEffect(()=>{
    adminToken && !isAdminTokenExpired ? window.location.href = '/dashboard' : null 
    toggleLightMode();
  },[])

  const toggleLightMode = () => {
    const dashClass = document.querySelector('.dashboard');
    if(dashClass){
      setActive(false)
    }
    const headerClass = document.querySelector('.header');
    const footerClass = document.querySelector('#shopify-section-footer');
    // You may want to use React state to manage the active class instead of directly manipulating the DOM.
    // However, for simplicity, I'm keeping it similar to your provided code.
    headerClass.classList.add('dnone');
    footerClass.classList.add('dnone');
  };



  return (
    <section
      id="shopify-section-template--14940997681217__main"
      className="shopify-section"
    >
      <link
        href="/cdn/shop/t/300/assets/customer.css"
        rel="stylesheet"
        type="text/css"
        media="all"
      />
      <style data-shopify="">
        {`
      #shopify-section-template--14940997681217__main .section-padding {
      padding - top: 25px;
      padding-bottom: 25px;
      }
      @media screen and (min-width: 769px) {
      #shopify - section - template--14940997681217__main .section-padding {
      padding - top: 50px;
      padding-bottom: 50px;
      }
      }
      `}
      </style>
      <div className="customer customer--login section-padding page-width text-center">
        <div id="login">
          <h1 className="section-heading" tabIndex="-1">
            Admin Login
          </h1>
          <div>
            <form
              id="customer_login"
              accept-charset="UTF-8"
              onSubmit={handleSubmit}
            >
              {errorMessage && <p>{errorMessage}</p>}

              <input type="hidden" name="form_type" value="customer_login" />
              <input type="hidden" name="utf8" value="✓" />
              <div className="input-wrapper">
                <label htmlFor="CustomerEmail" className="visually-hidden">
                  Email
                </label>
                <input
                  type="email"
                  name="customer[email]"
                  id="CustomerEmail"
                  autoComplete="email"
                  autoCorrect="off"
                  autoCapitalize="off"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="CustomerPassword" className="visually-hidden">
                  Password
                </label>
                <input
                  type="password"
                  defaultValue=""
                  name="customer[password]"
                  id="CustomerPassword"
                  autoComplete="current-password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <small>
                <Link to="/forgot-password" className="link-styled">
                  Forgot Your Password?
                </Link>
              </small>
              <div className="cta-container">
                <button
                  type="submit"
                  className="btn btn--primary"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Signin"}
                </button>
                {successMessage && <p style={{marginBlock:'1rem'}}>{successMessage}</p>}
                <br />
                <Link to="/signup" className="link-styled">
                  Create An Account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;
