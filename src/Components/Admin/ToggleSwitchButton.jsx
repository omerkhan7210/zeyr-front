import React, { useContext } from 'react'
import { AdminContextC } from '../Context/AdminContext';

 const ToggleSwitchButton = () => {
  const {setActive} = useContext(AdminContextC)
    

const handleToggleSwitchClick = () => {
    // Access the HTML tag and toggle the 'light' class
    document.documentElement.classList.toggle('light');
    if (document.documentElement.classList.contains('light')) {
      setActive(true);
    } else {
      setActive(false);
    }
  };
  
  return (
    <button className="mode-switch" title="Switch Theme" onClick={handleToggleSwitchClick}>
    <svg className="moon" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} width={24} height={24} viewBox="0 0 24 24">
      <defs />
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  </button>
  )
}
export default ToggleSwitchButton
