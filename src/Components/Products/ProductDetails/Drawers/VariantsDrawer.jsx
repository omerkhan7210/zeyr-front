import React, { useContext, useState, useEffect } from "react";
import { ProductDetailsContext } from "../ProductDetailPage";
import {CartContextC} from '../../../Context/CartContext'
import { hostLink } from "../../../Hostlink/hostlink";
import { NotifyModal } from "./NotifyModal";

export const VariantsDrawer = ({ isNavDrawerOpen }) => {
  const { product, handleNavbar } = useContext(ProductDetailsContext);
  const { addToCart,setLoading,loading } = useContext(CartContextC);
  const [message, setMessage] = useState(
    "Please Select All Variations before adding to cart"
  );
  const [selectedVariations, setSelectedVariations] = useState({});
  const [allVariationsSelected, setAllVariationsSelected] = useState(false);
  const [hasColor,setHasColor] = useState(false)
  const [hasSize,setHasSize] = useState(false)

  const groupedVariations = {};
 
  const handleSelectChange = (attributeType,groupedVariations, event) => {
    const newValue = event.target.value;
    // Create a copy of the selectedVariations object
    const updatedVariations = { ...selectedVariations };
  
    // Set the selected variation for the specified attribute type
    updatedVariations[attributeType] = newValue;

    const selectedVariation = groupedVariations[attributeType].attributeValues.find((variation) => variation.attributeValue === newValue);

    if (selectedVariation && selectedVariation.attributeimg) {
      updatedVariations.attributeimg = selectedVariation.attributeimg;

    } else {
      // If no attribute image is found, clear the attributeImage in the state
      updatedVariations.attributeimg = null;
    }
  

    setSelectedVariations(updatedVariations);
    
  };

  // Function to check if both color and size variations are selected
  useEffect(() => {
    setAllVariationsSelected(checkVariationsSelected());
  }, [selectedVariations]);

  
  const checkVariationsSelected = () => {
    product.variations.map((v)=>{
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
  
  const handleopencartsidebar = () => {
    const cartSidebar = document.querySelector(".cart-drawer");
    cartSidebar.classList.add("drawer--active");
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (checkVariationsSelected()) {
     await addToCart(product, selectedVariations, 1);
    
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
    setSelectedVariations({})
  };
  return (
    <aside>
      <button
        id="drawerTrigger"
        onClick={() => {
          handleNavbar("nav");
        }}
        className="btn btn--primary product__info-select-size-trigger flex aic"
      >
        <span>Select Size/Color</span>
        <span className="flex">
          <svg
            className="icon icon--caret-fill"
            width={10}
            height={6}
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0.5 0.890137H9.5L5 5.89014L0.5 0.890137Z" fill="black" />
          </svg>
        </span>
      </button>
      <div
        className={`drawer side-drawer default-drawer size-select-drawer flex aic jcc ${
          isNavDrawerOpen ? "drawer--active" : ""
        }`}
      >
        <div
          id="drawerOverlay"
          onClick={() => handleNavbar("nav")}
          className="drawer--overlay"
        />
        <div className="drawer__container drawer__container-shipping" style={{ padding: "100px 20px" }}>
          <div className="drawer__container-inner">
            <button
              id="drawerClose"
              onClick={() => handleNavbar("nav")}
              className="drawer__close btn btn--unstyled content--floating"
              aria-label="Drawer close"
            >
              <svg
                className="icon icon--close"
                width={16}
                height={16}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Close"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.43437 7.99993L0.517212 14.9171L1.0829 15.4828L8.00005 8.56562L14.9172 15.4828L15.4829 14.9171L8.56574 7.99993L15.4829 1.08278L14.9172 0.51709L8.00005 7.43424L1.0829 0.51709L0.517212 1.08278L7.43437 7.99993Z"
                  fill="black"
                />
              </svg>
            </button>
            <h2 className="drawer-title smaller-heading text-center">
              Size / Color
            </h2>
            <div
              className="drawer-content"
              style={{ height: "75vh", overflowY: "auto" }}
            >
              <div className="size-select-drawer__links flex aic jce" onClick={()=>handleNavbar("sizeGuide")}>
                <span
                  id="sizeGuideTrigger"
                  className="link-styled size-guide-trigger-flyout flex jce aic"
                >
                  <span className="flex" style={{ paddingRight: "4px" }}>
                    <svg
                      className="icon icon--size-guide"
                      width={17}
                      height={16}
                      viewBox="0 0 17 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.2957 14.6673V1.33398"
                        stroke="black"
                        strokeWidth="0.625"
                        strokeMiterlimit={10}
                      />
                      <path
                        d="M1.96252 1.33398V14.6673"
                        stroke="black"
                        strokeWidth="0.625"
                        strokeMiterlimit={10}
                      />
                      <path
                        d="M13.668 8.00343L3.66785 7.99805"
                        stroke="black"
                        strokeWidth="0.625"
                        strokeMiterlimit={10}
                      />
                      <path
                        d="M11.13 5.5L13.6675 8.0037L11.13 10.4948"
                        stroke="black"
                        strokeWidth="0.625"
                        strokeMiterlimit={10}
                        strokeLinejoin="bevel"
                      />
                      <path
                        d="M6.13403 5.49609L3.66785 8.00293L6.13403 10.4941"
                        stroke="black"
                        strokeWidth="0.625"
                        strokeMiterlimit={10}
                        strokeLinejoin="bevel"
                      />
                    </svg>
                  </span>
                  Size Guide
                </span>
                
              </div>
              {product.variations.forEach((v) => {
  v.attributeValues.forEach((av) => {
    if (!groupedVariations[av.attributeType]) {
      groupedVariations[av.attributeType] = {
        attributeType: av.attributeType,
        attributeValues: [],
        attributeprice: v.attributeprice,
        attributestock: v.attributestock,
        variationid: v.variationid,
      };
    }

   
    groupedVariations[av.attributeType].attributeValues.push(av);
    
  });
})
}
<NotifyModal/>
{Object.entries(groupedVariations).map(([attributeType, attributeValues]) => (
  <div className="variant-options flex flex--column no-js-hidden" key={attributeType}>
    <h6 className="variant-heading">{`Select ${attributeType}`}</h6>
    {attributeValues.attributeValues.map((variation) => (
      <fieldset className="size js product-form__input product-form__input--radios flex flex--wrap flex--column" key={variation.id}>
        <legend className="form__label">
          <span>Select {attributeType}: </span>
        </legend>
        <div className="variant-option-wrapper" key={variation.attributeValue}>
          <input
            value={variation.attributeValue}
            checked={selectedVariations[attributeType] === variation.attributeValue}
            onChange={(e) => handleSelectChange(attributeType,groupedVariations, e)}
            type="radio"
            id={`template-${variation.id}`}
            className={`variant-option ${variation.attributestock === 0 && "sold-out"}`}
          />
          <label
            htmlFor={`template-${variation.id}`}
            className="body-1 flex aic"
          >
            <span className="size-option-value">
              {variation.attributeValue}
            </span>
            
            
            {variation.attributestock !== 0 && attributeType === "color" && variation.attributeimg && (
              <img
                style={{ width: '40px' }}
                src={`${hostLink}/uploads/${variation.attributeimg}`}
                alt={`${variation.attributeValue} Image`}
                className="attribute-image"
              />
            )}

              {
                variation.attributestock === 0 &&

                <div className="variant-option-labels body-2">
                <div className="variant-option-labels__sold-out flex flex--column aie" style={{ display: 'flex' }}>
                  <span className="variant-option__sold-out" style={{ color: '#000' }}>Sold out</span>
                  <span className="variant-option__notify flex jce aic" style={{ color: '#000' }}>
                    <span className="flex" style={{ paddingRight: 4 }}>
                      <svg width={8} height={9} viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M2.56159 1.25585C3.04555 0.771889 3.70195 0.5 4.38638 0.5C5.07081 0.5 5.72721 0.771889 6.21117 1.25585C6.69514 1.73982 6.96703 2.39622 6.96703 3.08065C6.96703 4.2089 7.20809 4.89637 7.42013 5.28511C7.52687 5.48079 7.6291 5.6061 7.69655 5.67729C7.73041 5.71303 7.75586 5.73552 7.76922 5.74664C7.77387 5.75052 7.77707 5.75303 7.77864 5.75424C7.96141 5.88181 8.04197 6.11286 7.97714 6.32699C7.91123 6.54467 7.7106 6.69355 7.48316 6.69355H1.28961C1.06217 6.69355 0.861533 6.54467 0.795624 6.32699C0.730792 6.11286 0.811351 5.88182 0.994117 5.75424C0.995692 5.75303 0.998886 5.75052 1.00354 5.74664C1.0169 5.73552 1.04235 5.71303 1.07621 5.67729C1.14366 5.6061 1.2459 5.48079 1.35263 5.28511C1.56467 4.89637 1.80574 4.2089 1.80574 3.08065C1.80574 2.39622 2.07762 1.73982 2.56159 1.25585Z" fill="black" />
                        <path d="M5.6783 7.46784C5.6783 8.18043 5.1006 8.7581 4.38798 8.7581C3.67535 8.7581 3.09766 8.18043 3.09766 7.46784C3.52776 7.46787 3.67535 7.46787 4.38798 7.46787C5.1006 7.46787 5.24819 7.46777 5.6783 7.46784Z" fill="black" />
                      </svg>
                    </span>
                    Get Notified
                  </span>
                </div>
                <div className="variant-option-labels__last-item flex flex--column aie">
                  <span className="variant-option__last-item" style={{ color: '#000' }}>Only Item Left</span>
                </div>
              </div>
              }

          </label>
        </div>
      </fieldset>
    ))}
  </div>
))}


            </div>

            <div className="drawer-footer flex jcc">
              <div className="product-form">
                <div>
                  <div
                    className="product-form__error-message-wrapper"
                    role="alert"
                    hidden
                  >
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      role="presentation"
                      className="icon icon-error"
                      viewBox="0 0 13 13"
                    >
                      <circle
                        cx="6.5"
                        cy="6.50049"
                        r="5.5"
                        stroke="white"
                        strokeWidth={2}
                      />
                      <circle
                        cx="6.5"
                        cy="6.5"
                        r="5.5"
                        fill="#EB001B"
                        stroke="#EB001B"
                        strokeWidth="0.7"
                      ></circle>
                      <path
                        d="M5.87413 3.52832L5.97439 7.57216H7.02713L7.12739 3.52832H5.87413ZM6.50076 9.66091C6.88091 9.66091 7.18169 9.37267 7.18169 9.00504C7.18169 8.63742 6.88091 8.34917 6.50076 8.34917C6.12061 8.34917 5.81982 8.63742 5.81982 9.00504C5.81982 9.37267 6.12061 9.66091 6.50076 9.66091Z"
                        fill="white"
                      />
                      <path
                        d="M5.87413 3.17832H5.51535L5.52424 3.537L5.6245 7.58083L5.63296 7.92216H5.97439H7.02713H7.36856L7.37702 7.58083L7.47728 3.537L7.48617 3.17832H7.12739H5.87413ZM6.50076 10.0109C7.06121 10.0109 7.5317 9.57872 7.5317 9.00504C7.5317 8.43137 7.06121 7.99918 6.50076 7.99918C5.94031 7.99918 5.46982 8.43137 5.46982 9.00504C5.46982 9.57872 5.94031 10.0109 6.50076 10.0109Z"
                        fill="white"
                        stroke="#EB001B"
                        strokeWidth="0.7"
                      />
                    </svg>
                    <span className="product-form__error-message" />
                  </div>
                  <form
                    id="product-form-template--14940997058625__main"
                    className="form single-product--form"
                    onSubmit={(e) => handleAddToCart(e)}
                  >
                    {!allVariationsSelected && (
                      <p style={{ color: "red", textAlign: "center" }}>
                        {message}
                      </p>
                    )}
                    <div className="product-form__buttons flex flex--column aic jcc">
                      <button
                        type="submit"
                        name="add"
                        id="AddToCartButton"
                        className="product-form__submit body-1 btn btn--primary content--full-width"
                        aria-haspopup="dialog"
                        disabled={!allVariationsSelected}
                      >
                        <span>{loading ? "Adding to bag" : "Add to bag "}</span>
                        <div
                          className="loading-overlay__spinner"
                          hidden={!loading}
                        >
                          <svg
                            aria-hidden="true"
                            focusable="false"
                            role="presentation"
                            className="spinner"
                            viewBox="0 0 66 66"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              className="path"
                              fill="none"
                              strokeWidth={6}
                              cx={33}
                              cy={33}
                              r={30}
                            ></circle>
                          </svg>
                        </div>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

          

          </div>
        </div>
      </div>
    </aside>
  );
};
