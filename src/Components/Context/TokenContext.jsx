import React, { createContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

export const tokenContextC = createContext();

const TokenContext = ({ children }) => {
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const [isAdminTokenExpired, setIsAdminTokenExpired] = useState(false);
  const [isCheckoutInfoTokenExpired, setIsCheckoutInfoTokenExpired] = useState(false);
  const [isCheckoutShippingTokenExpired, setIsCheckoutShippingTokenExpired] = useState(false);

  const token = document.cookie.split("; ").find((row) => row.startsWith("token="))?.split("=")[1];
  const adminToken = document.cookie.split("; ").find((row) => row.startsWith("adminToken="))?.split("=")[1];
  const checkoutInfoToken = document.cookie.split("; ").find((row) => row.startsWith("CheckoutInfoToken="))?.split("=")[1];
  const checkoutShippingToken = document.cookie.split("; ").find((row) => row.startsWith("CheckoutShippingToken="))?.split("=")[1];

  useEffect(() => {
    const checkTokenExpiration = (token, setIsExpired) => {
      if (token) {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          // Token is expired, set state and remove from cookies
          setIsExpired(true);
          document.cookie = `${token}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
        } else {
          // Token is still valid
          setIsExpired(false);
        }
      } else {
        // Token is not present, set isExpired to true
        setIsExpired(true);
      }
    };

    checkTokenExpiration(token, setIsTokenExpired);
    checkTokenExpiration(adminToken, setIsAdminTokenExpired);
    checkTokenExpiration(checkoutInfoToken, setIsCheckoutInfoTokenExpired);
    checkTokenExpiration(checkoutShippingToken, setIsCheckoutShippingTokenExpired);

  }, [token, checkoutInfoToken, adminToken, checkoutShippingToken]);

  return (
    <tokenContextC.Provider
      value={{
        token,
        adminToken,
        isTokenExpired,
        isAdminTokenExpired,
        isCheckoutInfoTokenExpired,
        checkoutInfoToken,
        isCheckoutShippingTokenExpired,
        checkoutShippingToken,
      }}
    >
      {children}
    </tokenContextC.Provider>
  );
};

export default TokenContext;
