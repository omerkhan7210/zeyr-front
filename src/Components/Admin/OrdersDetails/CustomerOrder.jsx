import React, { useContext, useState } from 'react'
import { hostLink } from '../../Hostlink/hostlink';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { ProductFetchContext } from '../../Context/ProductFetch';
import PriceFormatter from '../../Products/PriceFormatter';
import { AdminUsersContextC } from '../../Context/AdminUsersContext';

export const CustomerOrder = () => {

    const {orderID} = useParams();
    const {selectedCurrencyLocale,selectedCurrencyCode} = useContext(ProductFetchContext);
    const [loading, setLoading] = useState(false)
    const {productDetails,setProductDetails,billingDetails,setBillingDetails,shippingDetails,setShippingDetails} = useContext(AdminUsersContextC)
    
      const fetchOrder = async ()=> {
        try {
          const response = await axios.get(`${hostLink}/fetch-all-orders-admin/${orderID}`);
          return response.data.orders;
        } catch (error) {
          console.error(error);
        }
      }
      useEffect(() => {
        let isMounted = true; // Variable to track component mount status
      
        const fetchData = async () => {
          setLoading(true);
      
          try {
            const orders = await fetchOrder();
            const groupedOrders = orders.reduce((acc, order) => {
              const orderId = order.order.order_id;
          
              if (!acc[orderId]) {
                acc[orderId] = {
                  billingDetails: [],
                  shippingDetails: [],
                  productDetails: [],
                };
              }
          
              const selectedVars = order.products.map((product) => JSON.parse(product.selectedVars));
              const formattedVariations = selectedVars.map((vars) =>
                Object.entries(vars)
                  .map(([key, value]) => `${key}: ${value}`)
                  .join(', ')
              );
          
              const productData = order.products.map((product, index) => ({
                id: product.id,
                name: product.name,
                category: product.categories,
                featuredImage: product.featuredImage,
                sku: product.sku,
                price: product.price,
                quantity: product.quantity,
                selectedVars: formattedVariations[index],
              }));
          
              const billingData = {
                email: order.billingAddress.email,
                firstName: order.billingAddress.firstName,
                lastName: order.billingAddress.lastName,
                company: order.billingAddress.company,
                addressLine1: order.billingAddress.addressLine1,
                addressLine2: order.billingAddress.addressLine2,
                city: order.billingAddress.city,
                country: order.billingAddress.country,
                zipCode: order.billingAddress.zipCode,
              };
          
              const shippingData = {
                shipping_name: order.shippingMethod.name,
                shipping_price: order.shippingMethod.price,
                description: order.shippingMethod.description,
              };
          
              acc[orderId].billingDetails.push(billingData);
              acc[orderId].shippingDetails.push(shippingData);
              acc[orderId].productDetails.push(...productData);
          
              return acc;
            }, {});
        
      
            // Convert grouped orders back to an array
            const uniqueOrdersArray = Object.values(groupedOrders);
      
            // Combine product details from all orders into a single array
            const allProductDetails = uniqueOrdersArray.reduce(
              (accumulator, order) => accumulator.concat(order.productDetails),
              []
            );
      
            // Combine product details from all orders into a single array
            const allShippingDetails = uniqueOrdersArray.reduce(
              (accumulator, order) => accumulator.concat(order.shippingDetails),
              []
            );
      
            // Combine product details from all orders into a single array
            const allBillingDetails = uniqueOrdersArray.reduce(
              (accumulator, order) => accumulator.concat(order.billingDetails),
              []
            );
      
            // Check if the component is still mounted before updating state
            if (isMounted) {
              
              // Set the combined product details in the state
              setProductDetails(allProductDetails);
              // Set the combined product details in the state
              setBillingDetails(allBillingDetails);
              // Set the combined product details in the state
              setShippingDetails(allShippingDetails);
    
              // Remove duplicates based on product ID
            const uniqueProductDetails = Array.from(new Set(allProductDetails.map(item => item.id)))
            .map(id => allProductDetails.find(item => item.id === id));
          
          setProductDetails(uniqueProductDetails);
    
          // Remove duplicates based on shipping_name
          const uniqueShippingDetails = allShippingDetails.filter(
            (shippingDetail, index, self) =>
              index ===
              self.findIndex(
                (s) => s.shipping_name === shippingDetail.shipping_name
              )
          );
    
          setShippingDetails(uniqueShippingDetails);
    
          // Remove duplicates based on all fields
          const uniqueBillingDetails = allBillingDetails.filter(
            (billingDetail, index, self) =>
              index ===
              self.findIndex((b) =>
                Object.keys(b).every((key) => b[key] === billingDetail[key])
              )
          );
    
          setBillingDetails(uniqueBillingDetails);
            }
          } catch (error) {
            console.error('Error fetching order:', error);
          } finally {
            // Check if the component is still mounted before setting loading to false
            if (isMounted) {
              setLoading(false);
            }
          }
        };
      
        fetchData();
      
        // Cleanup function to set isMounted to false when the component unmounts
        return () => {
          isMounted = false;
        };
      }, []); 

  return (
    loading ? <p className='cart-sidebar-loading'> <img src='/images/loadingGIF.gif'  width={"30px"}/></p> : 
    <>
 <div style={{width:'100%',display:'flex',justifyContent:'center',marginBlock:'2rem'}}>
 <Link to='/dashboard/customers' className="product-form__submit btn btn--primary " style={{textAlign:'center'}}>Return to Dashboard</Link>
</div>

<h2 className="h4" style={{textAlign:'center'}}>Order history</h2>

<div className="order-history">

<div className="orderspageleft" >

{ productDetails &&  productDetails.length > 0  ? (
   <>
   
<h6 style={{marginBottom:'5px'}}>Products Details:</h6>

 <div className='d-grid grid-2' style={{placeItems:'center'}}>
    
 <table className='order-history-table'>
<thead>
 <tr>
   <th>Image</th>
   <th>Name</th>
   <th>Category</th>
   <th>SKU</th>
   <th>Quantity</th>
   <th>Price</th>
   <th>Variations</th>
 </tr>
</thead>
<tbody>
 {productDetails.map((product) => (
   <tr key={product.id}>
     <td className='details-order-product image-order-td'>
       <Link to={`/products/${product.id}`}>
         <img className='image-order' src={`${hostLink}/uploads/${product.featuredImage}`} alt="" />
       </Link>
     </td>
     <td className='details-order-product'>
       <span><Link to={`/products/${product.id}`}>{product.name}</Link></span>
     </td>
     <td className='details-order-product'>
       <span>{product.category}</span>
     </td>
     <td className='details-order-product'>
       <span>{product.sku}</span>
     </td>
     <td className='details-order-product'>
       <span>{product.quantity}</span>
     </td>
     <td className='details-order-product'>
       <span><PriceFormatter price={product.quantity * product.price} locale={selectedCurrencyLocale} currencyCode={selectedCurrencyCode} /></span>
     </td>
     <td className='details-order-product'>
       <span>{product.selectedVars}</span>
     </td>
   </tr>
 ))}
</tbody>
</table>

</div>

</>
): (
 <p>No orders for this customer!</p>
)
}
</div>

<div className="orderspageright" >

{billingDetails  && shippingDetails &&
 billingDetails.length > 0 && shippingDetails.length > 0  ? (
   <>
   
 <div className='d-grid' style={{placeItems:'center'}}>
 {billingDetails.map((product) => (
   <div style={{marginBottom:'5px'}} key={product.id} >
     
     <h6 style={{marginBottom:'5px',textAlign:'center'}}>Billing Address Details:</h6>
    
     <ul className='order-history-list'>
      
     <li className='details-order-product'>
     <span>Billing Address:  {product.addressLine1} {product.addressLine2}, {product.zipCode} , {product.city}, {product.country}</span>
</li>
     </ul>
   </div>
 ))
} 
</div>

<div className='d-grid' style={{placeItems:'center'}}>
 {shippingDetails.map((product) => (
   <div style={{marginBottom:'5px'}} key={product.id} >
     <h6 style={{marginBottom:'5px',textAlign:'center'}}>Shipping Details:</h6>
    
     <ul className='order-history-list-shipping'>
      
     <li className='details-order-product'>Shipping Method Name:  {product.shipping_name}</li>
     <li  className='details-order-product'>Shipping Method Price: {product.shipping_price}</li>
     <li  className='details-order-product'>Shipping Method Description: {product.description}</li>
     </ul>
   </div>
 ))
} 
</div>


</>
): (
 <p>No orders for this customer!</p>
)
}
</div>
</div>


</>
  )
}
