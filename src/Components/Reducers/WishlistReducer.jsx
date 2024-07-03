// src/reducers/wishlistReducer.js// src/reducers/cartReducer.js
import axios from 'axios'
import { hostLink } from '../Hostlink/hostlink';
const initialState = [];

const fetchUUID = async () => {
  try {
    let uuid = localStorage.getItem('userUUID');
    if (!uuid) {
      const response = await axios.get(`${hostLink}/`);
      uuid = response.data.message;
      localStorage.setItem('userUUID', uuid);
    }
    return uuid;
  } catch (error) {
    console.error(error);
  }
};

const addToWishlistAPI = async (prod_id) => {
  const uuid = await fetchUUID();
  const data = { uuid, prod_id };
  return axios.post(`${hostLink}/wishlist/add`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const removeFromWishlistAPI = async (id) => {
  const uuid = await fetchUUID();
  return axios.delete(`${hostLink}/wishlist/delete/${id}/${uuid}`);
};
const WishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_WISHLIST":
      addToWishlistAPI(action.payload.id);
      return [...state, action.payload];
    case "REMOVE_FROM_WISHLIST":
      removeFromWishlistAPI(action.payload)
        
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
};

export default WishlistReducer;
