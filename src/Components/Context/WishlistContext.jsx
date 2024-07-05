// src/Context/WishlistContext.js
import { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
  updateWishlistCount,
} from "../Actions/wishlistActions";
import axios from "axios";
import { hostLink } from "../Hostlink/hostlink";

export const WishlistContextC = createContext();

const WishlistContext = ({ children }) => {
  const dispatch = useDispatch();
  const wishlistItemsFromRedux = useSelector((state) => state.wishlist);
  const [wishlist, setwishlistItems] = useState([]); // State variable for wishlist items from the database
  const [wishlistItemsCount, setwishlistItemsCount] = useState(0); // State variable for total items count
  const [loading, setLoading] = useState(false);

  // Fetch the user UUID from localStorage
  const userUUID = localStorage.getItem("userUUID");

  const fetchwishlistItems = async () => {
    try {
      const response = await axios.get(`${hostLink}/wishlist/${userUUID}`);
      const wishlistItemsFromAPI = response.data.wishlistItems;
      // Filter out the wishlist items from the API that are already in Redux
      const filteredwishlistItemsFromAPI = wishlistItemsFromAPI.filter(
        (apiItem) =>
          !wishlistItemsFromRedux.some(
            (reduxItem) => reduxItem.id === apiItem.prod_id
          )
      );
      // Merge the filtered wishlist items from Redux with the filtered wishlist items from the API
      const mergedwishlistItems = await mergewishlistItems(
        wishlistItemsFromRedux,
        filteredwishlistItemsFromAPI
      );

      // Dispatch an action to update the Redux store with the fetched wishlist items
      dispatch({ type: "SET_wishlist_ITEMS", payload: mergedwishlistItems });

      // Set the state variable with the merged wishlist items
      return mergedwishlistItems;
    } catch (error) {
      if (error.response) {
        // The request was made, and the server responded with a status code
        console.error(
          "Server responded with status code:",
          error.response.status
        );
        console.error("Response data:", error.response.data);
      } else if (error.request) {
        // The request was made, but no response was received
        console.error("No response received. Check your server.");
      } else {
        // Something happened while setting up the request
        console.error("Error setting up the request:", error.message);
      }
    }
  };
  // Fetch wishlist items from your API based on the userUUID
  useEffect(() => {
    if (userUUID) {
      const fetchData = async () => {
        setLoading(true);
        const witem = await fetchwishlistItems();
        setwishlistItems(witem);
        setLoading(false);
      };
      fetchData();
    }
  }, [userUUID, dispatch, wishlistItemsFromRedux]); // Include 'dispatch' and 'wishlistItemsFromRedux' as dependencies to trigger the effect whenever the Redux store is updated

  const mergewishlistItems = async (reduxItems, apiItems) => {
    const wishlistItemsMap = new Map();

    // Populate the wishlistItemsMap with Redux wishlist items
    reduxItems.forEach((item) => {
      wishlistItemsMap.set(item.id, { ...item }); // Clone the item to avoid modifying the Redux state
    });

    try {
      const fetchProductPromises = apiItems.map((apiItem) => {
        return axios.get(`${hostLink}/products/${apiItem.prod_id}`);
      });

      const productResponses = await Promise.all(fetchProductPromises);

      apiItems.forEach((apiItem, index) => {
        // If the wishlist item does not exist in Redux, add it to the wishlistItemsMap
        wishlistItemsMap.set(apiItem.prod_id, {
          ...apiItem,
          id: apiItem.prod_id, // Set the id to prod_id to match Redux structure
        });

        // Append the product details to the wishlist item
        const productDetails = productResponses[index].data.product;
        // Update the merged wishlist item in the map
        wishlistItemsMap.set(apiItem.prod_id, productDetails);
      });
    } catch (error) {}
    // Extract the values of the wishlistItemsMap to get the merged wishlist items
    return Array.from(wishlistItemsMap.values());
  };

  const addToWishlistHandler = (product) => {
    dispatch(addToWishlist(product));
  };

  const removeFromWishlistHandler = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  // Calculate the wishlist items count and update the Redux store
  useEffect(() => {
    if (wishlist) {
      const totalCount = wishlist.length;
      setwishlistItemsCount(wishlist.length);
      dispatch(updateWishlistCount(totalCount));
    }
  }, [wishlist, dispatch]);

  return (
    <WishlistContextC.Provider
      value={{
        loading,
        setLoading,
        wishlist,
        wishlistItemsCount,
        addToWishlist: addToWishlistHandler,
        removeFromWishlist: removeFromWishlistHandler,
      }}
    >
      {children}
    </WishlistContextC.Provider>
  );
};

export default WishlistContext;
