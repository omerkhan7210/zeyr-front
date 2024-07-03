import React from 'react'
import { Link } from 'react-router-dom'

export const AddressRows = ({address}) => {
    
  return (
   
      
    <div className="products-row">
    <button className="cell-more-button">
      <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-vertical"><circle cx={12} cy={12} r={1} /><circle cx={12} cy={5} r={1} /><circle cx={12} cy={19} r={1} /></svg>
    </button>
    <div className="product-cell image">
         <span>{address.firstName + " " + address.lastName}</span>
        </div>
    <div className="product-cell sales"><span className="cell-label">user email:</span> 
    <Link to={`mailto:${address.email}`}>{address.email}</Link>
    </div>
    
    <div className="product-cell sales"><span className="cell-label">Company :</span>{address.company}</div>
 
    <div className="product-cell sales"><span className="cell-label">Address :</span> {address.addressLine1 + " " + address.addressLine2}</div>
    <div className="product-cell sales"><span className="cell-label">Address :</span>   {address.city + ", " + address.country}</div>
    
  </div>
  
  )
}
