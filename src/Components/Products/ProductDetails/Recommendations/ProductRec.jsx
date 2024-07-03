import React,{useContext} from 'react'
import AddtoWishlistButton from '../../../Wishlist/AddtoWishlistButton';
import { ProductDetailsContext } from "../ProductDetailPage";
import { hostLink } from '../../../Hostlink/hostlink';
import { ProductFetchContext } from '../../../Context/ProductFetch';
import PriceFormatter from '../../PriceFormatter';
export const ProductRec = ({item}) => {
    
  const { product } = useContext(ProductDetailsContext);
  const {selectedCurrencyLocale,selectedCurrencyCode} = useContext(ProductFetchContext);

  return (
    <li className="fade-in-up transition-delay" style={{gridLayout: '25%', transitionDelay: '0.45s'}}>
          <div id={6974808490049} className="product-card">
            <div className="product-card__media container media media-ratio" style={{mediaRatio: '133.48164627363738%'}}>              
              <a href={`/products/${item.id}`} title={item.name}>        
                <div className="media--primary">                    
                    <img loading="lazy" src={`${hostLink}/uploads/${item.featuredImage}`}  alt={item.name} width={550} height="734.1490545050057" style={{imageFocal: 'middle'}} />           
                </div>
                <div className="media--rollover visually-hidden">
                  <img loading="lazy" src={`${hostLink}/uploads/${item.featuredImage}`} alt={item.name} width={550} height="734.1490545050057" style={{imageFocal: 'middle'}} />
                </div>
                </a>  
              <div className="product-info__floating content--floating content--full-width">                                 
              </div>        
            </div>
            <div className="product-card__info">
              <div className="flex--column flex jcb flex--mobile">
                <div>          
                  <div className="product-card__title">
                    <a href={`/products/${item.id}`} className="link-styled">
                     {item.name}
                    </a>
                  </div>
                  </div>
                <div className="price-rating__wrapper body-1">
                  <div id="price-template--14940997058625__product-recommendations" className="price flex aic flex--wrap flex--gap" role="status" style={{flexGap: '0 .5rem'}}>
                    <span className="price-item price-item--regular" aria-label="Regular price"><PriceFormatter price={item.price} locale={selectedCurrencyLocale} currencyCode={selectedCurrencyCode}/>
</span>
                  </div>
                </div>        
              </div>
                <div className="product-form__error-message-wrapper" role="alert" hidden>
                  <span className="product-form__error-message" />
                </div>
               
                  </div>    
           <AddtoWishlistButton product={product}/>
            </div>            
        </li>
  )
}
