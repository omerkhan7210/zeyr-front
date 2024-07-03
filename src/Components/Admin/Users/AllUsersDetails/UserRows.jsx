import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { hostLink } from '../../../Hostlink/hostlink'
import axios from 'axios'
import { AdminContextC } from '../../../Context/AdminContext'

export const UserRows = ({user}) => {
  const {setActiveLink,setUserID} = useContext(AdminContextC)
  const dateObject = new Date(user.date_registered);

  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = dateObject.toLocaleDateString("en-US", options);
  const [totalCounts,setTotalCounts] = useState([])
  const [totalAddresses,setTotalAddresses] = useState([])
  const [errorStatus, setErrorStatus] = useState('');

  const fetchTotalCount = async () => {
    try {
      const response = await axios.get(`${hostLink}/users/${user.id}`);
      setTotalCounts(response.data.totalcount)
      setTotalAddresses(response.data.totaladdress)
       setErrorStatus('');
    } catch (error) {
      setErrorStatus(error.response ? error.response.status : 'Error fetching categories');
    }
  };

  
  useEffect(() => {
    fetchTotalCount();
  }, [user]);


  return (

    <div className="products-row">
    <button className="cell-more-button">
      <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-vertical"><circle cx={12} cy={12} r={1} /><circle cx={12} cy={5} r={1} /><circle cx={12} cy={19} r={1} /></svg>
    </button>
    <div className="product-cell image">
        <img src={`${hostLink}/uploads/${user.thumbnail ? user.thumbnail : "placeholder.jpg"}`} alt="" />
         <span>{user.fname + " " + user.lname}</span>
        </div>
    <div className="product-cell sales"><span className="cell-label">user email:</span> <Link to={`mailto:${user.email}`}>{user.email}</Link></div>
    
    <div className="product-cell sales"><span className="cell-label">registered date:</span>{formattedDate}</div>
    <div className="product-cell sales"><span className="cell-label">total orders:</span>{totalCounts > 0 ? totalCounts : "No Orders"}
    {totalCounts > 0 &&
      <a href='#'   style={{marginLeft:'10px'}} onClick={()=> {
        setUserID(user.id)
        setActiveLink('viewOrdersUsers')
        }}>       
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
      </a>
    }
</div>
<div className="product-cell addresses">
  <span className="cell-label">total addresses:</span>
  {totalAddresses > 0 ? totalAddresses : "No Addresses"}
  {totalAddresses > 0 &&
    <a href='#' style={{marginLeft:'10px'}} onClick={()=> {
      setUserID(user.id)
      setActiveLink('viewAddressUsers')
    }}>       
     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
    </a>
  }
</div>

<div className="product-cell image">
        <img src={`${hostLink}/qrCodes/qr_${user.id}.png`} alt="" />
      
        </div>
    
    
  </div>
  
  )
}
