import { React, useContext, useEffect } from "react";
import "./header-script.js";
import { Link } from "react-router-dom";
import { CartContextC } from "../../Context/CartContext.jsx";
import { tokenContextC } from "../../Context/TokenContext.jsx";
import { WishlistContextC } from "../../Context/WishlistContext.jsx";
import HeaderRightItems from "./HeaderRightItems.jsx";
import MobileHeader from "./MobileHeader.jsx";
import HeaderNav from "./HeaderNav.jsx";

export const Header2 = () => {
  useEffect(()=>{
    const checkCheckoutPage = document.querySelector(".checkoutpage")
    const header = document.querySelector("#shopify-section-header")
    if(checkCheckoutPage){

      header.classList.add("hideheaderfooter");
    }
  })

  const handleopencartsidebar = () => {
    const cartSidebar = document.querySelector(".cart-drawer");
    cartSidebar.classList.add("drawer--active");
  };
  const handlesearchsidebar = () => {
    const searchSidebar = document.querySelector(".search-drawer");
    searchSidebar.classList.add("drawer--active");
  };
  return (
    <div
      id="shopify-section-header"
      className="shopify-section section-header header--sticky"
    >
      <link
        href="/cdn/shop/t/300/assets/predictive-search.css?v=181969191698556883851689270882"
        rel="stylesheet"
        type="text/css"
        media="all"
      />
      <script
        src="/cdn/shop/t/300/assets/predictive-search.js?v=179584222252000407441689270880"
        defer="defer"
      ></script>
      <style data-shopify="">
        {`
            @media screen and (min-width: 769px) {
                .header .site-logo img {
                    max-width: 145px;
                }
            }
    
            .alt-header:not(.body-overlay) .header__heading-logo {
                display: none;
            }
    
            .alt-header:not(.body-overlay) .header__heading-logo.alt-header-logo {
                display: block;
            }`}
      </style>
      <header className="header header-layout--logo_center header-style--default flex jcb aic">
        <MobileHeader handlesearchsidebar={handlesearchsidebar} />

        <HeaderNav />

        <h1 className="site-logo flex jcc aic">
          <Link to="/">
            <img
              src="cdn/shop/files/logo_be4041d5-a81e-4d1e-a43d-29b0b0d52cbe.png?v=1678302533"
              alt="AMIRI"
              srcSet="
                  /cdn/shop/files/logo_be4041d5-a81e-4d1e-a43d-29b0b0d52cbe.png?v=1678302533&amp;width=50   50w,
                  /cdn/shop/files/logo_be4041d5-a81e-4d1e-a43d-29b0b0d52cbe.png?v=1678302533&amp;width=100 100w,
                  /cdn/shop/files/logo_be4041d5-a81e-4d1e-a43d-29b0b0d52cbe.png?v=1678302533&amp;width=150 150w,
                  /cdn/shop/files/logo_be4041d5-a81e-4d1e-a43d-29b0b0d52cbe.png?v=1678302533&amp;width=200 200w,
                  /cdn/shop/files/logo_be4041d5-a81e-4d1e-a43d-29b0b0d52cbe.png?v=1678302533&amp;width=250 250w,
                  /cdn/shop/files/logo_be4041d5-a81e-4d1e-a43d-29b0b0d52cbe.png?v=1678302533&amp;width=300 300w,
                  /cdn/shop/files/logo_be4041d5-a81e-4d1e-a43d-29b0b0d52cbe.png?v=1678302533&amp;width=400 400w
                "
              width="426"
              height="24.507042253521124"
              className="header__heading-logo"
            />

            <img
              src="cdn/shop/files/logo_3dd0e53b-8315-42f1-911d-78b11a710ac1.png?v=1678302840"
              alt="AMIRI"
              srcSet="
                  /cdn/shop/files/logo_3dd0e53b-8315-42f1-911d-78b11a710ac1.png?v=1678302840&amp;width=50   50w,
                  /cdn/shop/files/logo_3dd0e53b-8315-42f1-911d-78b11a710ac1.png?v=1678302840&amp;width=100 100w,
                  /cdn/shop/files/logo_3dd0e53b-8315-42f1-911d-78b11a710ac1.png?v=1678302840&amp;width=150 150w,
                  /cdn/shop/files/logo_3dd0e53b-8315-42f1-911d-78b11a710ac1.png?v=1678302840&amp;width=200 200w,
                  /cdn/shop/files/logo_3dd0e53b-8315-42f1-911d-78b11a710ac1.png?v=1678302840&amp;width=250 250w
                "
              width="426"
              height="24.507042253521124"
              className="header__heading-logo alt-header-logo"
            />
          </Link>
        </h1>
        <HeaderRightItems
          handlesearchsidebar={handlesearchsidebar}
          handleopencartsidebar={handleopencartsidebar}
        />
      </header>
    </div>
  );
};
