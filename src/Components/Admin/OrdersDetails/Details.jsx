import React, { useContext, useEffect, useState } from 'react'
import { AdminContextC } from '../../Context/AdminContext'
import {  Link } from 'react-router-dom';
import { hostLink } from '../../Hostlink/hostlink';
import PriceFormatter from '../../Products/PriceFormatter';
import { ProductFetchContext } from '../../Context/ProductFetch';
import ToggleSwitchButton from '../ToggleSwitchButton';
import axios from 'axios'

export const Details = () => {
  const { orders,orderId,loading } = useContext(AdminContextC);
  const { selectedCurrencyLocale, selectedCurrencyCode } = useContext(ProductFetchContext);
  const [orderDate, setOrderDate] = useState();
  const [orderDateDiff, setOrderDateDiff] = useState();
  const [filteredProducts,setFilteredProducts] = useState([])
  const [product,setProducts] = useState([])
  const [bAddress,setBAddress] = useState([])
  const [shippingMethod,setShippingMethod] = useState([])
  const [orderStatus, setOrderStatus] = useState();
  const [statusOptions, setStatusOptions] = useState(['pending','completed','failed','refunded','on hold','processing','draft']); // Add more statuses as needed
  const [formattedVariations,setFormattedVariations] = useState()

  useEffect(() => {
    if (loading) {
      // If loading is true, show loading indicator
      return;
    }
  
    // Assuming orders is an array
    if (orders) {
      const filtered = orders.filter(order => order.order_id == orderId);
     
      if (filtered.length > 0) {
        const filteredProducts = filtered[0];
        setFilteredProducts(filteredProducts);
        setProducts(filteredProducts.products);
        setBAddress(filteredProducts.addresses[0]);
        setShippingMethod(filteredProducts.shipping[0]);
        setOrderStatus(product.order_status)
  
        const selectedVars = filtered.map(order =>
          order.products.map(product =>
            JSON.parse(product.selectedVariations)
          )
        );
      
        setFormattedVariations(selectedVars.map(vars =>
          vars.map(variation =>
            Object.entries(variation)
              .map(([key, value]) => `${key}: ${value}`)
              .join(', ')
          )
        ))
      }
    }
  }, [loading, orderId, orders]);


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
  // const postCurrencyCode = async () => {
  //   try {
  //     if(currencyCode){
  //       const response = await axios.post(`${hostLink}/post-currency`, { currencyCode });
  //     }

  //      } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  //   // Update currency symbol when selectedCurrencyCode changes
  //   useEffect(() => {
  //     postCurrencyCode();
  //   },[])



  const handleOrderStatusChange = async (newOrderStatus) => {
    // Update the order status locally
    setOrderStatus(newOrderStatus);
    // Call your API to update the order status in the database
    try {
      const response = await axios.post(`${hostLink}/updateOrderStatus`, {
        orderId: filteredProducts.order_id, // Assuming you have an order_id property in your product
        newOrderStatus,
      });

      if (response.status === 200) {
        // Order status updated successfully
        
      } else {
        // Handle error
        console.error('Failed to update order status');
        // Optionally, you can revert the local state to the previous order status
        setOrderStatus(product[0].order_status);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      // Optionally, you can revert the local state to the previous order status
      setOrderStatus(product[0].order_status);
    }
  };


  return (
    <div className="app-content ">
    <div className="app-content-header" style={{marginBottom:'2rem'}}>
      
    <h1 className="app-content-headerText" >Order ID: MYZF{filteredProducts.order_id}</h1>
    <div className='' style={{marginLeft:'1rem'}}>
      <p style={{color:'white',margin:'0'}}>
        Order Status:
        <select
          value={orderStatus}
          onChange={(e) => handleOrderStatusChange(e.target.value)}
          style={{textTransform:'capitalize',paddingRight:'4em'}}
        >
          {statusOptions.map((status) => (
            <option key={status} value={status} >
              {status}
            </option>
          ))}
          <i className='fa fa-chevron-down'></i>
        </select>
      </p>
    </div>
   
     <ToggleSwitchButton/>
      
    </div>

    {filteredProducts ?
      <div className='container d-flex g2'>
         {/*PRODUCT DETAILS*/}
         <div className='flex-c productsdetails'>
          <h6 style={{ textAlign: 'center' }}>Product Details</h6>
          <div className="tableView products-area-wrapper ">
          <div className="products-header">
        <div className="product-cell image">
          Products
         
        </div>
        <div className="product-cell category">Category</div>
         
        <div className="product-cell price">Price</div>
        <div className="product-cell price">Variations</div>
        <div className="product-cell price">Total Quantity</div>
        <div className="product-cell price">Total Price</div>
        <div className="product-cell price">Currency Code </div>
        
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
        <div className="product-cell category"><span className="cell-label">Category:</span>{product.categories}</div>
        
        <div className="product-cell price"><span className="cell-label">Price:</span>
        <PriceFormatter price={product.price} locale={selectedCurrencyLocale} currencyCode={selectedCurrencyCode}/>
         </div>
         
         <div className="product-cell category"><span className="cell-label">Selected Variations:</span>{formattedVariations[0][index]}</div>

         
         <div className="product-cell category"><span className="cell-label">Total Quantity:</span>{product.prod_quantity}</div>

         <div className="product-cell price"><span className="cell-label">Total Price:</span>
        <PriceFormatter price={orders[index].total_price_with_shipping} locale={selectedCurrencyLocale} currencyCode={selectedCurrencyCode}/>
         </div>

         
         <div className="product-cell category"><span className="cell-label">Total Quantity:</span>{orders[index].currency_code}</div>
        
        <div className="product-cell actions" style={{display:'flex',gap:'10px'}}>
          {product.id ? 
        <Link target="_blank" to={`/products/${product.slug}`}  style={{marginBottom:'10px'}}>
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

            <li className='details-order-product'>
              <span style={{textAlign:'center'}}>Shipping Method Description : {shippingMethod.description}</span>
              <span>Shipping Method Price: 
                <PriceFormatter price={shippingMethod.price} locale={ selectedCurrencyLocale} currencyCode={selectedCurrencyCode}/>
              </span>
            </li>

            <li className='details-order-product'>

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
