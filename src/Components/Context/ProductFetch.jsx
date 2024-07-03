import React, { createContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../Actions/ProductActions';
import { hostLink } from '../Hostlink/hostlink';
import axios from 'axios';

export const ProductFetchContext = createContext();

const ProductFetch = ({ children }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.products);
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState('USD');
  const [selectedCurrencySymbol, setSelectedCurrencySymbol] = useState('$');
  const [selectedCurrencyLocale, setSelectedCurrencyLocale] = useState('en-US'); 
  const countryLocales = {
    "AUD": "en-AU",
    "BHD": "ar-BH", // Replace with the actual locale code
    "KWD": "ar-KW", // Replace with the actual locale code
    "MYR": "en-MY",
    "NZD": "en-NZ",
    "OMR": "ar-OM", // Replace with the actual locale code
    "PKR": "ur-PK", // Replace with the actual locale code
    "QAR": "ar-QA", // Replace with the actual locale code
    "SAR": "ar-SA", // Replace with the actual locale code
    "SGD": "en-SG",
    "TRY": "tr-TR",
    "AED": "ar-AE", // Replace with the actual locale code
    "USD": "en-US"
  };

  const products = useSelector((state) => state.products.products);
  const menProducts = useSelector((state) => state.products.menProducts);
  const womenProducts = useSelector((state) => state.products.womenProducts);

  // Fetch the user UUID from localStorage
  const userUUID = localStorage.getItem('userUUID');

// Function to map currency symbols based on currency code
const getCurrencySymbol = (currencyCode) => {
  switch (currencyCode) {
    case 'USD':
      return '$';
    case 'AED':
      return 'د.إ'; // Actual symbol for AED
    case 'AUD':
      return 'A$'; // Actual symbol for AUD
    case 'BHD':
      return 'BD'; // Actual symbol for BHD
    case 'KWD':
      return 'د.ك'; // Actual symbol for KWD
    case 'MYR':
      return 'RM'; // Actual symbol for MYR
    case 'NZD':
      return 'NZ$'; // Actual symbol for NZD
    case 'OMR':
      return '﷼'; // Actual symbol for OMR
    case 'PKR':
      return '₨'; // Actual symbol for PKR
    case 'QAR':
      return '﷼'; // Actual symbol for QAR
    case 'SAR':
      return '﷼'; // Actual symbol for SAR
    case 'SGD':
      return 'S$'; // Actual symbol for SGD
    case 'TRY':
      return '₺'; // Actual symbol for TRY
    case 'AED':
      return 'د.إ'; // Actual symbol for AED
    // Add more cases for other currency codes
    default:
      return '$'; // Default to '$' if the currency code is not recognized
  }
};
const postCurrencyCode = async () => {
  try {
    const response = await axios.post(`${hostLink}/post-currency`, { selectedCurrencyCode });
     } catch (error) {
    console.error('Error:', error);
  }
};

  // Update currency symbol when selectedCurrencyCode changes
  useEffect(() => {
    postCurrencyCode();
    const symbol = getCurrencySymbol(selectedCurrencyCode);
    setSelectedCurrencySymbol(symbol);
  // Update selected currency locale based on the new currency code
  setSelectedCurrencyLocale(countryLocales[selectedCurrencyCode]);
  }, [selectedCurrencyCode]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user currency preferences
        const response = await axios.get(`${hostLink}/user-currency-preferences/${userUUID}`);
        const results = response.data.results[0]
        if(results){

          const userCurrencyPreferences = results.currency_code;
          setSelectedCurrencyCode(userCurrencyPreferences)
        }
      } catch (error) {
        console.error('Error fetching user currency preferences:', error);
      }

      // Fetch products
      dispatch(fetchProducts(selectedCurrencyCode));
    };

    fetchData();
  }, [dispatch, userUUID]);

  const handleRetry = () => {
    dispatch(fetchProducts());
  };


  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ProductFetchContext.Provider value={{ userUUID, selectedCurrencyLocale,selectedCurrencySymbol,selectedCurrencyCode, setSelectedCurrencyCode, loading, error, menProducts, womenProducts, handleRetry, products }}>
      {children}
    </ProductFetchContext.Provider>
  );
};

export default ProductFetch;
