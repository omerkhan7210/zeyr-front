import React, { createContext,useState,useEffect } from 'react'
import axios from 'axios'
import { hostLink } from '../Hostlink/hostlink'
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import DOMPurify from 'dompurify';

export const AdminContextC = createContext();

export const AdminContext = ({children}) => {
  const storedRole = localStorage.getItem('adminRole') || '';
  const storedUsername = localStorage.getItem('adminUsername') || '';
    const [orders, setOrders] = useState([]);
    const path = "/dashboard"
    const history = useNavigate();
    const [activeLink, setActiveLink] = useState('home');
    const [productID, setProductID] = useState(0);
    const [orderId, setOrderID] = useState(0);
    const [userID, setUserID] = useState(0);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
  const [active,setActive] = useState(false)

    localStorage.setItem('activeLink', activeLink);
    const storedActiveLink = localStorage.getItem('activeLink') || '';
    
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

    const fetchOrder = async ()=> {
      try {
        const response = await axios.get(`${hostLink}/fetch-completed-order-admin`);
        return response.data.orders
       
      }catch(err){}
    }

    useEffect(()=>{
      setLoading(true)
      const fetchData = async ()=>{
        const orders = await fetchOrder();
        setOrders(orders)
      
      }
      fetchData();
      setLoading(false)
      },[])

    
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show the loading icon
    setErrorMessage("");
    setSuccessMessage("");

    // Validate email and password inputs
    if (!validator.isEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (validator.isEmpty(password)) {
      setErrorMessage("Please enter your password.");
      return;
    }

    try {
      const response = await axios.post(`${hostLink}/admin/login`, {
        email,
        password,
      });
       localStorage.setItem('adminUsername', response.data.username);
      localStorage.setItem('adminRole', response.data.role);

      setSuccessMessage(response.data.message);
      document.cookie = `adminToken=${response.data.token}; path=/`;
      // Redirect to the home page after a short delay (e.g., 1 second)
      setTimeout(() => {
        history("/dashboard");
      }, 1000);
    } catch (error) {
      setErrorMessage(DOMPurify.sanitize(error.response.data.message));
    } finally {
      setLoading(false); // Hide the loading icon
    }
  };

  return (
    <AdminContextC.Provider value={{orders,path,
    history,activeLink,setActiveLink,productID,
    setProductID,orderId,setOrderID,userID,
    setUserID,handleSubmit,errorMessage,loading,successMessage,setEmail,setPassword,email,password,
    storedRole,storedUsername,storedActiveLink,fetchOrder,
    setActive,active
    }}>
      {children}
    </AdminContextC.Provider>
  )
}
