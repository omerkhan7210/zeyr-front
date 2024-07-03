import React, { useContext } from 'react'
import { hostLink } from '../Hostlink/hostlink';
import { Link } from 'react-router-dom';
import { AdminContextC } from '../Context/AdminContext';

export const DashboardSidebar = () => {
  const {activeLink,setActiveLink,history} = useContext(AdminContextC)
  const handleLogout = () => {
    // Clear the token from the cookie
    document.cookie = 'adminToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    history('/admin'); // Redirect to the login page after logout
  };
  return (
    <ul className="sidebar-list">
    <li className={`sidebar-list-item ${activeLink === 'home' && "active"}`}>
      <a href='#' onClick={()=>setActiveLink('home')}>
        <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
        <span>Home</span>
      </a>
    </li>
    <li className={`sidebar-list-item ${activeLink === 'viewProducts' || activeLink === 'addProduct'  && "active"}`}>
      <Link to={`view-products`} onClick={()=>setActiveLink('viewProducts')}>
        <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-shopping-bag"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1={3} y1={6} x2={21} y2={6} /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
        <span>Products</span>
      </Link>
    </li>
    <li className={`sidebar-list-item ${activeLink === 'categories' && "active"}`}>
      <a href="#" onClick={()=>setActiveLink('categories')}>
        <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-inbox"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12" /><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /></svg>
        <span>Categories</span>
      </a>
    </li>
    <li className={`sidebar-list-item ${activeLink === 'addShipping' && "active"}`}>
      <a href="#" onClick={()=>setActiveLink('addShipping')}>
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-truck"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
      <span>Add Shipping Methods</span>

      </a>
    </li>

    <li className={`sidebar-list-item ${activeLink === 'addMemberships' && "active"}`}>
      <a href="#" onClick={()=>setActiveLink('addMemberships')}>
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user-plus"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>      
        <span>Add Memberships</span>
      </a>
    </li>
   
    <li className={`sidebar-list-item ${activeLink === 'orders' && "active"}`}>
      <a href="#" onClick={()=>setActiveLink('orders')} >
        <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-bell"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
        <span>Orders</span>
      </a>
    </li>
    <li className={`sidebar-list-item ${activeLink === 'customers' && "active"}`}>
      <a href="#" onClick={()=>setActiveLink('customers')} >
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>        <span>Customers</span>
      </a>
    </li>
    <li className={`sidebar-list-item ${activeLink === 'adduser' && "active"}`}>
      <a href="#" onClick={()=>setActiveLink('adduser')} >
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>        <span>Add A User</span>
      </a>
    </li>
    <li className="sidebar-list-item">
      <a href="#" onClick={handleLogout}  >
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>        <span>Log out</span>
      </a>
    </li>
  </ul>
  )
}
