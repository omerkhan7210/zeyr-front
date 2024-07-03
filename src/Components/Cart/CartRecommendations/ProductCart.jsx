import React,{useContext} from 'react'
import { hostLink } from '../../Hostlink/hostlink'
import AddtoWishlistButton from '../../Wishlist/AddtoWishlistButton'
import { ProductFetchContext } from '../../Context/ProductFetch';
import PriceFormatter from '../../Products/PriceFormatter';

export const ProductCart = ({item}) => {
  const {selectedCurrencyLocale,selectedCurrencyCode} = useContext(ProductFetchContext);

  return (
    <li>      
      <div id={6974804885569} className="product-card">
        <div className="product-card__media container media media-ratio" style={{"--media-ratio": '133.48164627363738%'}}>              
          <a href={`/products/${item.slug}`} 
          title={item.name}>        
            <div className="media--primary">                    
              
                 <img loading="lazy" src={`${hostLink}/uploads/${item.featuredImage}`} 
                 alt={item.name} width={550} height="733.3333333333334" style={{imageFocal: 'middle'}} />
                         
            </div></a>  
          <div className="product-info__floating content--floating content--full-width">                                 
          </div>        
        </div><div className="product-card__info"><div className="flex--column flex jcb flex--mobile">
            <div>          
              <div className="product-card__title">
                <a href={`/products/${item.slug}`} className="link-styled">
                 {item.name}
                </a>
              </div></div>
            <div className="price-rating__wrapper body-1">
              <div id="price-cart-drawer" className="price flex aic flex--wrap flex--gap" role="status" style={{flexGap: '0 .5rem'}}>
                <span className="price-item price-item--regular" aria-label="Regular price">
                <PriceFormatter price={item.price} locale={selectedCurrencyLocale} currencyCode={selectedCurrencyCode}/>

                  </span>

                </div>
            </div>        
          </div>
          
            <div className="product-form__error-message-wrapper" role="alert" hidden>
              <span className="product-form__error-message" />
            </div><form method="post" id="product-form-cart-drawer" acceptCharset="UTF-8" className="form" encType="multipart/form-data" noValidate="novalidate" data-type="add-to-cart-form"><input type="hidden" name="form_type" defaultValue="product" /><input type="hidden" name="utf8" defaultValue="✓" /><input type="hidden" name="id" defaultValue={40473025544257} /><div className="loading-overlay__spinner" hidden>
                <svg aria-hidden="true" focusable="false" role="presentation" className="spinner" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                  <circle className="path" fill="none" strokeWidth={6} cx={33} cy={33} r={30} />
                </svg>
              </div>
              <button type="submit" name="add" className="product-form__submit btn btn--primary content--full-width" hidden aria-haspopup="dialog">
                <span>Add to bag
                </span>                
              </button>
              </form>
              </div>    
            <AddtoWishlistButton product={item}/>
      </div>
    </li>
  )
}
