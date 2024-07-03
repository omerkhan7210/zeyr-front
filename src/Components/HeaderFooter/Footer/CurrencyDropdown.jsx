import React, { useContext, useState } from 'react';
import { ProductFetchContext } from '../../Context/ProductFetch';
import { hostLink } from '../../Hostlink/hostlink';
import { LocationInfoContext } from '../../Context/LocationInfo';
import axios from 'axios';

export const CurrencyDropdown = () => {
  const {selectedCurrencyCode,setSelectedCurrencyCode,userUUID} = useContext(ProductFetchContext);
  const { countryName } = useContext(LocationInfoContext);
  const countries = [
    "Australia",
    "Bahrain",
    "Kuwait",
    "Malaysia",
    "New Zealand",
    "Oman",
    "Pakistan",
    "Qatar",
    "Saudi Arabia",
    "Singapore",
    "Turkey",
    "UAE",
    "International"
  ];
  const [loading,setLoading] = useState(false)

   // Function to update user currency preferences
const updateUserCurrencyPreferences = async (userUUID, currencyCode, country) => {
  try {
    await axios.post(`${hostLink}/user-currency-preferences`, {
      userUUID,
      currencyCode,
      country,
    });
  } catch (error) {
    console.error('Error updating user currency preferences:', error);
  }
};


  // Define currency codes corresponding to the countries (replace with actual codes)
  const currencyCodes = {
    "Australia": "AUD",
    "Bahrain": "BHD",
    "Kuwait": "KWD",
    "Malaysia": "MYR",
    "New Zealand": "NZD",
    "Oman": "OMR",
    "Pakistan": "PKR",
    "Qatar": "QAR",
    "Saudi Arabia": "SAR",
    "Singapore": "SGD",
    "Turkey": "TRY",
    "UAE": "AED",
    "International": "USD"
  };

// Get the country associated with the selected currency code
const selectedCountry = Object.keys(currencyCodes).find(country => currencyCodes[country] === selectedCurrencyCode);

  const handleCurrencyChange = async (event) => {
    const selectedCurrency = event.target.value;
    setSelectedCurrencyCode(selectedCurrency);
    await updateUserCurrencyPreferences(userUUID,selectedCurrency,countryName)
    setLoading(true)
    setTimeout(()=>{
      setLoading(false)
      window.location.reload();
    },3000)
    
  };
   // Move the selected currency to the front of the countries array
   const reorderedCountries = [
    selectedCountry,
    ...countries.filter(country => country !== selectedCountry),
    
  ];

  return (
    <div>
      <div className="locale-selectors__container" style={{ backgroundColor: 'rgb(255, 255, 255)' }}>
        <div className="locale-selectors__content" style={{ paddingLeft: 0, paddingRight: 0 }}>
            <label className="locale-selectors__label" id="country_code_label" htmlFor="country_code">
              <span>Country/region</span>
              {loading ? 
              <p className='cart-sidebar-loading'> <img src='/images/loadingGIF.gif'  width={"30px"}/></p> 
              :
              <select 
              id="country_code" 
              className="locale-selectors__selector" 
              name="country_code"
              onChange={handleCurrencyChange}
              >
                {reorderedCountries.map((country, index) => (
                 <option key={index} value={currencyCodes[country]}>
                    {country} ({currencyCodes[country]})
                  </option>
                   
                ))}
              </select>
              }
            </label>
        </div>
      </div>
    </div>
  );
};
