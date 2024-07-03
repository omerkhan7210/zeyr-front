import React, { useContext } from 'react'
import { AdminContextC } from '../Context/AdminContext'

export const DashboardAccount = () => {
 
  const {storedRole,storedUsername} = useContext(AdminContextC)
  
  return (
    <div className="account-info">
    <div className="account-info-picture">
      <img src="https://images.unsplash.com/photo-1527736947477-2790e28f3443?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTE2fHx3b21hbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60" alt="Account" />
    </div>
    <div className="account-info-name">{storedUsername} <br/>({storedRole})</div>
    <button className="account-info-more">
      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-horizontal"><circle cx={12} cy={12} r={1} /><circle cx={19} cy={12} r={1} /><circle cx={5} cy={12} r={1} /></svg>
    </button>
    
  </div>
  )
}
