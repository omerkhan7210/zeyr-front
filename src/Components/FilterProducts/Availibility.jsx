import React, { useEffect, useState } from 'react'
import {hostLink} from '../Hostlink/hostlink'
import axios from 'axios'

export const Availibility = ({activeLink,availibility,setAvailibility}) => {

    const [instock,setInStock] = useState([])
    const [outstock,setOutStock] = useState([])

    const fetchStock = async () => {
        try {
            const response = await axios.get(`${hostLink}/get-stock-filter`);
            const results = response.data;
            
            if (results && results.length > 0) {
                const inStockProducts = [];
                const outOfStockProducts = [];
            
                results.forEach((r) => {
                    if (r.totalstock > 0) {
                        inStockProducts.push(r.productId);
                    } else {
                        outOfStockProducts.push(r.productId);
                    }
                });
            
                setInStock(inStockProducts)
                setOutStock(outOfStockProducts)
            }
            
        } catch (error) {
            // Handle errors
            console.error("Error fetching stock:", error);
        }
    };
    
    
useEffect(()=>{
    fetchStock()
},[])

 // Define the logic for handling availability click
 const handleAvailabilityClick = (type) => {
    if (availibility.includes(type)) {
        setAvailibility(availibility.filter(item => item !== type));
    } else {
        // If the clicked type is not in the availibility array, add it
        setAvailibility([...availibility, type]);
    }
};

  return (
    <li
    className="facet-filters__filter"
    data-index="2"
    data-filter="availability"
    style={{display: activeLink === 'availability' ? "block" : "none"}}
  >
    <ul>
      <li
        className="facet-filters__filter-item facet-filters__is-filter link-styled--grey"
        data-filter="availability"
        
      >
        <input
          className="facets__checkbox"
          type="checkbox"
          name="filter.v.availability"
          id="Filter-Availability-1"
          checked={availibility.includes('instock')}
        />
        <label
          htmlFor="Filter-Availability-1"
          className="facets__label container body-2"
          onClick={() => handleAvailabilityClick('instock')}
        >
          <span>In stock {instock && instock.length > 0 && `(${instock.length})`}</span>
         
        </label>
      </li>
      <li
        className="facet-filters__filter-item facet-filters__is-filter link-styled--grey"
        data-filter="availability"
       
      >
        <input
          className="facets__checkbox"
          type="checkbox"
          name="filter.v.availability"
          id="Filter-Availability-2"
          checked={availibility.includes('outstock')}
        />
        <label
          htmlFor="Filter-Availability-2"
          className="facets__label container body-2"
          onClick={() => handleAvailabilityClick('outstock')}
        >
          <span>Out of stock {outstock && outstock.length > 0 && outstock.length}</span>
          
        </label>
      </li>
    </ul>
  </li>
  )
}
