
const MobileAvail = ({activeLink,setActiveLink}) => {
  return (
    <div
    className="filter__item"
    data-index="2"
    data-filter="availability"
  >
    <summary className="facets__summary flex jcb aic">
      <span>
        Availability
        <span
          className="active-filters-size__split"
          style={{ display: "none" }}
        >
          {" "}
          /{" "}
        </span>
        <span
          className="active-filters-size"
          style={{ display: "none" }}
        >
          0
        </span>
      </span>
      <svg
        className="icon icon--caret"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.666585 4L7.99992 12L15.3333 4"
          stroke="black"
        ></path>
      </svg>
    </summary>
    <div className="details__content">
      <ul
        className="availability list-unstyled details__content-inner"
        role="list"
      >
        <li className="facet-filters__filter-item facet-filters__is-filter link-styled--grey">
          <input
            className="facets__checkbox"
            type="checkbox"
            name="filter.v.availability"
            value="1"
            id="Filter-Availability-1"
          />
          <label
            htmlFor="Filter-Availability-1"
            className="facets__label container body-2"
          >
            <span>In stock</span>
            <span
              className="visually-hidden"
              aria-hidden="true"
            >
              In stock (19 products)
            </span>
          </label>
        </li>
        <li className="facet-filters__filter-item facet-filters__is-filter link-styled--grey">
          <input
            className="facets__checkbox"
            type="checkbox"
            name="filter.v.availability"
            value="0"
            id="Filter-Availability-2"
          />
          <label
            htmlFor="Filter-Availability-2"
            className="facets__label container body-2"
          >
            <span>Out of stock</span>
            <span
              className="visually-hidden"
              aria-hidden="true"
            >
              Out of stock (26 products)
            </span>
          </label>
        </li>
      </ul>
    </div>
  </div>
  )
}

export default MobileAvail