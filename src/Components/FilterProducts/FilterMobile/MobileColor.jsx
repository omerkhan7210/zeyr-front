
const MobileColor = ({activeLink,setActiveLink}) => {
  return (
    <div
            className="filter__item"
            data-index="3"
            data-filter="color"
          >
            <summary className="facets__summary flex jcb aic">
              <span>
                Color
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
                className="color list-unstyled details__content-inner"
                role="list"
              >
                <li className="facet-filters__filter-item facet-filters__is-filter link-styled--grey">
                  <input
                    className="facets__checkbox"
                    type="checkbox"
                    name="filter.v.option.color"
                    value="Alabaster"
                    id="Filter-Color-1"
                  />
                  <label
                    htmlFor="Filter-Color-1"
                    className="facets__label container body-2"
                  >
                    <span>Alabaster</span>
                    <span
                      className="visually-hidden"
                      aria-hidden="true"
                    >
                      Alabaster (1 products)
                    </span>
                  </label>
                </li>
              </ul>
            </div>
          </div>
  )
}

export default MobileColor