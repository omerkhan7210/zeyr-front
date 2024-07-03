// src/reducers/cartReducer.js
import axios from "axios";
import { hostLink } from "../Hostlink/hostlink";
const initialState = [];

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
const addToCartAPI = async (prod_id, variations, quantity) => {
  const uuid = await fetchUUID();
  // Check if quantity is less than 1 and set it to 1 if true
  if (quantity < 1) {
    quantity = 1;
  }

  const data = { uuid, prod_id, variations, quantity };
  return axios.post(`${hostLink}/cart/add`, data, {
    headers: {
      "Content-Type": "application/json", // Set the correct content type for JSON data
    },
  });
};

const removeFromCartAPI = async (id) => {
  const uuid = await fetchUUID();
  return axios.delete(`${hostLink}/cart/delete/${id}/${uuid}`);
};

const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      addToCartAPI(
        action.payload.id,
        action.payload.selectedVariations,
        action.payload.quantity
      );
      return [...state, action.payload];
    case "REMOVE_FROM_CART":
      
      removeFromCartAPI(action.payload);
      return state.filter((item) => item.id !== action.payload);
    case "UPDATE_QUANTITY":
      return state.map((item) =>
        item.id === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
    default:
      return state;
  }
};

export default CartReducer;
