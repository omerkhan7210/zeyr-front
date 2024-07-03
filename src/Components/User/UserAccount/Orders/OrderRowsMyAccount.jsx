import React from 'react'
import PriceFormatter from '../../../Products/PriceFormatter';
import { Link } from 'react-router-dom';

export const OrderRowsMyAccount = ({order}) => {
  const dateObject = new Date(order.order_date);
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
  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = dateObject.toLocaleDateString("en-US", options);
  const selectedCurrencyCode = order.currency_code;
const selectedCurrencyLocale = countryLocales[selectedCurrencyCode]
  return (
    <div className="products-row">
            <button className="cell-more-button">
              <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-vertical"><circle cx={12} cy={12} r={1} /><circle cx={12} cy={5} r={1} /><circle cx={12} cy={19} r={1} /></svg>
            </button>
            <div className="product-cell sales"><span className="cell-label">Order id:</span>{order.order_id}</div>
            {order.products.length &&
            <div className="product-cell status-cell">
              <span className="cell-label">Status:</span>
              <span className={`status ${order.products[0].order_status}`}>{order.products[0].order_status}</span>
            </div>
            }
            <div className="product-cell status-cell">
              <span className="cell-label">Status:</span>
              <span className={`status ${order.payment_status}`}>{order.payment_status }</span>
            </div>
            <div className="product-cell sales"><span className="cell-label">Order date:</span>{formattedDate}</div>
            <div className="product-cell stock"><span className="cell-label">Order price:</span>
            
            <PriceFormatter price={order.total_price_with_shipping} locale={selectedCurrencyLocale} currencyCode={selectedCurrencyCode}/></div>
            
            <div className="product-cell actions" style={{display:'flex',gap:'10px'}}>
            <Link to={`/my-zf/${order.order_id}`} style={{marginBottom:'10px'}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" class="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            </Link>
           
            </div>
          </div>
  )
}
