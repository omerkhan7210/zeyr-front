import React, { useEffect, useContext, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { DashboardSidebar } from './DashboardSidebar';
import { DashboardAccount } from './DashboardAccount';
import { DashboardProducts } from './ProductOperations/DashboardProducts';
import { DashboardHome } from './DashboardHome/DashboardHome';
import AddProduct from './ProductOperations/AddProduct';
import EditProduct from './ProductOperations/EditProduct';
import { DashboardCategories } from './ProductOperations/DashboardCategories';
import { DashboardOrders } from './OrdersDetails/DashboardOrders';
import { DashboardCustomers } from './Users/DashboardCustomers';
import { Details } from './OrdersDetails/Details';
import { AdminContextC } from '../Context/AdminContext';
import { IndividualUserOrders } from './Users/UserOrders&Addresses/IndividualUserOrders';
import { IndividualUserAddress } from './Users/UserOrders&Addresses/IndividualUserAddress';
import SignupForm from '../User/LoginSignup/SignupComponents.jsx/SignupForm';
import AddShippingDetails from './ShippingDetails/AddShippingDetails';
import AddMemberships from './AdminMemberships/AddMemberships';

const AdminDashboard = () => {
  const{history,storedActiveLink,active} = useContext(AdminContextC)
  const activeLink = storedActiveLink
  
  useEffect(() => {

    const checkAuth = async () => {
      const token = getToken();

      if (!token) {
        // If there's no token, redirect to the login page
        history('/admin');
        return;
      }

      // Check if the token is expired
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp < Date.now() / 1000) {
        // If the token is expired, remove the token from the cookie and redirect to the login page
        document.cookie = 'adminToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        history('/admin');
        return;
      }
    }
    toggleLightMode();
    checkAuth();
  }, [history]);

  const getToken = () => {
    // Get the token from the cookie
    const tokenCookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith('adminToken='));

    if (tokenCookie) {
      const token = tokenCookie.split('=')[1];
      return token;
    }

    return null; // Token not found or empty cookie, return null or any other appropriate value
  };


  const toggleLightMode = () => {
    const dashClass = document.querySelector('.dashboard');
    if (dashClass) {
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

    <div className="app-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="app-icon">
            {active ? 
          <img
              src="cdn/shop/files/logo_be4041d5-a81e-4d1e-a43d-29b0b0d52cbe.png?v=1678302533"
              alt="AMIRI"
              srcSet="
                  /cdn/shop/files/logo_be4041d5-a81e-4d1e-a43d-29b0b0d52cbe.png?v=1678302533&amp;width=50   50w,
                  /cdn/shop/files/logo_be4041d5-a81e-4d1e-a43d-29b0b0d52cbe.png?v=1678302533&amp;width=100 100w,
                  /cdn/shop/files/logo_be4041d5-a81e-4d1e-a43d-29b0b0d52cbe.png?v=1678302533&amp;width=150 150w,
                  /cdn/shop/files/logo_be4041d5-a81e-4d1e-a43d-29b0b0d52cbe.png?v=1678302533&amp;width=200 200w,
                  /cdn/shop/files/logo_be4041d5-a81e-4d1e-a43d-29b0b0d52cbe.png?v=1678302533&amp;width=250 250w,
                  /cdn/shop/files/logo_be4041d5-a81e-4d1e-a43d-29b0b0d52cbe.png?v=1678302533&amp;width=300 300w,
                  /cdn/shop/files/logo_be4041d5-a81e-4d1e-a43d-29b0b0d52cbe.png?v=1678302533&amp;width=400 400w
                "
              width="426"
              height="24.507042253521124"
              className="header__heading-logo"
            />
            :
            <img
              src="cdn/shop/files/ZEYR-FINERI-LOGO-W-1.png?v=1678302533"
              alt="AMIRI"
              srcSet="
                  /cdn/shop/files/ZEYR-FINERI-LOGO-W-1.png?v=1678302533&amp;width=50   50w,
                  /cdn/shop/files/ZEYR-FINERI-LOGO-W-1.png?v=1678302533&amp;width=100 100w,
                  /cdn/shop/files/ZEYR-FINERI-LOGO-W-1.png?v=1678302533&amp;width=150 150w,
                  /cdn/shop/files/ZEYR-FINERI-LOGO-W-1.png?v=1678302533&amp;width=200 200w,
                  /cdn/shop/files/ZEYR-FINERI-LOGO-W-1.png?v=1678302533&amp;width=250 250w,
                  /cdn/shop/files/ZEYR-FINERI-LOGO-W-1.png?v=1678302533&amp;width=300 300w,
                  /cdn/shop/files/ZEYR-FINERI-LOGO-W-1.png?v=1678302533&amp;width=400 400w
                "
              width="426"
              height="24.507042253521124"
              className="header__heading-logo"
            />
            }
            </div>
        </div>
        <DashboardSidebar />
        <DashboardAccount  />
      </div>
      {activeLink === 'viewProducts' ?
        <DashboardProducts/>
        :
        null
      }
      {activeLink === 'addProduct' ?
        <AddProduct  />
        :
        null
      }
      {activeLink === 'home' ?
        <DashboardHome  />
        :
        null
      }
      {activeLink === 'categories' ?
        <DashboardCategories />
        :
        null
      }
       {activeLink === 'orders' ?
        <DashboardOrders  />
        :
        null
      }
      {activeLink === 'customers' ?
        <DashboardCustomers/>
        :
        null
      }
      {activeLink === 'editProduct' ?
        <EditProduct/>
        :
        null
      }
      {activeLink === 'viewOrder' ?
        <Details/>
        :
        null
      }
      {activeLink === 'viewOrdersUsers' ?
        <IndividualUserOrders/>
        :
        null
      }
      {activeLink === 'viewAddressUsers' ?
        <IndividualUserAddress/>
        :
        null
      }

      {activeLink === 'adduser' ?
        <SignupForm  isAdmin={true}/>
        :
        null
      }

      {activeLink === 'addMemberships' ?
        <AddMemberships />
        :
        null
      }
      
      {activeLink === 'addShipping' ?
        <AddShippingDetails />
        :
        null
      }
      
    </div>

  );
};

export default AdminDashboard;





