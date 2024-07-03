import React,{useContext, useEffect, useState} from 'react'
import {  Link, useParams } from 'react-router-dom'
import { hostLink } from '../../../Hostlink/hostlink'
import { ProductFetchContext } from '../../../Context/ProductFetch'
import PriceFormatter from '../../../Products/PriceFormatter'
import { AdminContextC } from '../../../Context/AdminContext'
import jwtDecode from 'jwt-decode'
import { UserDetailsContext } from '../../../Context/UserDetails'

export const SingleOrderContainer = () => {

  
  const {  history } = useContext(UserDetailsContext);
const { orderid } = useParams(); 
const { selectedCurrencyLocale, selectedCurrencyCode } = useContext(ProductFetchContext);
  const [orderDate, setOrderDate] = useState();
  const [orderDateDiff, setOrderDateDiff] = useState();
  const { orders,loading } = useContext(AdminContextC);
  const [filtered,setFiltered] = useState([])
  const [filteredProducts,setFilteredProducts] = useState([])
  const [product,setProducts] = useState([])
  const [bAddress,setBAddress] = useState([])
  const [shippingMethod,setShippingMethod] = useState([])
  
  useEffect(() => {

    const checkAuth = async () => {
      const token = getToken();

      if (!token) {
        // If there's no token, redirect to the login page
        history('/login');
        return;
      }

      // Check if the token is expired
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp < Date.now() / 1000) {
        // If the token is expired, remove the token from the cookie and redirect to the login page
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        history('/login');
        return;
      }
    }
    checkAuth();
  }, [history]);

  const getToken = () => {
    // Get the token from the cookie
    const tokenCookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith('token='));

    if (tokenCookie) {
      const token = tokenCookie.split('=')[1];
      return token;
    }

    return null; // Token not found or empty cookie, return null or any other appropriate value
  };


  useEffect(() => {
    if (loading) {
      // If loading is true, show loading indicator
      return;
    }
  
    // Assuming orders is an array
    if (orders) {
      const filtered = orders.filter(order => order.order_id == orderid);

      setFiltered(filtered)
     
      if (filtered.length > 0) {
        const filteredProducts = filtered[0];
        setFilteredProducts(filteredProducts);
        setProducts(filteredProducts.products);
        setBAddress(filteredProducts.addresses[0]);
        setShippingMethod(filteredProducts.shipping[0]);
        
      }
    }
  }, [loading, orderid, orders]);

  const selectedVars = filtered.map(order =>
    product.map(product =>
      JSON.parse(product.selectedVariations)
    )
  );

  const formattedVariations = selectedVars.map(vars =>
    vars.map(variation =>
      Object.entries(variation)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ')
    )
  );
  

  useEffect(() => {
    if (filteredProducts.order_date) {
      const dateObject = new Date(filteredProducts.order_date);

      const options = { day: "numeric", month: "long", year: "numeric" };
      const formattedDate = dateObject.toLocaleDateString("en-US", options);
      setOrderDate(formattedDate)

      // Convert the formatted date string to a Date object
      const formattedDate2 = new Date(formattedDate);

      // Get the current date
      const currentDate = new Date();

      // Calculate the time difference in milliseconds
      const timeDifference = currentDate.getTime() - formattedDate2.getTime();

      // Convert the time difference to days
      const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
      setOrderDateDiff(daysDifference)

    }
  }, [filteredProducts])

  return (
    loading ? <p className='cart-sidebar-loading'> <img src='/images/loadingGIF.gif'  width={"30px"}/></p> : 
    <div className="app-content order-history-my-account light">
      <Link to="/my-zf" style={{textAlign:'center'}}><i className='fa fa-arrow-left' style={{marginRight:'5px'}}></i>Return to My Account</Link>
    
    <div className="app-content-header" style={{marginBottom:'2rem'}}>
      
    <h1 className="app-content-headerText" style={{marginLeft:'2rem'}}>Order ID: MYZF{filteredProducts.order_id}</h1>
      
    </div>

    {filteredProducts ?
      <div className='container d-flex g2' style={{ marginInline: "2rem" }}>
         {/*PRODUCT DETAILS*/}
         <div className='flex-c productsdetails'>
          <h6 style={{ textAlign: 'center' }}>Product Details</h6>
          <div className="tableView products-area-wrapper ">
          <div className="products-header">
        <div className="product-cell image">
          Products
         
        </div>
    {product && product.length > 0 && product[0].categories ?
<div className="product-cell category">Category</div>
  : 
<>
<div className="product-cell category">Total Duration</div>
<div className="product-cell category">Discount %</div>
</>
        
        }
        <div className="product-cell price">Product Price</div>
        <div className="product-cell price">Selected Variations</div>
        <div className="product-cell price">Quantity</div>
        
        <div className="product-cell price">Total Price (With Shipping)</div>
        
          <div className="product-cell price">Actions
         </div>
         
      </div>
            {product.map((product, index) => {
              return (
                <div style={{ marginBottom: '5px' }} key={index} >
 <div className="products-row" key={product.id}>
        <button className="cell-more-button">
          <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-vertical"><circle cx={12} cy={12} r={1} /><circle cx={12} cy={5} r={1} /><circle cx={12} cy={19} r={1} /></svg>
        </button>
        <div className="product-cell image">
        <img src={`${hostLink}/uploads/${product.featuredImage ? product.featuredImage : "placeholder.jpg"}`} alt="" />
         <span>{product.name}</span>
        </div>
        {product.categories !== undefined && product.categories !== null ?
  <div className="product-cell category"><span className="cell-label">Category:</span>{product.categories}</div>
  :
  <>
    <div className="product-cell category"><span className="cell-label">Total Duration:</span>
      {product.duration_months == 12 && `${product.duration_months / 12} year`}
    </div>
    <div className="product-cell category"><span className="cell-label">Discount %:</span>{product.apparel_discount * 100}%</div>
  </>
}

        <div className="product-cell price"><span className="cell-label">Product Price:</span>
        <PriceFormatter price={product.price} locale={selectedCurrencyLocale} currencyCode={selectedCurrencyCode}/>
         </div>

         <div className="product-cell price"><span className="cell-label">Price:</span>
         {formattedVariations}
        </div>

        <div className="product-cell price"><span className="cell-label">Price:</span>
         {product.prod_quantity}
        </div>

        <div className="product-cell price"><span className="cell-label">Product Price:</span>
        <PriceFormatter price={filteredProducts.total_price_with_shipping} locale={selectedCurrencyLocale} currencyCode={selectedCurrencyCode}/>
         </div>

        <div className="product-cell actions" style={{display:'flex',gap:'10px'}}>
          {product.id ? 
        <Link target="_blank" to={`/products/${product.id}`}  style={{marginBottom:'10px'}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
        </Link>
          :
          <Link target="_blank" to={`/memberships`}  style={{marginBottom:'10px'}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
        </Link>
            
          }
        </div>
      </div>
                </div>
              )
            })}
            </div>
        </div>
        <div className="d-flex flex-c userbillingdetails">
             {/*USER DETAILS*/}
        <div className='d-flex flex-c justify-center align-center'  style={{borderBottom:'1px solid'}}>
          <h6 style={{ textAlign: 'center' ,margin:'0'}}>User Details</h6>
          <ul className='order-history-list'>
            <li className='details-order-product'>
              <span>Name: {bAddress.firstName + " " + bAddress.lastName}</span>
              <span>Email: <Link to={`mailto:${bAddress.email}`}>{bAddress.email}</Link></span>
              <span>Phone Number: <Link to={`tel:${bAddress.phone}`}>{bAddress.phone}</Link></span>
              <span style={{textAlign:'center'}}>Address: {bAddress.addressLine1 + " " + bAddress.addressLine2 + ", " + bAddress.zipCode + ", " + bAddress.city + ", " + bAddress.country}</span>
          
            </li>
          </ul>
        </div>

        {/*ORDER DETAILS*/}
        <div className='d-flex flex-c justify-center align-center'>
          <h6 style={{ textAlign: 'center',margin:'0' }}>Order Details</h6>
          <ul className='order-history-list d-flex flex-c align-center' style={{textAlign:'center'}}>
       
            <li className='details-order-product'>
              <span>Order Date: {orderDate}</span>
              <span>Days passed until the order was placed: {orderDateDiff} days</span>
            </li>

{product.id && 
            <li className='details-order-product'>
              <span style={{textAlign:'center'}}>Shipping Method Description : {shippingMethod.description}</span>
              <span>Shipping Method Price: 
                <PriceFormatter price={shippingMethod.price} locale={ selectedCurrencyLocale} currencyCode={selectedCurrencyCode}/>
              </span>
            </li>
}
            <li className='details-order-product'>

              <span>Selected Currency: {selectedCurrencyCode}</span>
              <span>Total Price (without shipping) : <PriceFormatter price={filteredProducts.total_price} locale={selectedCurrencyLocale} currencyCode={selectedCurrencyCode}/>
               
              </span>
              <span>Total Price (with shipping) : <PriceFormatter price={filteredProducts.total_price_with_shipping} locale={selectedCurrencyLocale} currencyCode={selectedCurrencyCode}/>
                </span>
            </li>
          </ul>
        </div>

        </div>
       
      </div>
      :
      <p className='cart-sidebar-loading'> <img src='/images/loadingGIF.gif' width={"30px"} /></p>
    }
    </div>
  )

}
