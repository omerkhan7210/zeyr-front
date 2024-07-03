import React, { useContext } from 'react';
import { UserDetailsContext } from '../Context/UserDetails';

const PriceFormatter = ({ price, locale, currencyCode }) => {
 // const { membership } = useContext(UserDetailsContext);
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    maximumFractionDigits: 0, // Set this to 0 to display only whole numbers
  });

  let formattedPrice = formatter.format(price);

  // if (membership) {
  //   // Assuming membership.discount is a percentage, convert it to a fraction
  //   const discountFraction = membership.discount / 100;
  //   formattedPrice = formatter.format(price - price * discountFraction);
  // }

  return formattedPrice;
};

export default PriceFormatter;
