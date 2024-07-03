import React, { useContext } from 'react'
import { ProductFetchContext } from '../Context/ProductFetch'
import { ProductRec } from './ProductDetails/Recommendations/ProductRec';
import { CartContextC } from '../Context/CartContext';


export const ProductRecommendations = () => {
  
  const {cartItems} = useContext(CartContextC); 
  const {products} = useContext(ProductFetchContext);
  return (
   <section id="shopify-section-template--14940997058625__product-recommendations" className="shopify-section section section-product-recommendations"><link href="//amiri.com/cdn/shop/t/300/assets/product-card.css?v=162928005787859164681700529321" rel="stylesheet" type="text/css" media="all" />
  <div>
    <div data-url="/en-pk/recommendations/products?section_id=template--14940997058625__product-recommendations&product_id=6974809047105&limit=4">
      <h2 className="product-recommendations__heading text-center small-heading">Recommendations</h2>
      <ul className="product-recommendations__grid flex list-unstyled" role="list">
       {products && products.length > 0 ?
        products
        .filter(item => cartItems && !cartItems.map(c => c.id).includes(item.id))
       .map((item,index)=>{
        if(index < 4){
          return <ProductRec key={item.id} item={item}/>
        }
       })
       : <p className='cart-sidebar-loading'> <img src='/images/loadingGIF.gif'  width={"30px"}/></p>
      }
      </ul>
    </div>
  </div>
</section>


  )
}
