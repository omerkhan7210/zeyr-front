import React from "react";
import { Link } from "react-router-dom";

const HeaderNav = () => {
  return (
    <div className="desktop-menu">
      <nav className="site-menu">
        <ul className="list-unstyled flex primary-links" role="list">
          <li className="menu-item__level-0 has-submenu transition-delay">
            <div className="dropdown--level-0">
              <a href="/men" className="menu-item men">
                <span className="menu-item__text">MEN</span>
              </a>

              <div className="megamenu flex">
                <div className="megamenu-links">
                  <ul
                    className="site-menu__submenu list-unstyled secondary-links flex flex--wrap flex--column jcs"
                    role="list"
                    tabIndex="-1"
                  >
                    <li
                      className="menu-item__level-1 has-submenu"
                      data-link-handle="ready-to-wear"
                    >
                      <div className="submenu-content">
                        <div className="submenu__summary">
                          <a className="menu-item">Ready to Wear</a>
                          <span className="details__icon"></span>
                        </div>
                        <div className="submenu__details">
                          <ul
                            className="submenu__grandchildren"
                            style={{ paddingTop: "15px" }}
                          >
                            <li>
                              <a
                                href="/men"
                                className="menu-item__level-2 link-styled menu-item"
                              >
                                Tees
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="megamenu-image">
                  <a href="/men" className="promo-image">
                    <img
                      loading="lazy"
                      src="/cdn/shop/collections/1_2000x_7f6f7338-9c33-4e71-95ef-1b9d417f7a75.jpg?v=1692292640&amp;width=3000"
                      alt="MEN"
                      width="3000"
                      height="1813.0000000000002"
                    />
                  </a>
                </div>
              </div>
            </div>
          </li>

          <li className="menu-item__level-0 has-submenu transition-delay">
            <div className="dropdown--level-0">
              <a href="/women" className="menu-item women">
                <span className="menu-item__text">WOMEN</span>
              </a>

              <div className="megamenu flex">
                <div className="megamenu-links">
                  <ul
                    className="site-menu__submenu list-unstyled secondary-links flex flex--wrap flex--column jcs"
                    role="list"
                    tabIndex="-1"
                  >
                    <li
                      className="menu-item__level-1 has-submenu"
                      data-link-handle="ready-to-wear"
                    >
                      <div className="submenu-content">
                        <div className="submenu__summary">
                          <a className="menu-item">Ready to Wear</a>
                          <span className="details__icon"></span>
                        </div>
                        <div className="submenu__details">
                          <ul
                            className="submenu__grandchildren"
                            style={{ paddingTop: "15px" }}
                          >
                            <li>
                              <a
                                href="/women"
                                className="menu-item__level-2 link-styled menu-item"
                              >
                                Tees
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="megamenu-image">
                  <a href="/women" className="promo-image">
                    <img
                      loading="lazy"
                      src="/cdn/shop/collections/211215_HL_AMIRI_WOMENS_SOCIAL_LOOK_08_0023_RGB.jpg?v=1692292686&amp;width=3000"
                      alt="WOMEN"
                      width="3000"
                      height="1813.0000000000002"
                    />
                  </a>
                </div>
              </div>
            </div>
          </li>
          <li className="menu-item__level-0 has-submenu transition-delay">
            <div className="dropdown--level-0">
              <a href="/accessories" className="menu-item accessories">
                <span className="menu-item__text">ACCESSORIES</span>
              </a>

              <div className="megamenu flex">
                <div className="megamenu-links">
                  <ul
                    className="site-menu__submenu list-unstyled secondary-links flex flex--wrap flex--column jcs"
                    role="list"
                    tabIndex="-1"
                  >
                    <li
                      className="menu-item__level-1 has-submenu submenu-no-children"
                      data-link-handle="jewelry"
                    >
                      <div className="submenu-content">
                        <div className="submenu__summary">
                          <a href="jewelry" className="menu-item">
                            Jewelry
                          </a>
                          <span className="details__icon"></span>
                        </div>
                        <div className="submenu__details">
                          <ul
                            className="submenu__grandchildren"
                            style={{ paddingTop: "15px" }}
                          ></ul>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="megamenu-image">
                  <a href="/accessories" className="promo-image">
                    <img
                      loading="lazy"
                      src="/cdn/shop/collections/PF23_Nav_Banner_Accessories-1.jpg?v=1692297074&amp;width=3000"
                      alt="ACCESSORIES"
                      width="3000"
                      height="1813.0000000000002"
                    />
                  </a>
                </div>
              </div>
            </div>
          </li>


          <li className="menu-item__level-0 has-submenu transition-delay">
            <div className="dropdown--level-0">
              <a href="/memberships" className="menu-item memberships">
                <span className="menu-item__text">MEMBERSHIPS</span>
              </a>
            </div>
          </li>

          <li className="mmenu-account transition-delay">
            <a
              href="/login"
              className="flex flex--gap link-styled--reverse"
              style={{ gap: "0 1rem" }}
            >
              <span>
                <svg
                  className="icon icon--account"
                  width="16"
                  height="18"
                  viewBox="0 0 16 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 4C12 1.79086 10.2091 0 8 0C5.79086 0 4 1.79086 4 4C4 6.20914 5.79086 8 8 8C10.2091 8 12 6.20914 12 4ZM0.25 15.3333C0.25 13.0962 2.02307 11.25 4.25 11.25H11.75C13.9769 11.25 15.75 13.0962 15.75 15.3333V17C15.75 17.4142 15.4142 17.75 15 17.75H1C0.585786 17.75 0.25 17.4142 0.25 17V15.3333Z"
                    fill="white"
                  ></path>
                </svg>
              </span>
              <span>Log in / Create An Account</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HeaderNav;
