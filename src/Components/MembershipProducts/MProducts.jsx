import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { hostLink as hostlink } from '../Hostlink/hostlink';
import PriceFormatter from '../Products/PriceFormatter';
import { ProductFetchContext } from '../Context/ProductFetch';
import { CartContextC } from '../Context/CartContext';

 const MProducts = () => {
  const [membership,setMembership] = useState([]);

  const { addToCart,setLoading,loading } = useContext(CartContextC);
 const {selectedCurrencyLocale,selectedCurrencyCode} = useContext(ProductFetchContext);

  const getMemberships=async ()=>{
    try{
      const response = await axios.get(`${hostlink}/api/memberships`);
      setMembership(response.data)
    }catch(error){
      console.log(error)
    }
    
  }
useEffect(()=>{
  getMemberships()
},[])

  return (
    <div className="pricing-container">
    {/* Card 1 */}
   
    {membership.length>0 ?
    membership.map((i)=>(
      <div className="card" key={i.name}>
        <div className="card__info">
          <h2 className="card__name">{i.name}</h2>
          <p className="card__price" > 
          <PriceFormatter price={i.price} locale={selectedCurrencyLocale} currencyCode={selectedCurrencyCode}/>
          <span className="card__priceSpan">/month</span></p>
        </div>
          <div className="card__rows">
            <p className="card__row">5GB Disk Space</p>
            <p className="card__row">10 Domain Names</p>
            <p className="card__row">5 E-Mail Address</p>
            <p className="card__row">50GB Monthly Bandwidth</p>
            <p className="card__row">Fully Support</p>
          </div>
                      <button
                        name="add"
                        id="AddToCartButton"
                        className="product-form__submit body-1 btn btn--primary content--full-width"
                        aria-haspopup="dialog"
                        onClick={(e)=> addToCart(i, "", 1)}
                        >
                        <span>{"Add to bag "}</span>
                        {/* <div
                          className="loading-overlay__spinner"
                          hidden={!loading}
                        >
                          <svg
                            aria-hidden="true"
                            focusable="false"
                            role="presentation"
                            className="spinner"
                            viewBox="0 0 66 66"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              className="path"
                              fill="none"
                              strokeWidth={6}
                              cx={33}
                              cy={33}
                              r={30}
                            ></circle>
                          </svg>
                        </div> */}
                      </button>
        </div>
    ))
    : null
    }
    </div>


  )
}

export default MProducts