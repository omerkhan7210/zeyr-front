import React, { useContext } from "react";
import { ProductDetailsContext } from "../ProductDetailPage";

export const ShippingDrawer = ({ isShippingDrawerOpen }) => {
  const { handleNavbar } = useContext(ProductDetailsContext);

  return (
    <aside>
      <span
        id="drawerTrigger"
        onClick={() => {
          handleNavbar("shipping");
        }}
        className="btn btn--tertiary product-drawer-trigger-btn flex jcc aic"
      >
        Shipping / Returns
      </span>
      <div
        className={`drawer side-drawer default-drawer flex aic jcc shipping-drawer ${
          isShippingDrawerOpen ? "drawer--active" : ""
        }`}
      >
        <div
          id="drawerOverlay"
          onClick={() => handleNavbar("shipping")}
          className="drawer--overlay"
        />
        <div className="drawer__container drawer__container-shipping">
          <div className="drawer__container-inner">
            <button
              id="drawerClose"
              onClick={() => handleNavbar("shipping")}
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
              shipping &amp; Returns
            </h2>
            <div className="drawer-content">
              <p>
                AMIRI OFFERS COMPLIMENTARY SHIPPING AND RETURNS FOR ALL US
                ORDERS (UPS GROUND) AND INTERNATIONAL ORDERS (DHL EXPRESS).
              </p>
              <p>
                THE RETURN WINDOW FOR ONLINE PURCHASES IS CURRENTLY 20 DAYS FROM
                THE DATE OF DELIVERY.
              </p>
              <p>
                PLEASE NOTE THAT EXCHANGES ARE ONLY AVAILABLE FOR DOMESTIC US
                ORDERS.
              </p>
              <p>TO INITIATE A RETURN PLEASE VISIT:</p>
              <div className="drawer-ctas">
                <a className="btn btn--tertiary" href="/policies/refund-policy">
                  Us Returns
                </a>
                <a className="btn btn--tertiary" href="/pages/shipping-returns">
                  International Returns
                </a>
              </div>
            </div>
            <div className="drawer-footer flex jcc">
              <a
                className="btn btn--primary body-1"
                href="/policies/shipping-policy"
              >
                view full policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
