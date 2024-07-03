import React,{useContext} from 'react'
import { LocationInfoContext } from "../../Context/LocationInfo";

export const FooterCountryForm = () => {
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
      ];

      
  
  const toggleListVisibility = () => {
    var ul = document.getElementById("FooterCountryList");
    ul.hidden = !ul.hidden; // Toggle the hidden attribute
  };

  return (
    <div className="footer__localization-wrapper flex flex--gap jcb">
    <form
      id="FooterCountryForm"
      acceptCharset="UTF-8"
      className="localization-form no-js-hidden"
    >
      {countryName ? 
      <div className="disclosure ">
        <button
          type="button"
          className="btn btn--unstyled aic"
          aria-expanded="false"
          aria-controls="FooterCountryList"
          aria-describedby="FooterCountryLabel"
          onClick={toggleListVisibility}
        >
          <span>LOCATION:</span>
          {countryName}
          <svg
            className="icon icon--caret-fill"
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.5 0.890137H9.5L5 5.89014L0.5 0.890137Z"
              fill="black"
            ></path>
          </svg>
        </button>
        <ul
          id="FooterCountryList"
          role="list"
          className="disclosure__list list-unstyled content--floating"
          hidden
        >
       
        
       {countries
                    .filter((country) => country !== countryName) // Exclude the selected country
                    .map((country) => (
                        <li className="disclosure__item" tabIndex="-1" key={country}>
                        <a
                          className="link-styled--reverse focus-inset"
                          href="#"
                          data-value="ZM"
                        >
                          
                        {country}
                          <span className="localization-form__currency"></span>
                        </a>
                      </li>
                      
                    ))}
         
        </ul>
      </div>
      : <p>Loading...</p>  
    }
    </form>
  </div>
  )
}
