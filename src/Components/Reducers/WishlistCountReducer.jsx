// src/reducers/wishlistCountReducer.js
const initialState = 0;

const WishlistCountReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_WISHLIST_COUNT':
      return action.payload;
    default:
      return state;
  }
};

export default WishlistCountReducer;
