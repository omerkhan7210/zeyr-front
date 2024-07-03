
import React,{useContext} from 'react';
import { hostLink as hostlink } from '../../Hostlink/hostlink';
import AddtoWishlistButton from "../../Wishlist/AddtoWishlistButton";
import { ProductFetchContext } from '../../Context/ProductFetch';
import PriceFormatter from '../../Products/PriceFormatter';

const SearchItem = ({ item }) => {
  const {selectedCurrencyLocale,selectedCurrencyCode} = useContext(ProductFetchContext);

  return (
    <li className="grid__item">
      <div id="6974808883265" className="product-card" >
        <div className="product-card__media container media media-ratio">
          <a href={"/products/" + item.id} title={`Navigate to ${item.name} `}>
            <div className="media--primary">
              <img
                src={`${hostlink}/uploads/` + item.featuredImage}
                alt={item.name}
                loading="lazy"
                width="2697"
                height="3600.0000000000005"
              />
            </div>
          </a>
          <div className="product-info__floating content--floating content--full-width"></div>
        </div>
        <div className="product-card__info">
          <div className="flex--column flex jcb flex--mobile">
            <div>
              <div className="product-card__title">
                <a href={"/products/" + item.id} className="link-styled">
                  {item.name}
                </a>
              </div>
            </div>
            <div className="price-rating__wrapper body-1">
              <div
                id="price-"
                className="price flex aic flex--wrap flex--gap"
                role="status"
              >
                <span
                  className="price-item price-item--regular"
                  aria-label="Regular price"
                >
                  <PriceFormatter price={item.price} locale={selectedCurrencyLocale} currencyCode={selectedCurrencyCode}/>

                </span>
              </div>
            </div>
          </div>
        </div>
        <AddtoWishlistButton product={item} />
      </div>
    </li>
  );
};
export default SearchItem;

