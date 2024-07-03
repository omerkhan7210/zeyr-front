// productActions.js
import axios from 'axios';
import {hostLink} from '../Hostlink/hostlink'

export const fetchProducts = () => async (dispatch) => {
  try {
    dispatch({ type: 'FETCH_PRODUCTS_START' });

    const response = await axios.get(`${hostLink}/products`); // Replace with your API endpoint
    const products = response.data.filter((product) => product.status !== 'draft');
  
    const menProducts = products.filter((product) => product.categories.toLowerCase() === 'men');
    const womenProducts = products.filter((product) => product.categories.toLowerCase() === 'women');

    dispatch({
      type: 'FETCH_PRODUCTS_SUCCESS',
      payload: { products,menProducts, womenProducts },
    });
  } catch (error) {
    dispatch({ type: 'FETCH_PRODUCTS_ERROR', payload: error.response.status || 'An unknown error occurred while fetching the products.' });
  }
};
