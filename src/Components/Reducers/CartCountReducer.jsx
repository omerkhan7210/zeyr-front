// src/reducers/cartCountReducer.js
const initialState = 0;


const CartCountReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_CART_COUNT':
      return action.payload;
    default:
      return state;
  }
};

export default CartCountReducer;
