import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { hostLink } from '../Hostlink/hostlink';

export const ColorSize = ({activeLink,colors,setColors,sizes,setSizes}) => {

    const [colorFilters,setColorFilters] = useState([])
    const [sizeFilters,setSizeFilters] = useState([])

    const fetchColorsSizes = async () => {
        try {
            const response = await axios.get(`${hostLink}/get-colors-sizes-filter`);
            const data = response.data;
            const colors = data.reduce((acc, curr) => {
                if (curr.attributeType === 'color') {
                    if (!acc.includes(curr.attributeValue)) {
                        acc.push(curr.attributeValue);
                    }
                }
                return acc;
            }, []);
            
            const sizes = data.reduce((acc, curr) => {
                if (curr.attributeType === 'size') {
                    if (!acc.includes(curr.attributeValue)) {
                        acc.push(curr.attributeValue);
                    }
                }
                return acc;
            }, []);
            // Remove duplicate colors
const uniqueColors = [...new Set(colors.map(color => color.toLowerCase()))];
// Remove duplicate sizes
const uniqueSizes = [...new Set(sizes.map(size => size.toUpperCase()))];

            setColorFilters(uniqueColors)
            setSizeFilters(uniqueSizes)
        } catch (error) {
            // Handle errors
            console.error("Error fetching stock:", error);
        }
    };
    
    
useEffect(()=>{
    fetchColorsSizes()
},[])

 // Define the logic for handling availability click
 const handleAvailabilityClickColor = (type) => {
    if (colors.includes(type)) {
        setColors(colors.filter(item => item !== type));
    } else {
        // If the clicked type is not in the availibility array, add it
        setColors([...colors, type]);
    }
};

 // Define the logic for handling availability click
 const handleAvailabilityClickSize = (type) => {
    if (sizes.includes(type)) {
        setSizes(sizes.filter(item => item !== type));
    } else {
        // If the clicked type is not in the availibility array, add it
        setSizes([...sizes, type]);
    }
};


  return (
   <>
   <li
                        className="facet-filters__filter"
                        data-index="3"
                        data-filter="color"
                        style={{display: activeLink === 'color' ? "block" : "none"}}
                      >
                        <ul>
                          {colorFilters.map((c)=>(
                            <li
                            className="facet-filters__filter-item facet-filters__is-filter link-styled--grey"
                            data-filter={c}
                          >
                            <input
                              className="facets__checkbox"
                              type="checkbox"
                              name="filter.v.option.color"
                              value={c}
                              checked={colors.includes(c)}
                              id="Filter-Color-12"
                            />
                            <label
                              htmlFor="Filter-Color-12"
                              className="facets__label swatch-wrapper container body-2"
                              onClick={()=>handleAvailabilityClickColor(c)}
                            >
                              <span>{c.toUpperCase()}</span>
                              <span
                                className="visually-hidden"
                                aria-hidden="true"
                              >
                                {c} (8 products)
                              </span>
                            </label>
                          </li>
                          ))}
                        </ul>
                      </li>
                      <li
                        className="facet-filters__filter"
                        data-index="4"
                        data-filter="size"
                        style={{display: activeLink === 'size' ? "block" : "none"}}
                      >
                        <ul>
                          {sizeFilters.map((s)=>(
                            <li
                            className="facet-filters__filter-item facet-filters__is-filter link-styled--grey"
                            data-filter="size"
                          >
                            <input
                              className="facets__checkbox"
                              type="checkbox"
                              name="filter.v.option.size"
                              value={s}
                              checked={sizes.includes(s)}
                              id="Filter-Size-14"
                            />
                            <label
                              htmlFor="Filter-Size-14"
                              className="facets__label container body-2"
                              onClick={()=>handleAvailabilityClickSize(s)}
                            >
                              <span>{s}</span>
                              <span
                                className="visually-hidden"
                                aria-hidden="true"
                              >
                                {s} (25 products)
                              </span>
                            </label>
                          </li>
                          ))}
                        </ul>
                      </li>
   </>
  )
}
