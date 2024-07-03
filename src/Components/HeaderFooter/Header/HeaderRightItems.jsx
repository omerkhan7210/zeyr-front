import React,{useContext} from 'react'
import { CartContextC } from '../../Context/CartContext';
import { tokenContextC } from '../../Context/TokenContext';
import {WishlistContextC} from '../../Context/WishlistContext';

 const HeaderRightItems = ({ handleopencartsidebar, handlesearchsidebar }) => {
   const { cartItemsCount,loading } = useContext(CartContextC);
   const { wishlistItemsCount } = useContext(WishlistContextC);
   const { isTokenExpired } = useContext(tokenContextC);

   return (
     <div className="header__util-link flex aic jce">
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

       <a
         href={` ${isTokenExpired ? "/login" : "/my-zf"}`}
         aria-label="Login/View my account"
         className={`account ${isTokenExpired ? null : "account--logged-in"}`}
       >
         {isTokenExpired ? (
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
         ) : (
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
         )}
       </a>
       <a
         href="/wishlist"
         className={`wk-link ${
           wishlistItemsCount > 0 ? "wk-link--filled" : "wk-link--empty"
         } `}
         title="View Wishlist"
         data-appmate=""
       >
         <div className="wk-icon wk-link__icon">
           {wishlistItemsCount > 0 ? (
             <svg
               className="icon--wishlist"
               width="15"
               height="20"
               viewBox="0 0 15 20"
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
             >
               <path
                 d="M6.79776 15.7977L0.527344 19.1641V0.5H13.5273V19.1633L7.27114 15.7979L7.0345 15.6706L6.79776 15.7977Z"
                 stroke="black"
                 strokeMiterlimit="10"
               ></path>
             </svg>
           ) : (
             <svg
               className="icon--wishlist"
               width="15"
               height="20"
               viewBox="0 0 15 20"
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
             >
               <path
                 d="M6.79776 15.7977L0.527344 19.1641V0.5H13.5273V19.1633L7.27114 15.7979L7.0345 15.6706L6.79776 15.7977Z"
                 stroke="black"
                 strokeMiterlimit="10"
               ></path>
             </svg>
           )}
         </div>
         <span className="wk-link__label">Wishlist</span>
         <span className="wk-link__count">{wishlistItemsCount}</span>
       </a>
       <span id="wishlist-link-placeholder" data-appmate=""></span>

       {loading ? <p className='cart-sidebar-loading'> <img src='/images/loadingGIF.gif'  width={"20px"} /></p> 
          :
       <a
         id="cart-icon-bubble"
         className="flex aic jcc "
         role="button"
         aria-haspopup="dialog"
         aria-label="Toggle cart drawer"
         onClick={handleopencartsidebar}
       >
         <span
           className={`cart-icon-container ${
             cartItemsCount > 0 ? "cart-icon--active" : ""
           }`}
         >
           {cartItemsCount > 0 ? (
             <span className="cart-item-count">{cartItemsCount}</span>
           ) : null}
           <svg
             className="icon icon--cart-2"
             width="21"
             height="20"
             viewBox="0 0 21 20"
             fill="none"
             xmlns="http://www.w3.org/2000/svg"
           >
             {cartItemsCount > 0 ? (
               <path
                 fillRule="evenodd"
                 clipRule="evenodd"
                 d="M6.83334 5.00003H13.1665C13.1538 4.15425 12.8136 3.34936 12.2222 2.75795C11.6284 2.16425 10.8298 1.83337 9.99992 1.83337C9.17008 1.83337 8.37139 2.16425 7.77768 2.75795C7.18627 3.34936 6.846 4.15425 6.83334 5.00003ZM14.1666 5.00003C14.1539 3.89054 13.7093 2.83086 12.9293 2.05085C12.1492 1.27083 11.0967 0.833374 9.99992 0.833374C8.90315 0.833374 7.8506 1.27083 7.07058 2.05085C6.29056 2.83086 5.84597 3.89054 5.83325 5.00003H0.916667L0 20H20L19.0833 5.00003H14.1666Z"
                 fill="black"
               ></path>
             ) : (
               <path
                 fillRule="evenodd"
                 clipRule="evenodd"
                 d="M6.86068 5H13.1938C13.1812 4.15422 12.8409 3.34933 12.2495 2.75792C11.6558 2.16422 10.8571 1.83334 10.0273 1.83334C9.19743 1.83334 8.39873 2.16422 7.80503 2.75792C7.21362 3.34933 6.87334 4.15422 6.86068 5ZM14.1939 5C14.1812 3.89051 13.7366 2.83083 12.9566 2.05082C12.1766 1.2708 11.124 0.833344 10.0273 0.833344C8.93049 0.833344 7.87794 1.2708 7.09792 2.05082C6.3179 2.83083 5.87332 3.89051 5.8606 5H0.94401L0.0273438 20H20.0273L19.1107 5H14.1939ZM1.88476 6H18.1699L18.9644 19H1.09032L1.88476 6Z"
                 fill="none"
               ></path>
             )}
           </svg>
         </span>
       </a>
        }
     </div>
   );
 };

export default HeaderRightItems;
