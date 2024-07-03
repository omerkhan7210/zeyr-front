import React, { useContext, useState, useEffect } from "react";
import { hostLink } from "../../Hostlink/hostlink";
import { tokenContextC } from "../../Context/TokenContext";
import axios from "axios";
import { CheckoutContext } from "../../Context/CheckoutBillingShippingAddressContext";

export const ShippingForm = () => {
  const {addresses,setAddresses,setFormData,formData,fieldsWithRedBorder} = useContext(CheckoutContext)
  const { token, isTokenExpired } = useContext(tokenContextC);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(""); // Default to Pakistan
  // Function to handle address selection
  const handleAddressSelect = (event) => {
    const selectedId = event.target.value;
    const selected = addresses.find(
      (address) => address.id === parseInt(selectedId)
    );

    setSelectedAddress(selected);
    // Update the formData with the selected address fields
    setFormData({
      ...formData,
      firstName: selected.firstName,
      lastName: selected.lastName,
      company: selected.company,
      city: selected.city,
      country: selected.country,
      phone: selected.phone,
      addressLine1: selected.addressLine1,
      addressLine2: selected.addressLine2,
      zipCode: selected.zipCode,
    });
  };

  // Fetch the addresses for the logged-in user
  async function fetchAddresses() {
    try {
      const response = await axios.get(
        `${hostLink}/retrieve-checkout-address-user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAddresses(response.data.addresses);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (token) {
      fetchAddresses();
    }
  }, []);

  const countries = [
    "Australia",
    "Bahrain",
    "Kuwait",
    "Malaysia",
    "New Zealand",
    "Oman",
    "Pakistan",
    "Qatar",
    "Saudi Arabia",
    "Singapore",
    "Turkey",
    "UAE",
  ];

  return (
    <div className="section section--shipping-address">
      <div className="section__header">
        <h2 className="section__title" id="section-delivery-title">
          Shipping address
        </h2>
      </div>
      <div className="section__content">
        {!isTokenExpired && (
          <div className="field field--required" style={{ padding: "0" }}>
            <div className="field__input-wrapper field__input-wrapper--select">
              <label
                className="field__label field__label--visible"
                htmlFor="checkout_shipping_address_id"
              >
                Saved addresses
              </label>
              <select
                className="field__input field__input--select"
                name="checkout[shipping_address][id]"
                id="checkout_shipping_address_id"
                onChange={(e) => handleAddressSelect(e)}
              >
                <option selected="selected">Use a new address</option>
                {addresses.map((address) => (
                  <option key={address.id} value={address.id}>
                    {address.addressLine1 +
                      " " +
                      address.addressLine2 +
                      " " +
                      address.city +
                      " " +
                      address.zipCode +
                      ", " +
                      address.country +
                      " (" +
                      address.firstName +
                      " " +
                      address.lastName +
                      ", " +
                      address.company +
                      " )"}
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
                  {"{"}" "{"}"}
                </svg>
              </div>
            </div>
          </div>
        )}
        <div className="fieldset">
          <div className="address-fields" data-address-fields>
            <div
              className="field field--required field--show-floating-label"

            >
              <div className="field__input-wrapper field__input-wrapper--select">
                <label
                  className="field__label field__label--visible"
                  htmlFor="checkout_shipping_address_country"
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
                  value={
                    selectedAddress ? selectedAddress.country : formData.country
                  }
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
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
                  htmlFor="checkout_shipping_address_province"
                >
                  Region
                </label>
                <input
                  placeholder="Region"
                  autoComplete="shipping address-level1"
                  autoCorrect="off"
                  data-backup="province"
                  className="field__input"
                  aria-required="true"
                  type="text"
                  name="checkout[shipping_address][province]"
                  id="checkout_shipping_address_province"
                  disabled="disabled"
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
                  htmlFor="checkout_shipping_address_first_name"
                >
                  First name
                </label>
                <input
                  placeholder="First name"
                  autoComplete="shipping given-name"
                  autoCorrect="off"
                  data-backup="first_name"
                  className={`field__input  ${
                    fieldsWithRedBorder.includes("firstName")
                      ? "red-border"
                      : ""
                  }`}
                  aria-required="true"
                  size={30}
                  type="text"
                  name="checkout[shipping_address][first_name]"
                  id="checkout_shipping_address_first_name"
                  value={
                    selectedAddress
                      ? selectedAddress.firstName
                      : formData.firstName
                  }
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
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
                  htmlFor="checkout_shipping_address_last_name"
                >
                  Last name
                </label>
                <input
                  placeholder="Last name"
                  autoComplete="shipping family-name"
                  autoCorrect="off"
                  data-backup="last_name"
                  className={`field__input  ${
                    fieldsWithRedBorder.includes("lastName") ? "red-border" : ""
                  }`}
                  aria-required="true"
                  size={30}
                  type="text"
                  name="checkout[shipping_address][last_name]"
                  id="checkout_shipping_address_last_name"
                  value={
                    selectedAddress
                      ? selectedAddress.lastName
                      : formData.lastName
                  }
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
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
                  htmlFor="checkout_shipping_address_company"
                >
                  Company (optional)
                </label>
                <input
                  placeholder="Company (optional)"
                  autoComplete="shipping organization"
                  autoCorrect="off"
                  data-backup="company"
                  className={`field__input  ${
                    fieldsWithRedBorder.includes("company") ? "red-border" : ""
                  }`}
                  size={30}
                  type="text"
                  name="checkout[shipping_address][company]"
                  id="checkout_shipping_address_company"
                  value={
                    selectedAddress ? selectedAddress.company : formData.company
                  }
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
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
                  htmlFor="checkout_shipping_address_address1"
                >
                  Address
                </label>
                <input
                  placeholder="Address"
                  autoComplete="shipping address-line1"
                  autoCorrect="off"
                  role="combobox"
                  className={`field__input  ${
                    fieldsWithRedBorder.includes("addressLine1")
                      ? "red-border"
                      : ""
                  }`}
                  size={30}
                  type="text"
                  name="checkout[shipping_address][address1]"
                  id="checkout_shipping_address_address1"
                  value={
                    selectedAddress
                      ? selectedAddress.addressLine1
                      : formData.addressLine1
                  }
                  onChange={(e) =>
                    setFormData({ ...formData, addressLine1: e.target.value })
                  }
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
                  htmlFor="checkout_shipping_address_address2"
                >
                  Apartment, suite, etc. (optional)
                </label>
                <input
                  placeholder="Apartment, suite, etc. (optional)"
                  autoComplete="shipping address-line2"
                  autoCorrect="off"
                  className={`field__input  ${
                    fieldsWithRedBorder.includes("addressLine2")
                      ? "red-border"
                      : ""
                  }`}
                  size={30}
                  type="text"
                  name="checkout[shipping_address][address2]"
                  id="checkout_shipping_address_address2"
                  value={
                    selectedAddress
                      ? selectedAddress.addressLine2
                      : formData.addressLine2
                  }
                  onChange={(e) =>
                    setFormData({ ...formData, addressLine2: e.target.value })
                  }
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
                  htmlFor="checkout_shipping_address_city"
                >
                  City
                </label>
                <input
                  placeholder="City"
                  autoComplete="shipping address-level2"
                  autoCorrect="off"
                  data-backup="city"
                  className={`field__input ${
                    fieldsWithRedBorder.includes("city") ? "red-border" : ""
                  }`}
                  aria-required="true"
                  size={30}
                  type="text"
                  name="checkout[shipping_address][city]"
                  id="checkout_shipping_address_city"
                  value={selectedAddress ? selectedAddress.city : formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                />
              </div>
            </div>
            <div
              className="field field--required field--half"
              data-address-field="zip"
              data-autocomplete-field-container="true"
            >
              <div className="field__input-wrapper">
                <label
                  className="field__label field__label--visible"
                  htmlFor="checkout_shipping_address_zip"
                >
                  Postal code
                </label>
                <input
                  placeholder="Postal code"
                  autoComplete="shipping postal-code"
                  autoCorrect="off"
                  className={`field__input field__input--zip ${
                    fieldsWithRedBorder.includes("zipCode") ? "red-border" : ""
                  }`}
                  aria-required="true"
                  size={30}
                  type="text"
                  name="checkout[shipping_address][zip]"
                  id="checkout_shipping_address_zip"
                  value={
                    selectedAddress ? selectedAddress.zipCode : formData.zipCode
                  }
                  onChange={(e) =>
                    setFormData({ ...formData, zipCode: e.target.value })
                  }
                />
              </div>
            </div>
            <div data-address-field="phone" className="field field--required">
              <div className="field__input-wrapper field__input-wrapper--icon-right">
                <label
                  className="field__label field__label--visible"
                  htmlFor="checkout_shipping_address_phone"
                >
                  Phone
                </label>
                <input
                  placeholder="Phone"
                  autoComplete="shipping tel"
                  autoCorrect="off"
                  className={`field__input field__input--numeric  ${
                    fieldsWithRedBorder.includes("phone") ? "red-border" : ""
                  }`}
                  aria-required="true"
                  size={30}
                  type="tel"
                  name="checkout[shipping_address][phone]"
                  id="checkout_shipping_address_phone"
                  value={
                    selectedAddress ? selectedAddress.phone : formData.phone
                  }
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
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
                      data-tooltip-control="true"
                      aria-label="More information"
                      aria-describedby="tooltip-for-phone"
                      aria-controls="tooltip-for-phone"
                      aria-pressed="false"
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
    </div>
  );
};
