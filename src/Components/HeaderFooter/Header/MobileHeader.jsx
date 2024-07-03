import React, { useContext, useState } from "react";
import { tokenContextC } from "../../Context/TokenContext";


const MobileHeader = ({ handlesearchsidebar }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeMenuStack, setActiveMenuStack] = useState([]);
  const {isTokenExpired} = useContext(tokenContextC)

  // Function to handle clicks on the main menu items
  const handleMainMenuClick = (buttonText) => {
    setActiveMenuStack([...activeMenuStack, buttonText]);
  };

  // Function to handle clicks on the "go back" button
  const handleGoBackClick = () => {
    const updatedStack = [...activeMenuStack];
    updatedStack.pop(); // Remove the top-level item (current submenu)
    setActiveMenuStack(updatedStack);
  };

  // Function to handle clicks on submenu items
  const handleSubMenuClick = (buttonText) => {
    setActiveMenuStack([...activeMenuStack, buttonText]);
  };

  const handlemenusidebar = () => {
    setIsExpanded(!isExpanded);
    const menuSidebar = document.querySelector(".mobile-menu");
    menuSidebar.classList.toggle("details--active");
  };

  return (
    <div className="header__mobile-menu flex">
      <div id="Details-Menu-Trigger" className="mobile-menu">
        <summary
          aria-label="Toggle mobile menu"
          role="button"
          aria-controls="menu-drawer"
          aria-expanded={isExpanded}
          className="mmenu__hamburger hamburger"
          onClick={() => {
            handlemenusidebar("1");
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </summary>
        <div className="mmenu-drawer drawer drawer--left mmenu-drawer drawer">
          <div className="drawer__container">
            <nav className="site-menu">
              <ul className="list-unstyled primary-links" role="list">
                <li className="has-submenu transition-delay">
                  <button
                    className="submenu__trigger flex aic jcb menu-item btn btn--unstyled"
                    onClick={() => handleMainMenuClick("MEN")}
                  >
                    MEN
                  </button>

                  <div
                    id="MenuLevel1"
                    className={`menu-drawer__content ${
                      activeMenuStack.includes("MEN") ? "submenu--active" : ""
                    }`}
                  >
                    <ul className="mmenu__breadcrumbs flex aic list-unstyled">
                      <li>
                        <button
                          id="MenuBreadcrumb0"
                          className="menu-item__heading btn btn--unstyled"
                          onClick={handleGoBackClick}
                        >
                          Menu
                        </button>
                        <span>/</span>
                      </li>
                      <li className="menu-item__heading">MEN</li>
                    </ul>

                    <ul
                      className="site-menu__submenu list-unstyled secondary-links"
                      role="list"
                      tabIndex="-1"
                    >
                      <li className="transition-delay">
                        <a href="/men" className="menu-item">
                          Shop Mens
                        </a>
                      </li>

                      <li className="has-submenu transition-delay">
                        <button
                          className="submenu__trigger flex aic jcb menu-item btn btn--unstyled"
                          onClick={() => handleSubMenuClick("MENRTW")}
                        >
                          Ready to Wear
                        </button>
                        <div
                          id="MenuLevel2"
                          className={`menu-drawer__content ${
                            activeMenuStack.includes("MENRTW")
                              ? "submenu--active"
                              : ""
                          }`}
                        >
                          <ul className="mmenu__breadcrumbs flex aic list-unstyled">
                            <li>
                              <button
                                id="MenuBreadcrumb0"
                                className="menu-item__heading btn btn--unstyled"
                              >
                                Menu
                              </button>
                              <span>/</span>
                            </li>

                            <li>
                              <button
                                id="MenuBreadcrumb1"
                                className="menu-item__heading btn btn--unstyled"
                                onClick={handleGoBackClick}
                              >
                                MEN
                              </button>
                              <span>/</span>
                            </li>
                            <li className="menu-item__heading">
                              Ready to Wear
                            </li>
                          </ul>
                          <ul className="site-menu__sub-submenu list-unstyled tertiary-links">
                            <li>
                              <a href="/men" className="menu-item">
                                Tees
                              </a>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="has-submenu transition-delay">
                  <button
                    className="submenu__trigger flex aic jcb menu-item btn btn--unstyled"
                    onClick={() => handleMainMenuClick("WOMEN")}
                  >
                    WOMEN
                  </button>

                  <div
                    id="MenuLevel1"
                    className={`menu-drawer__content ${
                      activeMenuStack.includes("WOMEN") ? "submenu--active" : ""
                    }`}
                  >
                    <ul className="mmenu__breadcrumbs flex aic list-unstyled">
                      <li>
                        <button
                          id="MenuBreadcrumb0"
                          className="menu-item__heading btn btn--unstyled"
                          onClick={handleGoBackClick}
                        >
                          Menu
                        </button>
                        <span>/</span>
                      </li>
                      <li className="menu-item__heading">WOMEN</li>
                    </ul>

                    <ul
                      className="site-menu__submenu list-unstyled secondary-links"
                      role="list"
                      tabIndex="-1"
                    >
                      <li className="transition-delay">
                        <a href="/women" className="menu-item">
                          Shop Womens
                        </a>
                      </li>

                      <li className="has-submenu transition-delay">
                        <button
                          className="submenu__trigger flex aic jcb menu-item btn btn--unstyled"
                          onClick={() => handleSubMenuClick("WOMENRTW")}
                        >
                          Ready to Wear
                        </button>
                        <div
                          id="MenuLevel2"
                          className={`menu-drawer__content ${
                            activeMenuStack.includes("WOMENRTW")
                              ? "submenu--active"
                              : ""
                          }`}
                        >
                          <ul className="mmenu__breadcrumbs flex aic list-unstyled">
                            <li>
                              <button
                                id="MenuBreadcrumb0"
                                className="menu-item__heading btn btn--unstyled"
                              >
                                Menu
                              </button>
                              <span>/</span>
                            </li>

                            <li>
                              <button
                                id="MenuBreadcrumb1"
                                className="menu-item__heading btn btn--unstyled"
                                onClick={handleGoBackClick}
                              >
                                WOMEN
                              </button>
                              <span>/</span>
                            </li>
                            <li className="menu-item__heading">
                              Ready to Wear
                            </li>
                          </ul>
                          <ul className="site-menu__sub-submenu list-unstyled tertiary-links">
                            <li>
                              <a href="/women" className="menu-item">
                                Tees
                              </a>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="has-submenu transition-delay">
                  <button
                    className="submenu__trigger flex aic jcb menu-item btn btn--unstyled"
                    onClick={() => handleMainMenuClick("ACCESSORIES")}
                  >
                    ACCESSORIES
                  </button>

                  <div
                    id="MenuLevel1"
                    className={`menu-drawer__content ${
                      activeMenuStack.includes("ACCESSORIES")
                        ? "submenu--active"
                        : ""
                    }`}
                  >
                    <ul className="mmenu__breadcrumbs flex aic list-unstyled">
                      <li>
                        <button
                          id="MenuBreadcrumb0"
                          className="menu-item__heading btn btn--unstyled"
                          onClick={handleGoBackClick}
                        >
                          Menu
                        </button>
                        <span>/</span>
                      </li>
                      <li className="menu-item__heading">ACCESSORIES</li>
                    </ul>

                    <ul
                      className="site-menu__submenu list-unstyled secondary-links"
                      role="list"
                      tabIndex="-1"
                    >
                      <li className="transition-delay">
                        <a className="menu-item">Shop Accessories</a>
                      </li>

                      <li className="transition-delay">
                        <a href="/jewelry" className="menu-item">
                          Jewelry
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>

              {!isTokenExpired ? <li className="mmenu-account">
          <a href="/my-zf" className="account menu-item account--logged-in">        
            <span>
              
    <svg className="icon icon--account-2" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="5" r="4" stroke="black"></circle><path d="M19.0247 19.44C19.0247 14.433 14.9562 11.5 9.93818 11.5C4.92014 11.5 0.851074 14.433 0.851074 19.44H19.0247Z" stroke="#333333" strokeMiterlimit="10"></path></svg>

            </span>
            <span>Account</span>
          </a>          
        </li> : 
                <li className="mmenu-account">
                  <a href="/login" className="account menu-item">
                    <span>
                      <svg
                        className="icon icon--account-2"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="10" cy="5" r="4" stroke="black"></circle>
                        <path
                          d="M19.0247 19.44C19.0247 14.433 14.9562 11.5 9.93818 11.5C4.92014 11.5 0.851074 14.433 0.851074 19.44H19.0247Z"
                          stroke="#333333"
                          strokeMiterlimit="10"
                        ></path>
                      </svg>
                    </span>
                    <span>Log in / Create An Account</span>
                  </a>
                </li>
              }
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div className="global-search">
        <button
          id="searchDrawerTrigger"
          className="search-trigger btn btn--unstyled"
          aria-label="Search"
          onClick={handlesearchsidebar}
        >
          <svg
            className="icon icon--search"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14 7.5C14 11.0899 11.0899 14 7.5 14C3.91015 14 1 11.0899 1 7.5C1 3.91015 3.91015 1 7.5 1C11.0899 1 14 3.91015 14 7.5ZM12.438 13.1451C11.1188 14.3001 9.39113 15 7.5 15C3.35786 15 0 11.6421 0 7.5C0 3.35786 3.35786 0 7.5 0C11.6421 0 15 3.35786 15 7.5C15 9.39113 14.3001 11.1188 13.1451 12.438L19.8536 19.1464L19.1464 19.8536L12.438 13.1451Z"
              fill="black"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MobileHeader;
