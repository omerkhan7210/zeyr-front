import React from "react";

export const MainFooter = ({ step1Complete }) => {
  return (
    <div
      className="main__footer"
      style={{ marginTop: step1Complete ? "4rem" : null }}
    >
      <ul className="policy-list" role="list">
        <li className="policy-list__item ">
          <a
            aria-haspopup="dialog"
            data-modal="policy-refund-policy"
            data-title-text="Refund policy"
            data-close-text="Close"
            data-iframe="true"
            href="/10561394/policies/refund-policy.html?locale=en-PK"
          >
            Refund policy
          </a>
        </li>
        <li className="policy-list__item ">
          <a
            aria-haspopup="dialog"
            data-modal="policy-shipping-policy"
            data-title-text="Shipping policy"
            data-close-text="Close"
            data-iframe="true"
            href="/10561394/policies/shipping-policy.html?locale=en-PK"
          >
            Shipping policy
          </a>
        </li>
        <li className="policy-list__item ">
          <a
            aria-haspopup="dialog"
            data-modal="policy-privacy-policy"
            data-title-text="Privacy policy"
            data-close-text="Close"
            data-iframe="true"
            href="/10561394/policies/privacy-policy.html?locale=en-PK"
          >
            Privacy policy
          </a>
        </li>
        <li className="policy-list__item ">
          <a
            aria-haspopup="dialog"
            data-modal="policy-terms-of-service"
            data-title-text="Terms of service"
            data-close-text="Close"
            data-iframe="true"
            href="/10561394/policies/terms-of-service.html?locale=en-PK"
          >
            Terms of service
          </a>
        </li>
        <li className="policy-list__item ">
          <a
            aria-haspopup="dialog"
            data-modal="policy-contact-information"
            data-title-text="Contact information"
            data-close-text="Close"
            data-iframe="true"
            href="/10561394/policies/contact-information.html?locale=en-PK"
          >
            Contact information
          </a>
        </li>
      </ul>
    </div>
  );
};
