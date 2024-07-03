import React, { useContext } from "react";
import WishlistItem from "./WishlistItem";
import { WishlistContextC } from "../Context/WishlistContext";

const WishlistPage = () => {
  const { wishlist,loading} = useContext(WishlistContextC);

  return (
    <main
      id="MainContent"
      className="content-for-layout"
      role="main"
      tabIndex="-1"
    >
      <section
        id="shopify-section-template--14940997419073__main"
        className="shopify-section section"
      >
        <style data-shopify="">
          {`
		#shopify-section-template--14940997419073__main .section-padding {
         padding-top: 14px;
         padding-bottom: 14px;
         }
         @media screen and (min-width: 769px) {        
         #shopify-section-template--14940997419073__main .section-padding {
         padding-top: 28px;
         padding-bottom: 28px;
         }
         }
		 `}
        </style>
        <div className="section-padding color-schema-1 text-">
          <div className="page-width" style={{ width: "992px" }}>
            <h1 className="section-heading h2 text-center">Wishlist</h1>
            {loading ? <p className='cart-sidebar-loading'> <img src='/images/loadingGIF.gif'  width={"30px"}/></p> : 
            wishlist.length === 0 ? (
              <div class="wk-note wk-note__list-empty">
                  <p>Your wishlist is empty</p>
              </div>
            ) :
              <div className="wk-page " data-appmate="">
                <div className="wk-grid">
                  {wishlist.map((item)=>{
                  return  <WishlistItem w={item} key={item.id}/>
                  })}
                  
                </div>
              </div>
          }
          </div>
        </div>
      </section>
    </main>
  );
};

export default WishlistPage;
