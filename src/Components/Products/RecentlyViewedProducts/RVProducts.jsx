import React,{useContext} from 'react'
import { hostLink } from '../../Hostlink/hostlink'
import AddtoWishlistButton from '../../Wishlist/AddtoWishlistButton'
import { ProductFetchContext } from '../../Context/ProductFetch';
import PriceFormatter from '../PriceFormatter';

export const RVProducts = ({item}) => {
    const {selectedCurrencyLocale,selectedCurrencyCode} = useContext(ProductFetchContext);

  return (
    <li className="grid__item">
    <div className="product-card" data-appmate>
        <div className="product-card__media container media media-ratio" style={{ mediaRatio: '133.48164627363738%' }}>
        <a 
        href={`/products/${item.id}`} 
        title={item.name}>
            <div className="media--primary">
                <img loading="lazy" 
                src={`${hostLink}/uploads/${item.featuredImage}`} 
                alt={item.name} width={550} height="734.1490545050057"
                 style={{ imageFocal: 'middle' }} />

            </div>
            <div className="media--rollover visually-hidden">
                <img loading="lazy" 
              src={`${hostLink}/uploads/${item.featuredImage}`}  alt={item.name} width={550} height="769.9486700886607" style={{ imageFocal: 'middle' }} />
              
            </div></a>
    </div><div className="product-card__info">
        <div className="flex--column flex jcb flex--mobile">
        <div>
            <div className="product-card__title">
                <a href="/en-pk/products/mx1-jean-clay-indigo-1?_pos=4&_sid=cb3470aa0&_ss=r" className="link-styled">
                    {item.name}
                </a>
            </div></div>
        <div className="price-rating__wrapper body-1">
            <div id="price-template--14940997058625__recently-viewed-products" className="price flex aic flex--wrap flex--gap" role="status" style={{ flexGap: '0 .5rem' }}>
                <span className="price-item price-item--regular" aria-label="Regular price">
                <PriceFormatter price={item.price} locale={selectedCurrencyLocale} currencyCode={selectedCurrencyCode}/>

                    </span>
                    </div>
        </div>
    </div>

            <div className="product-form__error-message-wrapper" role="alert" hidden>
                <span className="product-form__error-message" />
            </div><form method="post" action="/en-pk/cart/add" id="product-form-template--14940997058625__recently-viewed-products" acceptCharset="UTF-8" className="form" encType="multipart/form-data" noValidate="novalidate" data-type="add-to-cart-form"><input type="hidden" name="form_type" defaultValue="product" /><input type="hidden" name="utf8" defaultValue="✓" /><input type="hidden" name="id" defaultValue={39475927482433} /><div className="loading-overlay__spinner" hidden>
                <svg aria-hidden="true" focusable="false" role="presentation" className="spinner" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                    <circle className="path" fill="none" strokeWidth={6} cx={33} cy={33} r={30} />
                </svg>
            </div>
                <button type="submit" name="add" className="product-form__submit btn btn--primary content--full-width" hidden aria-haspopup="dialog">
                    <span>Add to bag
                    </span>
                </button><input type="hidden" name="product-id" defaultValue={6637301661761} /></form></div>
       <AddtoWishlistButton product={item}/>
       
       </div>
</li>
  )
}
