import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContextC } from "../../../Context/LoginContext";
import jwtDecode from "jwt-decode";
import { UserDetailsContext } from "../../../Context/UserDetails";

const LoginPage = () => {
  const { email, password, handleSubmit, setPassword, setEmail, errorMessage } =
    useContext(LoginContextC);
    
    const history = useNavigate();
  
    useEffect(() => {

      const checkAuth = async () => {
        const token = getToken();
       
        if(!token){
          return
        }
        // Check if the token is expired
        const decodedToken = jwtDecode(token);
        
  console.log(!(decodedToken.exp < Date.now() / 1000))
        if(!(decodedToken.exp < Date.now() / 1000)) {
          
          history('/my-zf');
          return;
        }
      }
      checkAuth();
    }, [history]);
  
    const getToken = () => {
      // Get the token from the cookie
      const tokenCookie = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='));
  
      if (tokenCookie) {
        const token = tokenCookie.split('=')[1];
        return token;
      }
  
      return null; // Token not found or empty cookie, return null or any other appropriate value
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
            Login
          </h1>
          <div>
            <form
              id="customer_login"
              acceptCharset="UTF-8"
              onSubmit={handleSubmit}
            >
              {errorMessage && 
              <><h2 class="form__message" tabindex="-1" autofocus="">
            <span class="visually-hidden">Error </span>
            <svg width="20" aria-hidden="true" focusable="false" role="presentation" viewBox="0 0 13 13">
              <circle cx="6.5" cy="6.50049" r="5.5" stroke="white" stroke-width="2"></circle>
              <circle cx="6.5" cy="6.5" r="5.5" fill="#EB001B" stroke="#EB001B" stroke-width="0.7"></circle>
              <path d="M5.87413 3.52832L5.97439 7.57216H7.02713L7.12739 3.52832H5.87413ZM6.50076 9.66091C6.88091 9.66091 7.18169 9.37267 7.18169 9.00504C7.18169 8.63742 6.88091 8.34917 6.50076 8.34917C6.12061 8.34917 5.81982 8.63742 5.81982 9.00504C5.81982 9.37267 6.12061 9.66091 6.50076 9.66091Z" fill="white"></path>
              <path d="M5.87413 3.17832H5.51535L5.52424 3.537L5.6245 7.58083L5.63296 7.92216H5.97439H7.02713H7.36856L7.37702 7.58083L7.47728 3.537L7.48617 3.17832H7.12739H5.87413ZM6.50076 10.0109C7.06121 10.0109 7.5317 9.57872 7.5317 9.00504C7.5317 8.43137 7.06121 7.99918 6.50076 7.99918C5.94031 7.99918 5.46982 8.43137 5.46982 9.00504C5.46982 9.57872 5.94031 10.0109 6.50076 10.0109Z" fill="white" stroke="#EB001B" stroke-width="0.7">
            </path></svg>
            Please adjust the following:
          </h2>
          <div class="errors"><ul><li>Incorrect email or password.</li></ul></div>
          </>
          }


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
                <button type="submit" className="btn btn--primary">
                  {" "}
                  Signin
                </button>
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

export default LoginPage;
