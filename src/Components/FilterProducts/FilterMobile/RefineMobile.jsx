/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import MobileSort from "./MobileSort"
import MobileAvail from "./MobileAvail"
import MobileColor from "./MobileColor"
import MobileSize from "./MobileSize"

export const RefineMobile = ({setFilterOptions,setFiltersActive}) => {

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
    <div
    className={`drawer drawer--filter mobile ${active && "drawer--active"}`}
    tabIndex="-1"
    role="dialog"
    aria-modal="true"
    aria-labelledby="FiltersHeading"
    style={{ zIndex: active ? 1 : 0 }}
  >
    <div id="DrawerOverlay" className="drawer--overlay"></div>
    <div className="drawer__container flex flex--column">
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
        <div className="active-facets" hidden="">
          <div className="active-facets__button-wrapper">
            <a
              href="#"
              className="active-facets__button-remove "
            >
              <span>Remove all</span>
            </a>
          </div>
        </div>
       
        <form
          id="FacetFiltersForm"
          className="facet-filters-form__mobile"
        >
         <MobileSort  activeLink={activeLink} setActiveLink={setActiveLink}  />
         <MobileAvail  activeLink={activeLink} setActiveLink={setActiveLink}  />
        <MobileColor  activeLink={activeLink} setActiveLink={setActiveLink} />
       <MobileSize  activeLink={activeLink} setActiveLink={setActiveLink} />
        </form>
      </div>
      <div className="drawer__footer">
        <div>
          <a href="#" onClick={handleClear} className="btn btn--tertiary">
            Clear All
          </a>
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
  )
}
