// productReducer.js
const initialState = {
    menProducts: [],
    womenProducts: [],
    loading: true,
    error: null,
  };
  
  const ProductReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_PRODUCTS_START':
        return { ...state, loading: true, error: null };
      case 'FETCH_PRODUCTS_SUCCESS':
        return {
          ...state,
          products: action.payload.products,
          menProducts: action.payload.menProducts,
          womenProducts: action.payload.womenProducts,
          loading: false,
        };
      case 'FETCH_PRODUCTS_ERROR':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default ProductReducer;
  