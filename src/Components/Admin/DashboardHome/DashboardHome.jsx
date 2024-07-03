import React from 'react'
import ToggleSwitchButton from '../ToggleSwitchButton'
import Charts from './Charts'

export const DashboardHome = () => {
  return (
    <div className="app-content ">
    <div className="app-content-header">
      <h1 className="app-content-headerText">Dashboard</h1>
     <ToggleSwitchButton/>
    </div>
   <Charts/> 
    
  </div>
  )
}
