// src/actions/cartActions.js
export const addToCart = (product, selectedVariations, quantity) => {
    return {
      type: 'ADD_TO_CART',
      payload: { ...product, quantity, selectedVariations },
      
    };
    
  };
  
  export const removeFromCart = (productId) => {
    return {
      type: 'REMOVE_FROM_CART',
      payload: productId,
    };
  };
  

  export const updateQuantity = async (productId, quantity) => {
    return {
      type: 'UPDATE_QUANTITY',
      payload: { productId, quantity },
    };
  };
  
  export const updateCartCount = (count) => {
    return {
      type: 'UPDATE_CART_COUNT',
      payload: count,
    };
  };
  