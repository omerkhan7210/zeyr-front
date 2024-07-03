// src/Context/CartContext.js
import { createContext,useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  updateCartCount,
} from '../Actions/CartActions';
import axios from 'axios'
import { hostLink } from '../Hostlink/hostlink';

export const  CartContextC = createContext();

const CartContext = ({ children }) => {
  const dispatch = useDispatch();
  const cartItemsFromRedux = useSelector((state) => state.cart);
  const [cartItems, setCartItems] = useState([]); // State variable for cart items from the database
  const [cartItemsCount, setCartItemsCount] = useState(0); // State variable for total items count
  const [loading, setLoading] = useState(false);

   // Fetch the user UUID from localStorage
   const userUUID = localStorage.getItem('userUUID');
   const fetchCartItems = async () => {
    try {
      const response = await axios.get(`${hostLink}/cart/${userUUID}`);
      const cartItemsFromAPI = response.data.cartItems;
  
      // Filter out the cart items from the API that are already in Redux
      const filteredCartItemsFromAPI = cartItemsFromAPI.filter(
        (apiItem) => !cartItemsFromRedux.some((reduxItem) => reduxItem.id === apiItem.prod_id)
      );
      // Merge the filtered cart items from Redux with the filtered cart items from the API
      const mergedCartItems = await mergeCartItems(cartItemsFromRedux, filteredCartItemsFromAPI);
  
     
      // Dispatch an action to update the Redux store with the fetched cart items
      dispatch({ type: 'SET_CART_ITEMS', payload: mergedCartItems });

       // Set the state variable with the merged cart items
       return mergedCartItems;
  
    } catch (error) {
    }
  };
   // Fetch cart items from your API based on the userUUID
   useEffect(() => {
 
     if (userUUID) {
       const fetchData = async ()=>{
        setLoading(true)
        const citem = await fetchCartItems();
        
        setCartItems(citem)
        setLoading(false)
       }
      fetchData();
     }
   }, [userUUID, dispatch, cartItemsFromRedux]); // Include 'dispatch' and 'cartItemsFromRedux' as dependencies to trigger the effect whenever the Redux store is updated
 
   // Calculate the cart items count and update the state variable
   useEffect(() => {
    if(cartItems){

      const totalCount = cartItems.reduce((total, item) => total + item.quantity, 0);
      setCartItemsCount(totalCount);
    }
   }, [cartItems,dispatch]);
   const mergeCartItems = async (reduxItems, apiItems) => {
    const cartItemsMap = new Map();
  
    // Populate the cartItemsMap with Redux cart items
    reduxItems.forEach((item) => {
      cartItemsMap.set(item.id, { ...item }); // Clone the item to avoid modifying the Redux state
    });
  
    try {
      const fetchProductPromises = apiItems.map((apiItem) => {
        return axios.get(`${hostLink}/products/${apiItem.prod_id}`);
      });
  
      const productResponses = await Promise.all(fetchProductPromises);
  
      apiItems.forEach((apiItem, index) => {
        const existingCartItem = cartItemsMap.get(apiItem.prod_id);
        if (existingCartItem) {
          existingCartItem.quantity += apiItem.quantity;
          existingCartItem.selectedVariations = apiItem.selectedVariations;
        } else {
          // If the cart item does not exist in Redux, add it to the cartItemsMap
          cartItemsMap.set(apiItem.prod_id, {
            ...apiItem,
            id: apiItem.prod_id, // Set the id to prod_id to match Redux structure
          });
        }
      
        // Convert the selected variations string to an object
        const parsedSelectedVariations = JSON.parse(apiItem.selectedVariations);
      
        // Append the product details to the cart item
        const productDetails = productResponses[index].data.product;
        // Modify the productDetails object with selected variations
        productDetails.selectedVariations = parsedSelectedVariations;
      
        // Manually set the quantity for each product based on merged cart items
        productDetails.quantity = cartItemsMap.get(apiItem.prod_id).quantity;
      
        // Update the merged cart item in the map
        cartItemsMap.set(apiItem.prod_id, productDetails);
      });
      
    } catch (error) {
      
    }
    // Extract the values of the cartItemsMap to get the merged cart items
    return Array.from(cartItemsMap.values());
  };
  const addToCartHandler = (product, selectedVariations, quantity) => {
    dispatch(addToCart(product, selectedVariations, quantity));
  };

  const removeFromCartHandler = async (productId) => {
    await dispatch(removeFromCart(productId));
    //window.location.reload();

  }

  const fetchUUID = async () => {
    try {
      let uuid = localStorage.getItem("userUUID");
      if (!uuid) {
        const response = await axios.get(`${hostLink}/`);
        uuid = response.data.message;
        localStorage.setItem("userUUID", uuid);
      }
      return uuid;
    } catch (error) {
      console.error(error);
    }
  };
  
  const updateToCartAPI = async (productId, quantity) => {
    const uuid = await fetchUUID();
   // Check if quantity is less than 1 and set it to 1 if true
    if (quantity < 1) {
      quantity = 1;
    }
  
    const data = { uuid,productId, quantity };
    return axios.put(`${hostLink}/cart/update`, data, {
      headers: {
        "Content-Type": "application/json", // Set the correct content type for JSON data
      },
    });
  };
  const increaseQuantityHandler = async (productId) => {
    setLoading(true);
  
    try {
      // Calculate the new quantity locally
      const item = cartItems.find((item) => item.id === productId);
     const newQuantity = item ? item.quantity + 1 : 1;
  
      // Call the API to update the quantity on the server
      await updateToCartAPI(productId, newQuantity);
  
      // Update the local state with the new cart items
      const updatedCartItems = await fetchCartItems();
      setCartItems(updatedCartItems);
  
      // Dispatch an action to update the Redux store (if you're using Redux)
      dispatch(updateQuantity(productId, newQuantity));
    } catch (error) {
      // Handle the error (e.g., display an error message)
      console.error("Error updating quantity:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const decreaseQuantityHandler = async (productId) => {
    setLoading(true);
  
    try {
      // Calculate the new quantity locally
      const item = cartItems.find((item) => item.id === productId);
      const newQuantity = item ? Math.max(item.quantity - 1, 0) : 0;
  
      // Call the API to update the quantity on the server
      await updateToCartAPI(productId, newQuantity);
  
      // Update the local state with the new cart items
      const updatedCartItems = await fetchCartItems();
      setCartItems(updatedCartItems);
  
      // Dispatch an action to update the Redux store (if you're using Redux)
      dispatch(updateQuantity(productId, newQuantity));
    } catch (error) {
      // Handle the error (e.g., display an error message)
      console.error("Error updating quantity:", error);
    } finally {
      setLoading(false);
    }
  };
  

  // Calculate the cart items count and update the Redux store
  useEffect(() => {
    if(cartItems){

    const totalCount = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    dispatch(updateCartCount(totalCount));
    }
  }, [cartItems, dispatch]);

  return (
    <CartContextC.Provider
      value={{
        loading,
        setLoading,
        userUUID,
        cartItems,
        cartItemsCount,
        fetchCartItems,
        addToCart: addToCartHandler,
        removeFromCart: removeFromCartHandler,
        increaseQuantity: increaseQuantityHandler,
        decreaseQuantity: decreaseQuantityHandler,
      }}
    >
      {children}
    </CartContextC.Provider>
  );
};

export default CartContext;
