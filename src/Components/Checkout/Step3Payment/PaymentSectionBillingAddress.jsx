import React,{useContext, useState} from "react";
import { CheckoutContext } from "../../Context/CheckoutBillingShippingAddressContext";

export const PaymentSectionBillingAddress = () => {

  const [showBillingAddress, setShowBillingAddress] = useState(false);
  const [inputFieldsDisabled, setInputFieldsDisabled] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState(""); // Default to Pakistan
const {formData,setFormData,fieldsWithRedBorder} = useContext(CheckoutContext)

const handleDifferentBillingAddress = () => {
  setShowBillingAddress(!showBillingAddress);
  setInputFieldsDisabled(false);
};

  const countries = [
    "Australia",
    "Bahrain",
    "Kuwait",
    "Malaysia",
    "New Zealand",
    "Oman",
    "Qatar",
    "Saudi Arabia",
    "Singapore",
    "Turkey",
    "UAE",
  ];

  return (
    <div className="section section--billing-address">
      <div className="section__header">
        <h2 className="section__title">Billing address</h2>
        <p className="section__text">
          Select the address that matches your card or payment method.
        </p>
      </div>
      <div className="section__content">
        <fieldset className="content-box">
          <legend className="visually-hidden">Choose a billing address</legend>
          <div
            className="radio-wrapper content-box__row"
          >
            <div className="radio__input">
              <input
                className="input-radio"
                type="radio"
                name="checkout[same_billing_address]"
                checked={!showBillingAddress}
                id="checkout_same_billing_address_false"
                onChange={()=>handleDifferentBillingAddress()}

              />
            </div>
            <label
              className="radio__label content-box__emphasis"
              htmlFor="checkout_same_billing_address_false"
            >
              Same as shipping address
            </label>
          </div>
          <div
            className="radio-wrapper content-box__row"
            data-different-billing-address
          >
            <div className="radio__input">
              <input
                className="input-radio"
                type="radio"
                name="checkout[different_billing_address]"
                id="checkout_different_billing_address_true"
                checked={showBillingAddress}
                onChange={()=>handleDifferentBillingAddress()}

              />
            </div>
            <label
              className="radio__label content-box__emphasis"
              htmlFor="checkout_different_billing_address_true"
            >
              Use a different billing address
            </label>
          </div>
          <div
        className={`radio-group__row content-box__row content-box__row--secondary ${showBillingAddress ? '' : 'hidden'}`}
        id="section--billing-address__different"
          >
            <div className="fieldset">
              <div className="address-fields" data-address-fields>
                <input
                  className="visually-hidden"
                  autoComplete="billing given-name"
                  tabIndex={-1}
                  size={30}
                  type="text"
                  name="checkout[billing_address][first_name]"
                  disabled={inputFieldsDisabled}
                />
                <input
                  className="visually-hidden"
                  autoComplete="billing family-name"
                  tabIndex={-1}
                  size={30}
                  type="text"
                  name="checkout[billing_address][last_name]"
                  disabled={inputFieldsDisabled}
                />
                <input
                  className="visually-hidden"
                  autoComplete="billing organization"
                  tabIndex={-1}
                  size={30}
                  type="text"
                  name="checkout[billing_address][company]"
                  disabled={inputFieldsDisabled}
                />
                <input
                  className="visually-hidden"
                  autoComplete="billing address-line1"
                  tabIndex={-1}
                  size={30}
                  type="text"
                  name="checkout[billing_address][address1]"
                  disabled={inputFieldsDisabled}
                />
                <input
                  className="visually-hidden"
                  autoComplete="billing address-line2"
                  tabIndex={-1}
                  size={30}
                  type="text"
                  name="checkout[billing_address][address2]"
                  disabled={inputFieldsDisabled}
                />
                <input
                  className="visually-hidden"
                  autoComplete="billing address-level2"
                  tabIndex={-1}
                  size={30}
                  type="text"
                  name="checkout[billing_address][city]"
                  disabled={inputFieldsDisabled}
                />
                <input
                  className="visually-hidden"
                  autoComplete="billing country"
                  tabIndex={-1}
                  size={30}
                  type="text"
                  name="checkout[billing_address][country]"
                  disabled={inputFieldsDisabled}
                />
                <input
                  className="visually-hidden"
                  autoComplete="billing address-level1"
                  tabIndex={-1}
                  size={30}
                  type="text"
                  name="checkout[billing_address][province]"
                  disabled={inputFieldsDisabled}
                />
                <input
                  className="visually-hidden"
                  autoComplete="billing postal-code"
                  tabIndex={-1}
                  size={30}
                  type="text"
                  name="checkout[billing_address][zip]"
                  disabled={inputFieldsDisabled}
                />
                <input
                  className="visually-hidden"
                  autoComplete="billing tel"
                  tabIndex={-1}
                  size={30}
                  type="text"
                  name="checkout[billing_address][phone]"
                  disabled={inputFieldsDisabled}
                />
                <div
                  className="field field--required field--show-floating-label"
           
                >
                  <div className="field__input-wrapper field__input-wrapper--select">
                    <label
                      className="field__label field__label--visible"
                      htmlFor="checkout_billing_address_country"
                    >
                      Country/region
                    </label>
                    <select
                  className={`field__input field__input--select  ${
                    fieldsWithRedBorder.includes("country") ? "red-border" : ""
                  }`}
                  name="checkout[shipping_address][country]"
                  id="checkout_shipping_address_country"
                  placeholder="Country/region"
                 
                >
                  {countries
                    .filter((country) => country !== selectedCountry) // Exclude the selected country
                    .map((country) => (
                      <option value={country} key={country}>
                        {country}
                      </option>
                    ))}
                </select>

                    <div className="field__caret">
                      <svg
                        className="icon-svg icon-svg--color-adaptive-lighter icon-svg--size-10 field__caret-svg"
                        role="presentation"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <use xlinkHref="#caret-down" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div
                  className="field--third field field--required hidden"
                  data-address-field="province"
                  data-autocomplete-field-container="true"
                >
                  <div className="field__input-wrapper field__input-wrapper--select">
                    <label
                      className="field__label field__label--visible"
                      htmlFor="checkout_billing_address_province"
                    >
                      Region
                    </label>
                    <input
                      placeholder="Region"
                      autoComplete="billing address-level1"
                      autoCorrect="off"
                      data-backup="province"
                      className="field__input"
                      aria-required="true"
                      type="text"
                      name="checkout[billing_address][province]"
                      id="checkout_billing_address_province"
                      disabled
                      hidden="hidden"
                    />
                    <div className="field__caret shown-if-js">
                      <svg
                        className="icon-svg icon-svg--color-adaptive-lighter icon-svg--size-10 field__caret-svg"
                        role="presentation"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <use xlinkHref="#caret-down" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div
                  className="field field--required field--half"
                  data-address-field="first_name"
                >
                  <div className="field__input-wrapper">
                    <label
                      className="field__label field__label--visible"
                      htmlFor="checkout_billing_address_first_name"
                    >
                      First name
                    </label>
                    <input
                      placeholder="First name"
                      autoComplete="billing given-name"
                      autoCorrect="off"
                      data-backup="first_name"
                      className="field__input"
                      aria-required="true"
                      size={30}
                      type="text"
                      name="checkout[billing_address][first_name]"
                      id="checkout_billing_address_first_name"
                      disabled
                    />
                  </div>
                </div>
                <div
                  className="field field--required field--half"
                  data-address-field="last_name"
                >
                  <div className="field__input-wrapper">
                    <label
                      className="field__label field__label--visible"
                      htmlFor="checkout_billing_address_last_name"
                    >
                      Last name
                    </label>
                    <input
                      placeholder="Last name"
                      autoComplete="billing family-name"
                      autoCorrect="off"
                      data-backup="last_name"
                      className="field__input"
                      aria-required="true"
                      size={30}
                      type="text"
                      name="checkout[billing_address][last_name]"
                      id="checkout_billing_address_last_name"
                      disabled
                    />
                  </div>
                </div>
                <div
                  data-address-field="company"
                  data-autocomplete-field-container="true"
                  className="field field--optional"
                >
                  <div className="field__input-wrapper">
                    <label
                      className="field__label field__label--visible"
                      htmlFor="checkout_billing_address_company"
                    >
                      Company (optional)
                    </label>
                    <input
                      placeholder="Company (optional)"
                      autoComplete="billing organization"
                      autoCorrect="off"
                      data-backup="company"
                      className="field__input"
                      size={30}
                      type="text"
                      name="checkout[billing_address][company]"
                      id="checkout_billing_address_company"
                      disabled
                    />
                  </div>
                </div>
                <div
                  data-address-field="address1"
                  data-autocomplete-field-container="true"
                  className="field field--required"
                >
                  <div className="field__input-wrapper">
                    <label
                      className="field__label field__label--visible"
                      htmlFor="checkout_billing_address_address1"
                    >
                      Address
                    </label>
                    <input
                      placeholder="Address"
                      autoComplete="billing address-line1"
                      autoCorrect="off"
                      role="combobox"
                      aria-autocomplete="list"
                      aria-expanded="false"
                      aria-required="true"
                      data-backup="address1"
                      data-autocomplete-trigger="true"
                      data-autocomplete-title="Suggestions"
                      data-autocomplete-single-item="1 item available"
                      data-autocomplete-multi-item="{{number}} items available"
                      data-autocomplete-item-selection="{{number}} of {{total}}"
                      data-autocomplete-close="Close suggestions"
                      className="field__input"
                      size={30}
                      type="text"
                      name="checkout[billing_address][address1]"
                      id="checkout_billing_address_address1"
                      aria-haspopup="false"
                      disabled
                    />
                    <p
                      className="field__additional-info visually-hidden"
                      data-address-civic-number-warning
                    >
                      <svg
                        className="icon-svg icon-svg--size-16 field__message__icon"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <use xlinkHref="#info" />
                      </svg>
                      Add a house number if you have one
                    </p>
                  </div>
                </div>
                <div
                  data-address-field="address2"
                  data-autocomplete-field-container="true"
                  className="field field--optional"
                >
                  <div className="field__input-wrapper">
                    <label
                      className="field__label field__label--visible"
                      htmlFor="checkout_billing_address_address2"
                    >
                      Apartment, suite, etc. (optional)
                    </label>
                    <input
                      placeholder="Apartment, suite, etc. (optional)"
                      autoComplete="billing address-line2"
                      autoCorrect="off"
                      data-backup="address2"
                      className="field__input"
                      size={30}
                      type="text"
                      name="checkout[billing_address][address2]"
                      id="checkout_billing_address_address2"
                      disabled
                    />
                  </div>
                </div>
                <div
                  data-address-field="city"
                  data-autocomplete-field-container="true"
                  className="field field--required field--half"
                >
                  <div className="field__input-wrapper">
                    <label
                      className="field__label field__label--visible"
                      htmlFor="checkout_billing_address_city"
                    >
                      City
                    </label>
                    <input
                      placeholder="City"
                      autoComplete="billing address-level2"
                      autoCorrect="off"
                      className="field__input"
                      aria-required="true"
                      size={30}
                      type="text"
                      name="checkout[billing_address][city]"
                      id="checkout_billing_address_city"
                      disabled
                    />
                  </div>
                </div>
                <div className="field field--required field--half">
                  <div className="field__input-wrapper">
                    <label
                      className="field__label field__label--visible"
                      htmlFor="checkout_billing_address_zip"
                    >
                      Postal code
                    </label>
                    <input
                      placeholder="Postal code"
                      autoComplete="billing postal-code"
                      autoCorrect="off"
                      className="field__input field__input--zip"
                      aria-required="true"
                      size={30}
                      type="text"
                      name="checkout[billing_address][zip]"
                      id="checkout_billing_address_zip"
                      disabled
                    />
                  </div>
                </div>
                <div
                  data-address-field="phone"
                  className="field field--required"
                >
                  <div className="field__input-wrapper field__input-wrapper--icon-right">
                    <label
                      className="field__label field__label--visible"
                      htmlFor="checkout_billing_address_phone"
                    >
                      Phone
                    </label>
                    <input
                      placeholder="Phone"
                      autoComplete="billing tel"
                      autoCorrect="off"
                      className="field__input field__input--numeric"
                      aria-required="true"
                      size={30}
                      type="tel"
                      name="checkout[billing_address][phone]"
                      id="checkout_billing_address_phone"
                      disabled
                    />
                    <div className="field__icon">
                      <div
                        data-tooltip="true"
                        id="phone_tooltip"
                        className="tooltip-container"
                      >
                        <button
                          type="button"
                          className="tooltip-control"
                          placeholder="Phone"
                        >
                          <svg
                            className="icon-svg icon-svg--color-adaptive-lighter icon-svg--size-16 icon-svg--block icon-svg--center"
                            role="presentation"
                            aria-hidden="true"
                            focusable="false"
                          >
                            <use xlinkHref="#question" />
                          </svg>
                        </button>
                        <span
                          className="tooltip"
                          role="tooltip"
                          id="tooltip-for-phone"
                        >
                          In case we need to contact you about your order
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  );
};
