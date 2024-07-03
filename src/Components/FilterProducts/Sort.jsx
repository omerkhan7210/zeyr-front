/* eslint-disable react/prop-types */

export const Sort = ({activeLink,sort,setSort}) => {
  return (
    <li
    className="facet-filters__filter"
    data-index="1"
    data-filter="sort-by"
    style={{display: activeLink === 'sort' ? "block" : "none"}}
  >
    <ul className="sorting__list" role="list">
      <li className="facet-filters__filter-item link-styled--grey">
        <input
          type="radio"
          id="sortBymanual"
          name="sort_by"
          value="manual"
        />
        <label className="body-2" htmlFor="sortBymanual">
          <span className="sort__check flex aic jcc"></span>
          Featured
        </label>
      </li>
      <li className="facet-filters__filter-item link-styled--grey">
        <input
          type="radio"
          id="sortBybest-selling"
          name="sort_by"
          value="best-selling"
        />
        <label
          className="body-2"
          htmlFor="sortBybest-selling"
        >
          <span className="sort__check flex aic jcc"></span>
          Best selling
        </label>
      </li>
      <li className="facet-filters__filter-item link-styled--grey">
        <input
          type="radio"
          id="sortBytitle-ascending"
          name="sort_by"
          value="title-ascending"
        />
        <label
          className="body-2"
          htmlFor="sortBytitle-ascending"
        >
          <span className="sort__check flex aic jcc"></span>
          Alphabetically, A-Z
        </label>
      </li>
      <li className="facet-filters__filter-item link-styled--grey">
        <input
          type="radio"
          id="sortBytitle-descending"
          name="sort_by"
          value="title-descending"
        />
        <label
          className="body-2"
          htmlFor="sortBytitle-descending"
        >
          <span className="sort__check flex aic jcc"></span>
          Alphabetically, Z-A
        </label>
      </li>
      <li className="facet-filters__filter-item link-styled--grey">
        <input
          type="radio"
          id="sortByprice-ascending"
          name="sort_by"
          value="price-ascending"
        />
        <label
          className="body-2"
          htmlFor="sortByprice-ascending"
        >
          <span className="sort__check flex aic jcc"></span>
          Price, low to high
        </label>
      </li>
      <li className="facet-filters__filter-item link-styled--grey">
        <input
          type="radio"
          id="sortByprice-descending"
          name="sort_by"
          value="price-descending"
        />
        <label
          className="body-2"
          htmlFor="sortByprice-descending"
        >
          <span className="sort__check flex aic jcc"></span>
          Price, high to low
        </label>
      </li>
      <li className="facet-filters__filter-item link-styled--grey">
        <input
          type="radio"
          id="sortBycreated-ascending"
          name="sort_by"
          value="created-ascending"
        />
        <label
          className="body-2"
          htmlFor="sortBycreated-ascending"
        >
          <span className="sort__check flex aic jcc"></span>
          Date, old to new
        </label>
      </li>
      <li className="facet-filters__filter-item link-styled--grey">
        <input
          type="radio"
          id="sortBycreated-descending"
          name="sort_by"
          value="created-descending"
        />
        <label
          className="body-2"
          htmlFor="sortBycreated-descending"
        >
          <span className="sort__check flex aic jcc"></span>
          Date, new to old
        </label>
      </li>
    </ul>
  </li>
  )
}
