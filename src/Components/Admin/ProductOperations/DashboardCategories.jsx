import React from 'react'
import Categories from './Categories'
import ToggleSwitchButton from '../ToggleSwitchButton'

export const DashboardCategories = () => {
  return (
    <div className="app-content ">
    <div className="app-content-header">
      
    <h1 className="app-content-headerText">Categories</h1>
    <ToggleSwitchButton/>
     
    </div>
    <Categories/>
   
    
  </div>
  )
}
