import React from "react";

export const WrongAddressNotice = () => {
  return (
    <>
      {/* if the address is not found or the shipping is not available in the entered shipping address */}
      {/* <div className="section section--shipping-method">
            <div className="section__header">
              <h2 className="section__title" id="main-header" tabIndex={-1}>
                Shipping method
              </h2>
            </div>
            <div className="section__content">
              <div
                role="alert"
                data-shipping-warning
                data-banner="true"
                className="notice notice--error default-background"
                tabIndex={-1}
                aria-atomic="true"
                aria-live="polite"
              >
                <svg
                  className="icon-svg icon-svg--size-24 notice__icon"
                  aria-hidden="true"
                  focusable="false"
                >
                  <use xlinkHref="#error" />
                </svg>
                <div className="notice__content">
                  <p className="notice__text">
                    Your cart has been updated and the items you added can’t be
                    shipped to your address. Remove the items to complete your
                    order.
                  </p>
                </div>
              </div>
              <div className="content-box blank-slate">
                <svg
                  focusable="false"
                  aria-hidden="true"
                  className="icon-svg icon-svg--size-64 blank-slate__icon"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  viewBox="0 0 76.97523 59.755739"
                >
                  <g
                    transform="translate(-0.835631,-8)"
                    style={{ fill: "none", stroke: "none" }}
                  >
                    <g
                      transform="translate(1.835631,28.112292)"
                      style={{ stroke: "#b3b3b3", strokeWidth: 2 }}
                    >
                      <path d="m 0,0 61.789269,0 m -55.9600927,30.622004 15.1558587,0 m -15.1558587,-3.513041 15.1558587,0 m -15.1558587,-3.51304 9.9095997,0" />
                    </g>
                    <path
                      d="m 8.0728499,18.158677 49.3731231,0 6.178927,9.953615 0,36.008666 c 0,1.463767 -1.165835,2.634781 -2.623129,2.634781 l -56.5430104,0 c -1.4572941,0 -2.6231294,-1.171014 -2.6231294,-2.634781 l 0,-36.008666 6.2372187,-9.953615 z m 24.6574161,0 0,9.719412 0,-9.719412 z"
                      style={{ stroke: "#b3b3b3", strokeWidth: 2 }}
                    />
                    <g transform="translate(50.623336,9)">
                      <g
                        style={{
                          fill: "#ffffff",
                          stroke: "#b3b3b3",
                          strokeWidth: 2,
                        }}
                      >
                        <ellipse
                          cx="13.093762"
                          cy="13.093762"
                          rx="13.093762"
                          ry="13.093762"
                        />
                      </g>
                      <path
                        d="m 13.093763,4.6763438 0,11.3595992"
                        style={{ stroke: "#b3b3b3", strokeWidth: 2 }}
                      />
                      <ellipse
                        cx="13.027511"
                        cy="20.108278"
                        rx="1.4029032"
                        ry="1.4029032"
                        style={{ fill: "#b3b3b3" }}
                      />
                    </g>
                  </g>
                </svg>
                <p>No shipping rates found for this address.</p>
              </div>
            </div>
          </div> */}
    </>
  );
};
