/* eslint-disable react/prop-types */
import  { useEffect, useState } from "react";
import { FilterTypes } from "./FilterTypes";
import { Sort } from "./Sort";
import { ColorSize } from "./ColorSize";
import { RefineMobile } from "./FilterMobile/RefineMobile";
import { Availibility } from "./Availibility";

export const Refine = ({setFilterOptions,setFiltersActive}) => {

  const [activeLink,setActiveLink] = useState('')
  const [active,setActive] = useState(false)
  const [availability,setAvailibility] = useState([])
  const [colors,setColors] = useState([])
  const [sizes,setSizes] = useState([])
  const [sort,setSort] = useState('')
let combinedArray = [...availability, ...colors, ...sizes];

useEffect(()=>{
  // Check if there are no filters selected and retrieve saved filters from localStorage
if (availability.length === 0 && sizes.length === 0 && colors.length === 0) {
  const savedFiltersColors = localStorage.getItem('savedFiltersColors');
  const savedFiltersSizes = localStorage.getItem('savedFiltersSizes');
  const savedFiltersAvailability = localStorage.getItem('savedFiltersAvailability');
  if (savedFiltersColors) {
    setColors(JSON.parse(savedFiltersColors)) // Parse the saved JSON string into an array
   }
  if(savedFiltersSizes){
    setSizes(JSON.parse(savedFiltersSizes));
  }
  if(savedFiltersAvailability){
    setAvailibility(JSON.parse(savedFiltersAvailability))
  }
 }else{
  
// Save the combined array to localStorage
localStorage.setItem('savedFiltersColors', JSON.stringify(colors));
// Save the combined array to localStorage
localStorage.setItem('savedFiltersSizes', JSON.stringify(sizes));
// Save the combined array to localStorage
localStorage.setItem('savedFiltersAvailability', JSON.stringify(availability));
 }

 setFilterOptions({
  colors,
  sizes,
  availability
 })
},[colors,sizes,availability])


  const handlefiltersidebar = () => {
    setActive(!active)
  }
  const handleFilter = async (e)=>{
    e.preventDefault()
    setFiltersActive(true)
    handlefiltersidebar()
  }

  const handleClear = async (e)=>{
    e.preventDefault()
    setFiltersActive(false)
    setFilterOptions({
      colors:[],
      sizes:[],
      availability:[]
    })
    setColors([])
    setSizes([])
    setAvailibility([])
// Save the combined array to localStorage
localStorage.setItem('savedFiltersColors', []);
// Save the combined array to localStorage
localStorage.setItem('savedFiltersSizes', []);
// Save the combined array to localStorage
localStorage.setItem('savedFiltersAvailability',[]);
  
    combinedArray =[]
    handlefiltersidebar()
  }
      
  return (
    <aside
      className="toolbar flex jcb toolbar--sticky toolbar-layout--alt"
      data-id="template--14940996862017__product-grid"
      style={{ zIndex: active ? 1 : 0 }}

    >
      <div className="toolbar__inner flex">
        <div className="toolbar__left flex">
          <div className="facet-container facet--filter">
            <button
              id="FacetDrawerTrigger"
              className="btn btn--secondary toolbar__item facet__trigger"
              aria-label="Toggle filter menu"
              aria-controls="drawer--filter"
              aria-expanded="false"
              onClick={() => handlefiltersidebar()}
            >
              <svg
                className="icon icon--filter"
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="15" height="15" fill="white"></rect>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.375 13.125C5.06536 13.125 5.625 12.5654 5.625 11.875C5.625 11.1846 5.06536 10.625 4.375 10.625C3.68464 10.625 3.125 11.1846 3.125 11.875C3.125 12.5654 3.68464 13.125 4.375 13.125ZM6.25 11.875C6.25 12.9105 5.41053 13.75 4.375 13.75C3.33947 13.75 2.5 12.9105 2.5 11.875C2.5 10.8395 3.33947 10 4.375 10C5.41053 10 6.25 10.8395 6.25 11.875Z"
                  fill="black"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.0625 8.375L4.0625 1.5L4.6875 1.5L4.6875 8.375L4.0625 8.375Z"
                  fill="black"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.625 2.125C9.93464 2.125 9.375 2.68464 9.375 3.375C9.375 4.06536 9.93464 4.625 10.625 4.625C11.3154 4.625 11.875 4.06536 11.875 3.375C11.875 2.68464 11.3154 2.125 10.625 2.125ZM8.75 3.375C8.75 2.33947 9.58947 1.5 10.625 1.5C11.6605 1.5 12.5 2.33947 12.5 3.375C12.5 4.41053 11.6605 5.25 10.625 5.25C9.58947 5.25 8.75 4.41053 8.75 3.375Z"
                  fill="black"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.9375 6.875L10.9375 13.75L10.3125 13.75L10.3125 6.875L10.9375 6.875Z"
                  fill="black"
                ></path>
              </svg>
              Refine
              
              {combinedArray && combinedArray.length > 0 && 
                    
              <span className="current-filters-selected" hidden="">
                / {combinedArray.length}
              </span>
              }
            </button>
            <div
              className={`drawer drawer--filter desktop ${active && "drawer--active"}`}
              tabIndex="-1"
              role="dialog"
              aria-modal="true"
              aria-labelledby="FiltersHeading"
            >
              <div id="DrawerOverlay" className="drawer--overlay"></div>
              <div className={`drawer__container flex flex--column `}>
                <div className="drawer__header text-center">
                  <button
                    className="btn btn--unstyled content--floating drawer-close"
                    type="button"
                    aria-label="Close"
                    onClick={() => handlefiltersidebar()}
                  >
                    <svg
                      className="icon icon--close"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-label="Close"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.43437 7.99993L0.517212 14.9171L1.0829 15.4828L8.00005 8.56562L14.9172 15.4828L15.4829 14.9171L8.56574 7.99993L15.4829 1.08278L14.9172 0.51709L8.00005 7.43424L1.0829 0.51709L0.517212 1.08278L7.43437 7.99993Z"
                        fill="black"
                      ></path>
                    </svg>
                  </button>
                  <h2 id="FiltersHeading" className="drawer__heading">
                    Refine
                  </h2>
                </div>
                <div className="drawer__body">
                  <div className="active-facets" hidden>
                    <div className="active-facets__button-wrapper">
                      <a href="/men" className="active-facets__button-remove ">
                        <span>Remove all</span>
                      </a>
                    </div>
                  </div>
                 
                  <form id="FacetFiltersForm" className="body-2">
                   <FilterTypes 
                   activeLink={activeLink} 
                   setActiveLink={setActiveLink} 
                   availability={availability}
                   colors={colors}
                   sizes={sizes}
                   />
                    <ul className="facet-filters__filters-container">
                     <Sort 
                     activeLink={activeLink} 
                     sort={sort} 
                     setSort={setSort}
                     />

                     <Availibility 
                     activeLink={activeLink} 
                     availibility={availability} 
                     setAvailibility={setAvailibility}
                     />

                      <ColorSize 
                      activeLink={activeLink} 
                      colors={colors} 
                      setColors={setColors} 
                      sizes={sizes} 
                      setSizes={setSizes}
                      />
                    </ul>
                  </form>
                </div>
                <div className="drawer__footer">
                  <div className="btn btn--tertiary body-1">
                    <a href="#" onClick={handleClear}>Clear All</a>
                  </div>
                  <button
                    type="button"
                    className="btn btn--primary drawer-close body-1"
                    onClick={handleFilter}
                  >
                    View 
                    {combinedArray && combinedArray.length > 0 && 
                    
                    <span className="current-filters-selected" style={{display: 'inline',marginLeft:'5px'}}>{ combinedArray.length}</span>
                    }
                  </button>
                </div>
              </div>
            </div>
          <RefineMobile/>
          </div>
        </div>
      </div>
    </aside>
  );
};
