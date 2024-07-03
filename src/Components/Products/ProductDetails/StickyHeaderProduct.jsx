import React, { useContext } from "react";
import { ProductDetailsContext } from "./ProductDetailPage";
import { hostLink } from "../../Hostlink/hostlink";
import { ProductFetchContext } from "../../Context/ProductFetch";
import PriceFormatter from "../PriceFormatter";

export const StickyHeaderProduct = () => {
  const {selectedCurrencyLocale,selectedCurrencyCode} = useContext(ProductFetchContext);

  const { product, handleNavbar } = useContext(ProductDetailsContext);

  return (
    <div className="sticky-atc">
      <div className="sticky-left-content flex aic">
        <img
          width={30}
          height={40}
          src={hostLink + "/uploads/" + product.featuredImage}
          alt={product.name}
        />
        <div
          id="price-template--14940997058625__main"
          className="price flex aic flex--wrap flex--gap"
          role="status"
          style={{ flexGap: "0 0.5rem" }}
        >
          <span
            className="price-item price-item--regular"
            aria-label="Regular price"
          >
             <PriceFormatter price={product.price} locale={selectedCurrencyLocale} currencyCode={selectedCurrencyCode}/>
          </span>
          <div className="price__unit-price">
            <small hidden aria-hidden="true">
              <span className="visually-hidden">Unit price</span>
              <span>
                <span />
                <span aria-hidden="true">/</span>
                <span className="visually-hidden">&nbsp;per&nbsp;</span>
                <span> </span>
              </span>
            </small>
          </div>
        </div>
      </div>
      <div
        className="sticky-right-content flex aic"
        onClick={() => handleNavbar("nav")}
      >
        <span className="sticky-atc-label body-1">Select Size</span>
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
      </div>
    </div>
  );
};
