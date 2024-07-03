import React, { useContext, useState } from "react";
import SearchItem from "./SearchItem"
import { ProductFetchContext } from '../../Context/ProductFetch'; // Update the path accordingly

const SearchModal = ({ hostlink }) => {
  const { products } = useContext(ProductFetchContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const closesearchsidebar = () => {
    const searchSidebar = document.querySelector(".search-drawer");
    searchSidebar.classList.remove("drawer--active");
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (products) {
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredProducts);
    }
  };

  return (
    <section
      className="search-drawer drawer "
      tabIndex="-1"
      role="dialog"
      aria-modal="true"
      aria-label="Search drawer"
    >
      <div
        id="DrawerOverlay"
        onClick={closesearchsidebar}
        className="drawer--overlay"
      ></div>
      <div className="drawer__container drawer__container-shipping flex flex--column">
        <div className="drawer__header text-center">
          <button
            id="DrawerClose"
            className="btn btn--unstyled content--floating flex aic jcc"
            type="button"
            aria-label="Close"
            onClick={closesearchsidebar}
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
          <h2 className="drawer__heading visually-hidden">Search</h2>
        </div>
        <div className="drawer__body">
         

            <div className="search-modal__form" data-loading-text="Loading...">
              <form role="search" className="search">
                <div className="flex aic jcb">
                  <div className="form__input flex aic">
                    <label className="visually-hidden" htmlFor="SearchInput">
                      Search
                    </label>
                    <input
                      id="SearchInput"
                      type="search"
                      name="q"
                      placeholder="Search"
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                  </div>
                </div>
                <div
                  className="predictive-search predictive-search--header"
                  tabIndex="-1"
                  data-predictive-search=""
                ></div>
                <span
                  className="predictive-search-status visually-hidden"
                  role="status"
                  aria-hidden="true"
                ></span>
              </form>
              <div className="search-defaults">
                <h3 className="predictive-search__heading">Popular Searches</h3>
                <ul className="predictive-search__links list-unstyled">
                  <li>
                    <a href="/men" className="link-styled">
                      MEN
                    </a>
                  </li>
                  <li>
                    <a href="/women" className="link-styled">
                      Women
                    </a>
                  </li>
                </ul>

                  <>
                    <h3 className="predictive-search__heading">{searchResults.length > 0 ? "PRODUCTS" : "YOU MIGHT LIKE"}</h3>
                    <ul
                      className="collection__grid flex flex--wrap jcb list-unstyled"
                      role="list"
                    >
{products ? ( // Check if products is not null or undefined
  searchResults.length === 0 ? (
    products.length > 0 ? (
      products.map((item,index) => (
        index < 2 ?
        <SearchItem key={item.id} item={item} hostlink={hostlink} />
        : null
      ))
    ) : null
  ) : null
) : (
  // Loading state or placeholder content
  <p>Loading products...</p>
)}

                      {searchResults && searchResults.length > 0 ? searchResults.map((item) => (
                        <SearchItem
                          key={item.id}
                          item={item}
                          hostlink={hostlink}
                        />
                      )) : null}
                    </ul>
                  </>
              </div>
            </div>
          
        </div>
      </div>
    </section>
  );
};

export default SearchModal;