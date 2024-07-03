/* eslint-disable react/prop-types */

export const FilterTypes = ({activeLink,setActiveLink,availability,sizes,colors}) => {

  return (
    <ul className="facet-filters__types-container">
    <li
      className={`facet-filters__type link-styled--grey ${activeLink === 'sort' && "active"}`}
      data-filter="sort-by"
      onClick={()=>setActiveLink('sort')}
    >
      Sort by
    </li>
    <li
      className={`facet-filters__type link-styled--grey ${activeLink === 'availability' && "active"}`}
      onClick={()=>setActiveLink('availability')}
      data-filter="availability"
    >
      Availability
     
      <span
        className="active-filters-size"
      >
         {availability && availability.length > 0 && " / " + availability.length}
      </span>
    </li>
    <li 
    className={`facet-filters__type link-styled--grey ${activeLink === 'color' && "active"}`}
      onClick={()=>setActiveLink('color')}
      data-filter="color"
    >
      Color{" "}
      <span
        className="active-filters-size__split"
      >
        
        {colors && colors.length > 0 && " / " + colors.length}
      </span>
     
    </li>
    <li
       className={`facet-filters__type link-styled--grey ${activeLink === 'size' && "active"}`}
       onClick={()=>setActiveLink('size')}
      data-filter="size"
    >
      Size
      <span
        className="active-filters-size__split"
      >
        
        {sizes && sizes.length > 0 && " / " + sizes.length}
      </span>
    
    </li>
  </ul>
  )
}
