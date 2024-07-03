import React, { createContext, useEffect, useState } from 'react'
export const AdminUsersContextC = createContext()
import axios from 'axios'
import { hostLink } from '../Hostlink/hostlink'

export const AdminUsersContext = ({children}) => {
    const [users,setUsers] = useState([])
    const [addresses, setAddresses] = useState([]);
    const [shippingDetails ,setShippingDetails] = useState([])
    const [billingDetails ,setBillingDetails] = useState([])
    const [productDetails ,setProductDetails] = useState([])
    const fetchUsers = async ()=>{
        const response = await axios.get(`${hostLink}/select-all-users`)
        const users = response.data.users;
         setUsers(users)
    }
    useEffect(()=>{
        fetchUsers();
    },[])

  return (
    <AdminUsersContextC.Provider value={{
        users,
        addresses,
        setAddresses,
        shippingDetails,
        setShippingDetails,
        billingDetails,
        setBillingDetails,
        productDetails,
        setProductDetails
        }}>
        {children}
    </AdminUsersContextC.Provider>
  )
}
