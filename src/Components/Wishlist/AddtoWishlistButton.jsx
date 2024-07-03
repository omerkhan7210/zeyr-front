import {React,useContext, useEffect} from "react";
import { WishlistContextC } from "../Context/WishlistContext";

const AddtoWishlistButton = ({ product }) => {
 
	const { addToWishlist, wishlist } = useContext(WishlistContextC);
 	const isAddedToWishlist = wishlist.some((item) => item.id === product.id);
  
	const handleClick = () => {
	  if (!isAddedToWishlist) {
		addToWishlist(product);
	  }
	};
  

    return (
      <button
        type="button"
        className={`wk-button wk-button--add wk-button--floating ${isAddedToWishlist && "wk-link--filled"}`}
        title={isAddedToWishlist ?  "Added to wishlist" : "Add to Wishlist"}
        onClick={handleClick}
        style={{ cursor: isAddedToWishlist ? 'default' : 'pointer' }}

      >
        <div className="wk-icon wk-button__icon">
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
        </div>
        <span className="wk-button__label">{isAddedToWishlist ?  "Added to wishlist" : "Add to Wishlist"}</span>
      </button>
    );
}

export default AddtoWishlistButton;