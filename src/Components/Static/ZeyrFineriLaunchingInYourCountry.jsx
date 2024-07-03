import React, { useState } from "react";
import axios from "axios";
import validator from "validator";
import DOMPurify from "dompurify";
import { hostLink } from "../Hostlink/hostlink";

export const ZeyrFineriLaunchingInYourCountry = () => {
  const [email, setEmail] = useState("");
  const [country, setCountryName] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate email and password inputs
    if (!validator.isEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    try {
      const response = await axios.post(`${hostLink}/notify-country`, {
        name,
        email,
        country,
      });

      if (response.data == "User with this email already exists") {
        setErrorMessage("Someone has already subscribed with this email!");
        return;
      }
      window.location.href = "/";
    } catch (error) {
      console.error(error.response);
      // Sanitize the error message before displaying it
      setErrorMessage(DOMPurify.sanitize(error.response.data.message));
    }
  };

  return (
    <main
      id="MainContent"
      className="content-for-layout"
      role="main"
      tabIndex={-1}
    >
      <section
        id="shopify-section-template--14940997419073__main"
        className="shopify-section section"
      >
        <style
          data-shopify
          dangerouslySetInnerHTML={{
            __html:
              "#shopify-section-template--14940997419073__main .section-padding {\n         padding-top: 14px;\n         padding-bottom: 14px;\n         }\n         @media screen and (min-width: 769px) {        \n         #shopify-section-template--14940997419073__main .section-padding {\n         padding-top: 28px;\n         padding-bottom: 28px;\n         }\n         }\n      ",
          }}
        />
        <div className="section-padding color-schema-1 text-">
          <div className="page-width" style={{ width: "992px" }}>
            <h1 className="section-heading h2 text-center">
              SIGN UP FOR EMAIL TO BE THE FIRST TO ACCESS AMIRI LAUNCHES AND
              EVENTS
            </h1>
            <div className="rte">
              <div style={{ textAlign: "center" }}>
                DON'T SEE YOUR COUNTRY? SIGN UP TO RECIEVE UPDATES WHEN IT'S
                AVAILABLE.
              </div>
              <div className="klaviyo-form-WEZum4 klaviyo-form form-version-cid-1">
                <div
                  className="needsclick  kl-private-reset-css-Xuajs1"
                  style={{ transform: "translate(0px, 0px)" }}
                >
                  {errorMessage && (
                    <p
                      style={{
                        textAlign: "center",
                        margin: "1rem 0 0 0",
                        color: "red",
                        textTransform: "uppercase",
                      }}
                    >
                      {errorMessage}!
                    </p>
                  )}

                  <form
                    onSubmit={handleSubmit}
                    className="needsclick klaviyo-form klaviyo-form-version-cid_1 kl-private-reset-css-Xuajs1"
                    tabIndex={-1}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      boxSizing: "border-box",
                      width: "100%",
                      overflow: "visible",
                      maxWidth: 480,
                      margin: "0px auto",
                      borderRadius: 1,
                      borderStyle: "none",
                      borderWidth: 0,
                      borderColor: "rgb(0, 0, 0)",
                      backgroundColor: "rgb(255, 255, 255)",
                      backgroundRepeat: "no-repeat",
                      backgroundPositionY: "50%",
                      padding: "40px 16px 20px",
                      flex: "1 1 0%",
                    }}
                  >
                    <div
                      className="needsclick  kl-private-reset-css-Xuajs1"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        margin: 0,
                        padding: 0,
                        minHeight: 180,
                        justifyContent: "center",
                      }}
                    >
                      <div
                        className="needsclick  kl-private-reset-css-Xuajs1"
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "stretch",
                          position: "relative",
                        }}
                      >
                        <div
                          className="needsclick  kl-private-reset-css-Xuajs1"
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            padding: "10px 6px",
                            position: "relative",
                            flex: "1 0 0px",
                          }}
                        >
                          <div
                            className="needsclick  kl-private-reset-css-Xuajs1"
                            style={{
                              display: "flex",
                              flexGrow: 1,
                              flexDirection: "column",
                              alignSelf: "flex-end",
                            }}
                          >
                            <input
                              id="first_name_73465760"
                              className="needsclick go3900212110 kl-private-reset-css-Xuajs1"
                              type="text"
                              autoComplete="given-name"
                              tabIndex={0}
                              placeholder="NAME"
                              aria-label="NAME"
                              aria-invalid="false"
                              options="[object Object]"
                              style={{
                                boxSizing: "border-box",
                                borderRadius: 4,
                                padding: "0px 0px 0px 16px",
                                height: 50,
                                textAlign: "left",
                                color: "rgb(0, 0, 0)",
                                fontFamily:
                                  '"Helvetica Neue", Helvetica, Arial, sans-serif',
                                fontSize: 13,
                                fontWeight: 400,
                                letterSpacing: 1,
                                backgroundColor: "rgb(255, 255, 255)",
                                border: "1px solid rgb(23, 23, 23)",
                              }}
                              required
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                            <div
                              className="needsclick  kl-private-reset-css-Xuajs1"
                              style={{ width: "100%", position: "relative" }}
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        data-testid="form-row"
                        className="needsclick  kl-private-reset-css-Xuajs1"
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "stretch",
                          position: "relative",
                        }}
                      >
                        <div
                          className="needsclick  kl-private-reset-css-Xuajs1"
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            padding: "0px 6px 15px",
                            position: "relative",
                            flex: "1 0 0px",
                          }}
                        >
                          <div
                            className="needsclick  kl-private-reset-css-Xuajs1"
                            style={{
                              display: "flex",
                              flexGrow: 1,
                              flexDirection: "column",
                              alignSelf: "flex-end",
                            }}
                          >
                            <input
                              id="email_73465761"
                              className="needsclick go3900212110 kl-private-reset-css-Xuajs1"
                              type="email"
                              autoComplete="email"
                              name="email"
                              tabIndex={0}
                              placeholder="EMAIL"
                              aria-label="EMAIL"
                              aria-invalid="false"
                              style={{
                                boxSizing: "border-box",
                                borderRadius: 4,
                                padding: "0px 0px 0px 16px",
                                height: 50,
                                textAlign: "left",
                                color: "rgb(0, 0, 0)",
                                fontFamily:
                                  '"Helvetica Neue", Helvetica, Arial, sans-serif',
                                fontSize: 13,
                                fontWeight: 400,
                                letterSpacing: 1,
                                backgroundColor: "rgb(255, 255, 255)",
                                border: "1px solid rgb(23, 23, 23)",
                              }}
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                            <div
                              className="needsclick  kl-private-reset-css-Xuajs1"
                              style={{ width: "100%", position: "relative" }}
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        data-testid="form-row"
                        className="needsclick  kl-private-reset-css-Xuajs1"
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "stretch",
                          position: "relative",
                        }}
                      >
                        <div
                          className="needsclick  kl-private-reset-css-Xuajs1"
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            padding: "0px 6px 15px",
                            position: "relative",
                            flex: "1 0 0px",
                          }}
                        >
                          <div
                            className="needsclick  kl-private-reset-css-Xuajs1"
                            style={{
                              display: "flex",
                              flexGrow: 1,
                              flexDirection: "column",
                              alignSelf: "flex-end",
                            }}
                          >
                            <input
                              id="Requested_Country_73465762"
                              className="needsclick go3900212110 kl-private-reset-css-Xuajs1"
                              type="text"
                              tabIndex={0}
                              placeholder="COUNTRY"
                              aria-label="COUNTRY"
                              aria-invalid="false"
                              options="[object Object]"
                              style={{
                                boxSizing: "border-box",
                                borderRadius: 4,
                                padding: "0px 0px 0px 16px",
                                height: 50,
                                textAlign: "left",
                                color: "rgb(0, 0, 0)",
                                fontFamily:
                                  '"Helvetica Neue", Helvetica, Arial, sans-serif',
                                fontSize: 13,
                                fontWeight: 400,
                                letterSpacing: 1,
                                backgroundColor: "rgb(255, 255, 255)",
                                border: "1px solid rgb(23, 23, 23)",
                              }}
                              required
                              value={country}
                              onChange={(e) => setCountryName(e.target.value)}
                            />
                            <div
                              className="needsclick  kl-private-reset-css-Xuajs1"
                              style={{ width: "100%", position: "relative" }}
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        data-testid="form-row"
                        className="needsclick  kl-private-reset-css-Xuajs1"
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "stretch",
                          position: "relative",
                        }}
                      >
                        <div
                          className="needsclick  kl-private-reset-css-Xuajs1"
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            padding: "0px 6px 10px",
                            position: "relative",
                            flex: "1 0 0px",
                          }}
                        >
                          <button
                            className="needsclick go1924709130 kl-private-reset-css-Xuajs1"
                            type="submits"
                            style={{
                              background: "rgb(23, 23, 23)",
                              borderRadius: 0,
                              borderStyle: "none",
                              borderColor: "rgb(61, 75, 199)",
                              borderWidth: 2,
                              color: "rgb(255, 255, 255)",
                              fontFamily:
                                '"Nunito Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
                              fontSize: 16,
                              fontWeight: 400,
                              letterSpacing: 0,
                              lineHeight: 1,
                              whiteSpace: "normal",
                              paddingTop: 0,
                              paddingBottom: 0,
                              textAlign: "center",
                              wordBreak: "break-word",
                              alignSelf: "flex-end",
                              cursor: "pointer",
                              height: 44,
                              width: "100%",
                            }}
                          >
                            NOTIFY ME
                          </button>
                        </div>
                      </div>
                    </div>
                    <input
                      type="submit"
                      tabIndex={-1}
                      defaultValue="Submit"
                      style={{ display: "none" }}
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
