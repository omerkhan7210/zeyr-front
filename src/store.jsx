// store.js
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import ProductReducer from './Components/Reducers/ProductReducer';
import CartReducer from './Components/Reducers/CartReducer';
import CartCountReducer from './Components/Reducers/CartCountReducer';
import WishlistReducer from './Components/Reducers/WishlistReducer';
import WishlistCountReducer from './Components/Reducers/WishlistCountReducer';

const rootReducer = combineReducers({
  products: ProductReducer,
  cart: CartReducer,
  cartCount: CartCountReducer,
  wishlist: WishlistReducer,
  wishlistCount: WishlistCountReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
