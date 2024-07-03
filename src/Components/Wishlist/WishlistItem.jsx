import React, { useContext, useState, useEffect } from "react";
import { WishlistContextC } from "../Context/WishlistContext";
import { Link } from "react-router-dom";
import { hostLink } from "../Hostlink/hostlink";
import { CartContextC } from "../Context/CartContext";
import { ProductFetchContext } from "../Context/ProductFetch";
import PriceFormatter from "../Products/PriceFormatter";

const WishlistItem = ({w}) => {
  const {selectedCurrencyLocale,selectedCurrencyCode} = useContext(ProductFetchContext);

  const { removeFromWishlist } = useContext(WishlistContextC);
  const { addToCart } = useContext(CartContextC);
  const [selectedVariations, setSelectedVariations] = useState({});
  const [allVariationsSelected, setAllVariationsSelected] = useState(false);
const [message, setMessage] = useState(
    "Please Select All Variations before adding to cart"
  );
  
  const [hasColor,setHasColor] = useState(false)
  const [hasSize,setHasSize] = useState(false)

// Function to handle selection change in dropdown
const handleSelectChange = (attributeType, event) => {
  setSelectedVariations((prevSelected) => ({
    ...prevSelected,
    [attributeType]: event.target.value
    
  }));
};

const checkVariationsSelected = () => {
  w.variations.map((v)=>{
    v.attributeValues.map((av)=>{
    av.attributeType === 'color' && setHasColor(true)
    av.attributeType === 'size' && setHasSize(true)
  })
})
  if(hasColor && hasSize){
    return (
      selectedVariations.color !== undefined &&
      selectedVariations.size !== undefined
    );
  }else if(hasColor && !hasSize){
    return (
      selectedVariations.color !== undefined
    );
  }else if(hasSize && !hasColor){
    return (
      selectedVariations.size !== undefined
    );
  }
  
};
  // Update allVariationsSelected state whenever selectedVariations change
  useEffect(() => {
    setAllVariationsSelected(checkVariationsSelected());
  }, [selectedVariations]);

 
  const getSelectedVariationValues = (w) => {
    const selectedVariationValues = {};
    
    w.variations.forEach((attribute) => {
      attribute.attributeValues.map((av)=>{
        const attributeType = av.attributeType;
        if (selectedVariations[attributeType] !== undefined) {
          selectedVariationValues[attributeType] =
            selectedVariations[attributeType];
        }
      })
      
    });
    return selectedVariationValues;
  };

  
  const handleAddToCart = async (event, item) => {
    event.preventDefault();

    const selectedVariationValues = getSelectedVariationValues(item);
  
    if (checkVariationsSelected()) {
     addToCart(item, selectedVariationValues, 1);
      
     handleNavbar("nav")     
     handleopencartsidebar();
    } else {
      if (selectedVariations.color === undefined) {
        setMessage("Please select color before adding to cart.");
      } else if (selectedVariations.size === undefined) {
        setMessage("Please select size before adding to cart.");
      } else if (
        selectedVariations.size === undefined &&
        selectedVariations.color === undefined
      ) {
        setMessage("Please select all variations before adding to cart.");
      }
    }
  };
  const groupedVariations = {};

  return (
   
            <div className="wk-grid__item ">
              <button
                className="wk-button wk-button--remove wk-button--floating"
                title="Remove from Wishlist"
                onClick={() => removeFromWishlist(w.id)}
              >
                <div className="wk-icon wk-button__icon">
                  <svg
                    className="wk-icon__svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 64 64"
                    version="1.1"
                  >
                    <path
                      vectorEffect="non-scaling-stroke"
                      d="M0.309,0.309a0.9,0.9,0,0,1,1.268,0L63.691,62.423a0.9,0.9,0,0,1-1.268,1.268L0.309,1.577A0.9,0.9,0,0,1,.309.309Z"
                    ></path>
                    <path
                      vectorEffect="non-scaling-stroke"
                      d="M63.691,0.309a0.9,0.9,0,0,1,0,1.268L1.577,63.691A0.9,0.9,0,0,1,.309,62.423L62.423,0.309A0.9,0.9,0,0,1,63.691.309Z"
                    ></path>
                  </svg>
                </div>
              </button>
              <Link
                to={`/products/${w.slug}`}
                className="wk-product-image"
                title="View product"
                style={{
                  backgroundImage: `url(${
                    hostLink + "/uploads/" + w.featuredImage
                  })`,
                }}
              ></Link>
              <div className="wk-product-info">
                <Link className="wk-product-title" to={`/products/${w.id}`}>
                  {w.name}
                </Link>
                <div className="wk-product-price">
                  <span className="wk-product-price--current"> <PriceFormatter price={w.price} locale={selectedCurrencyLocale} currencyCode={selectedCurrencyCode}/>
</span>
                </div>
              </div>
              {/* Display variations */}
              {w.variations && w.variations.length > 0 && (
                <form onSubmit={(event) => handleAddToCart(event, w)}>
                <div className="wk-product-form__options">
                
{w.variations.forEach((v) => {
  v.attributeValues.forEach((av) => {
    if (!groupedVariations[av.attributeType]) {
      groupedVariations[av.attributeType] = [];
    }
    groupedVariations[av.attributeType].push(av);
  });
})
}
{Object.entries(groupedVariations).map(([attributeType, attributeValues]) => (
 <select
 key={attributeType}
      className="wk-product-form__option__select"
      onChange={(e) => handleSelectChange(attributeType, e)}
    >
      {!selectedVariations[attributeType] && (
        <option value={null}>Select {attributeType}</option>
      )}
      {attributeValues.map((av) => (
        <option key={av.id} value={av.attributeValue}>
          {av.attributeValue}
        </option>
      ))}
    </select>
))
      }
                </div>

                  <button
                    type="submit"
                    className="wk-product-form__submit"
                    disabled={!allVariationsSelected}
                  >
                    Add to Bag
                  </button>
                  {!allVariationsSelected && (
                    <p style={{ color: "red",marginTop:'1rem' }}>
                      Please select all variations before adding to cart.
                    </p>
                  )}
                </form>
              )}
            </div>
   
  );
};

export default WishlistItem;
