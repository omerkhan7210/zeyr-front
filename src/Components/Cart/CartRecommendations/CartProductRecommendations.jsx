import React, { useContext } from 'react'
import { ProductFetchContext } from '../../Context/ProductFetch'
import { ProductCart } from './ProductCart'
import { CartContextC } from '../../Context/CartContext';

export const CartProductRecommendations = () => {
  const {cartItems} = useContext(CartContextC); 
  const {products} = useContext(ProductFetchContext)
  return (
    <div className="cart-recommendations" data-url="/en-pk/recommendations/products?section_id=cart-drawer&product_id=6974806949953&limit=2">
  <h2 className="cart-recommendations__heading text-center">Complete the look</h2>
  <ul className="cart-recommendations__grid flex jcb list-unstyled" role="list">
  
  {products ? (
  products.length > 0 ? 
    products
      .filter(item => cartItems && !cartItems.map(c => c.id).includes(item.id))
      .map((item, index) => (
        index < 2 ? <ProductCart key={item.id} item={item} /> : null
      ))
    : null
) : (
  // Loading state or placeholder content
  <p>Loading products...</p>
)}


    </ul>
</div>

  )
}
