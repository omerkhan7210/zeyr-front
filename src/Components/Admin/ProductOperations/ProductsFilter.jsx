import React, { useContext, useState } from 'react'
import { CategoriesContextC } from '../../Context/CategoriesContext';
import axios from 'axios';
import { hostLink } from '../../Hostlink/hostlink';
import { AdminContextC } from '../../Context/AdminContext';

export const ProductsFilter = ({handleSearchChange,searchQuery,setLayout,setLayout2,layout,layout2,handleFilterCategoryChange}) => {
  const {setActiveLink} = useContext(AdminContextC)
  const {categories} = useContext(CategoriesContextC) ;
  const [isFilterMenuOpen, setFilterMenuOpen] = useState(false);
 
  const handleFilterButtonClick = () => {
    setFilterMenuOpen(!isFilterMenuOpen);
  };

  
  const handleChangeLayoutClick = () => {
    setLayout(!layout);
    setLayout2(!layout2);
  };

  const handleNewBarcodes = async ()=>{
    const response = await axios.post(`${hostLink}/api/generate-new-barcodes`)
    if(response.data.message === 'Success'){
      window.location.href="/dashboard"
    }
  }
  return (
    <div className="app-content-actions">
    <input
        className="search-bar"
        placeholder="Search..."
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <div className="d-flex g1" style={{marginLeft:'10px'}}>
      <button  onClick={()=>setActiveLink('addProduct')}  className="btn btn--primary">Add Product</button>
      
      <button  onClick={handleNewBarcodes}  className="btn btn--primary" >Generate New Barcodes</button>
    
      </div>
      <div className="app-content-actions-wrapper">
        <div className="filter-button-wrapper">
          <button className="action-button filter jsFilter" onClick={handleFilterButtonClick}><span>Filter</span><svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-filter"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg></button>
          <div className={`${isFilterMenuOpen && "active "} filter-menu`}>
            <label>Category</label>
            <select onChange={handleFilterCategoryChange}>
            <option value="">All</option>
              {categories && 
              categories.length>0 &&
              categories.map((c)=>(
                <option key={c.id}>{c.name}</option>
              ))
              }
            </select>
          </div>
        </div>
        <button className={`${layout && "active"} action-button list`} title="List View"  onClick={handleChangeLayoutClick}>
          <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-list"><line x1={8} y1={6} x2={21} y2={6} /><line x1={8} y1={12} x2={21} y2={12} /><line x1={8} y1={18} x2={21} y2={18} /><line x1={3} y1={6} x2="3.01" y2={6} /><line x1={3} y1={12} x2="3.01" y2={12} /><line x1={3} y1={18} x2="3.01" y2={18} /></svg>
        </button>
        <button className={`${layout2 && "active"} action-button grid`} title="Grid View"  onClick={handleChangeLayoutClick}>
          <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-grid"><rect x={3} y={3} width={7} height={7} /><rect x={14} y={3} width={7} height={7} /><rect x={14} y={14} width={7} height={7} /><rect x={3} y={14} width={7} height={7} /></svg>
        </button>
      </div>
    </div>
  )
}
