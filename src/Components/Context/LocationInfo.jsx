import React, { createContext , useEffect, useState } from 'react';
import { useGeolocation } from "@uidotdev/usehooks";

export const LocationInfoContext = createContext();

const LocationInfo = ({children}) => {
    const state = useGeolocation();
    const [countryCode,setCountryCode] = useState('');
    const [countryName,setCountryName] = useState('');
    const [address,setAddress] = useState('');
    const [postalCode,setPostalCode] = useState('');
    const [currencyCode,setCurrencyCode]= useState('')
    const [currencyName,setCurrencyName]= useState('')
    const [currencySymbol,setCurrencySymbol]= useState('')
    const [flagUrl,setFlagUrl] = useState('');

    useEffect(() => {
      if (state.error) {
        console.error("Enable permissions to access your location data");
        return;
      }

      if (!state.loading) {
        fetch(
          `https://api.ipgeolocation.io/timezone?apiKey=65d9dbb6733446c28c48e2c4124f6fe8&lat=${state.latitude}&long=${state.longitude}`
        )
          .then((response) => response.json())
          .then((data) => {
          const [continent, city] = data.timezone.split('/');
          fetch(
            `https://api.ipgeolocation.io/timezone?apiKey=65d9dbb6733446c28c48e2c4124f6fe8&location=${city}`
          )
          .then((response) => response.json())
          .then((data) => {
            const country = data.geo.country
            setCountryName(country)
          })
          })
          .catch((error) => console.error("Error:", error));
      }
    }, [state.latitude, state.longitude, state.loading, state.error]);

    if (countryName) {
      fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then((response) => response.json())
        .then((data) => {
          setCurrencyCode(Object.keys(data[0]?.currencies)[0]); // Assuming there's only one currency
          setCurrencyName(data[0]?.currencies[currencyCode]?.name || '');
          setCurrencySymbol(data[0].currencies[currencyCode]?.symbol || '');
          // Get the flag URL
          setFlagUrl(data[0].flags?.svg); // You can use 'png' instead of 'svg' for PNG format
        })
        .catch((error) => console.error("Error:", error));
    }

  return (
    <>
    
    <LocationInfoContext.Provider value={{countryCode,countryName,currencyCode,currencyName,currencySymbol,flagUrl}}>
        {children}
    </LocationInfoContext.Provider></>
  )
}

export default LocationInfo;
