import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './assets/css/index.css'
import "./assets/css/font-awesome.min.css"
import "./assets/css/bootstrap.css";
import "./assets/css/banners.css";
import "./assets/css/cart-drawer.css";
import "./assets/css/collection.css";
import "./assets/css/featured-collection-2.css";
import "./assets/css/main.css";
import "./assets/css/predictive-search.css";
import "./assets/css/product-card.css";
import "./assets/css/slider.css";
import "./assets/css/slideshow.css";
import "./assets/css/video-two.css";
import "./assets/css/cart-page.css";
import "./assets/css/product.css";
import "./assets/css/refine.css";
import "./assets/css/validate.css";
import "./assets/css/table.css";
import "./assets/css/card.css";
import "./assets/css/dashboard.css";
import ErrorBoundary from "./Components/ErrorBoundary/ErrorBoundary.jsx";
import { Provider } from "react-redux";
import store from "./store.jsx";
import UserDetails from './Components/Context/UserDetails.jsx'
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
