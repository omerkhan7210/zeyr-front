import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import PriceFormatter from '../../Products/PriceFormatter'
import { AdminContextC } from '../../Context/AdminContext'

export const OrderRows = ({order}) => {
 
  const{setOrderID,setActiveLink} = useContext(AdminContextC)

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
    <>
    <style>
  
{`@media screen and (min-width: 768px){
.responsive-table__row {
    grid-template-columns: 50px 250px 247px 158px 144px 156px 155px;
}}
`
}


    </style>
   
      {order &&
      <div className="products-row">
        <button className="cell-more-button">
          <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-vertical"><circle cx={12} cy={12} r={1} /><circle cx={12} cy={5} r={1} /><circle cx={12} cy={19} r={1} /></svg>
        </button>
        <div className="product-cell sales"><span className="cell-label">Order id:</span>{order.order_id}</div>
        <div className="product-cell status-cell">
          <span className="cell-label">Status:</span>
          <span className="status active">{order.products[0].order_status}</span>
        </div>
        <div className="product-cell status-cell">
          <span className="cell-label">Status:</span>
          <span className="status active">{order.payment_status }</span>
        </div>
        <div className="product-cell sales"><span className="cell-label">Order date:</span>{formattedDate}</div>
        <div className="product-cell stock"><span className="cell-label">Order price:</span>
        
        <PriceFormatter price={order.total_price_with_shipping} locale={selectedCurrencyLocale} currencyCode={selectedCurrencyCode}/></div>
        
        <div className="product-cell actions" style={{display:'flex',gap:'10px'}}>
        <a href='#'  onClick={()=>{
          setOrderID(order.order_id)
          setActiveLink('viewOrder')
          }} style={{marginBottom:'10px'}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
        </a>
       
        </div>
      </div>
      }
      </>
  )
}
