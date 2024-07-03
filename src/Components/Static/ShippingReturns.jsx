import React from "react";
import { Link } from "react-router-dom";

export const ShippingReturns = () => {
  return (
    <main
      id="MainContent"
      className="content-for-layout"
      role="main"
      tabIndex={-1}
    >
      <div
        id="shopify-section-template--14940996960321__main"
        className="shopify-section section-page-info"
      >
        <style
          data-shopify
          dangerouslySetInnerHTML={{
            __html:
              "#shopify-section-template--14940996960321__main .section-padding {\n         padding-top: 14px;\n         padding-bottom: 14px;\n         }\n         @media screen and (min-width: 769px) {        \n         #shopify-section-template--14940996960321__main .section-padding {\n         padding-top: 28px;\n         padding-bottom: 28px;\n         }\n         }\n      ",
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n         .section-page-info {\n         text-transform: uppercase;\n         line-height: 1.6;\n         letter-spacing: .5pt;\n         }\n         .section-page-info h1 {\n         margin-bottom: 112px;\n         }\n         .section-page-info details {\n         border-bottom: 1px solid black;\n         padding: 16px 0px;\n         }\n         .section-page-info .details-content {\n         margin-top: 16px;\n         }  \n         .section-page-info .details__icon {\n         margin-right: .5rem;\n         }\n         .section-page-info .section-content {\n         gap: 144px 0;\n         }\n         @media screen and (min-width: 769px) {        \n         .section-page-info .accordions {\n         max-width: 456px;\n         }\n         }\n      ",
          }}
        />
        <div className="section-padding page-width">
          <h1 className="text-left">Shipping &amp; Returns</h1>
          <div className="section-content flex jcb flex--mobile">
            <div className="flex aic flex--one-half">
              <div className="rte">
                <p>
                  Should you have any additional questions,&nbsp; please do not
                  hesitate to{" "}
                  <Link to="/pages/contact">contact us</Link>.
                </p>
              </div>
            </div>
            <div className="accordions flex--one-half">
              <details className>
                <summary className="flex jcb aic" aria-expanded="false">
                  <span>Order Processing</span>
                  <span className="details__icon" />
                </summary>
                <div className="details-content">
                  <p>
                    PLEASE ALLOW 2-3 BUSINESS DAYS FOR ORDER PROCESSING,
                    PENDING&nbsp;PRODUCT&nbsp;AVAILABILITY
                    AND&nbsp;PAYMENT&nbsp;VERIFICATION.&nbsp;ONCE AN ORDER HAS
                    BEEN PLACED, IT CANNOT BE MODIFIED OR CANCELLED.&nbsp;PLEASE
                    CONFIRM THAT ALL ORDER DETAILS ARE CORRECT BEFORE COMPLETING
                    THE CHECKOUT PROCESS.
                  </p>
                  <p>
                    AMIRI DOES NOT SHIP ON WEEKENDS&nbsp;OR MAJOR HOLIDAYS. ALL
                    ORDERS SHIP FROM LOS ANGELES, CA, UNITIED STATES. <br />
                    <br />
                    YOU WILL RECEIVE AN AUTOMATIC CONFIRMATION EMAIL ONCE YOUR
                    ORDER HAS BEEN PLACED. IF YOU DO NOT SEE THE ORDER
                    CONFIRMATION WITHIN A FEW MINUTES OF ORDERING, PLEASE CHECK
                    YOUR SPAM EMAIL FOLDER.
                    <br />
                    <br />
                    DUE TO HIGH DEMAND, ITEMS MAY BECOME UNAVAILABLE EVEN AFTER
                    AN ORDER HAS BEEN PLACED. IN THIS CASE, A REFUND WILL BE
                    ISSUED TO THE ORIGINAL PAYMENT METHOD OR BY CHECK MAILED TO
                    THE ADDRESS LISTED FOR THE ORDER FOR THE AMOUNT INITIALLY
                    PAID. FOR REFUNDS ISSUED TO THE ORIGINAL PAYMENT METHOD,
                    PLEASE ALLOW 5-10 BUSINESS DAYS FOR THE REFUND TO APPEAR ON
                    YOUR BANK STATEMENT. FOR REFUNDS ISSUED BY CHECK, PLEASE
                    ALLOW 10 BUSINESS DAYS FOR THE REFUND TO ARRIVE.
                    <br />
                    <br />
                    ALL ORDERS ARE REVIEWED BY OUR SECURITY TEAM AND CAN BE
                    CANCELLED BY AMIRI AT ANY TIME.
                    <br />
                    <br />
                    ONCE YOUR ORDER HAS BEEN PROCESSED BY OUR FULFILLMENT TEAM,
                    YOU WILL RECEIVE&nbsp;A SHIPPING CONFIRMATION EMAIL WITH
                    TRACKING INFORMATION ENCLOSED.&nbsp;&nbsp;
                    <br />
                    <br />
                    ORDERS MAY EXPERIENCE SHIPPING DELAYS DURING SPECIAL
                    RELEASES, MAJOR HOLIDAYS, AND MARKDOWN PERIODS.
                    <br />
                    <br />
                    AMIRI IS UNABLE TO SHIP TO P.O. BOX, APO, OR FPO ADDRESSES.
                    ALL ORDERS WITH A P.O. BOX, APO, OR FPO ADDRESS WILL BE
                    CANCELLED.
                    <br />
                    <br />
                    PRE-ORDER POLICY:
                    <br />
                    ITEMS THAT ARE MARKED AS PRE-ORDER AT CHECK-OUT ARE EXPECTED
                    TO SHIP UPON ARRIVAL TO OUR FACILITY. ALL CUSTOMERS ARE
                    CHARGED AT CHECKOUT FOR PRE-ORDER ITEMS TO THE PAYMENT
                    METHOD PROVIDED. ONCE YOUR ORDER HAS BEEN PLACED, WE ARE
                    UNABLE TO CANCEL OR MODIFY. SHOULD YOU HAVE ANY QUESTIONS
                    PLEASE CONTACT OUR TEAM AT SUPPORT@AMIRI.COM.
                  </p>
                </div>
              </details>
              <details open className="details--active">
                <summary className="flex jcb aic" aria-expanded="true">
                  <span>Shipping Methods</span>
                  <span className="details__icon" />
                </summary>
                <div className="details-content">
                  <p>
                    FOR ORDERS WITHIN THE UNITED STATES, AMIRI OFFERS
                    COMPLIMENTARY 3-5 DAY STANDARD SHIPPING, $20 2-3 DAY EXPRESS
                    SHIPPING, AND $30 1-2 DAY RUSH SHIPPING.
                    <br />
                    <br />
                    ALL INTERNATIONAL ORDERS WILL BE SHIPPED VIA DHL EXPRESS.
                  </p>
                  <p />
                  <p>
                    *SHIPPING TIMES ARE NOT GUARANTEED AND DO NOT ACCOUNT FOR
                    THE 2-3 DAY ORDER PROCESSING WINDOW.
                  </p>
                </div>
              </details>
              <details>
                <summary className="flex jcb aic">
                  <span>International Shipping</span>
                  <span className="details__icon" />
                </summary>
                <div className="details-content">
                  <p>
                    AMIRI OFFERS WORLDWIDE SHIPPING. PLEASE SELECT YOUR COUNTRY
                    ON OUR HOMEPAGE TO SHOP IN YOUR PREFERRED LANGUAGE AND
                    CURRENCY.
                    <br />
                    <br />
                    DELIVERY DUTIES AND FEES ARE DEPENDENT ON SHIPPING LOCATION.
                    REACH OUT TO SUPPORT@AMIRI.COM WITH ANY QUESTIONS ABOUT
                    INTERNATIONAL SHIPPING ABILITIES.{" "}
                  </p>
                  <p>
                    <br />
                    PLEASE CONTACT YOUR LOCAL CUSTOMS OFFICE FOR ASSISTANCE WITH
                    ESTIMATING ADDITIONAL COSTS AND OR PROCEED TO OUR CHECKOUT
                    PAGE FOR CALCULATION.
                  </p>
                </div>
              </details>
              <details>
                <summary className="flex jcb aic">
                  <span>Returns: USA Customers</span>
                  <span className="details__icon" />
                </summary>
                <div className="details-content">
                  <p>
                    AMIRI OFFERS COMPLIMENTARY DOMESTIC RETURN SHIPPING. TO
                    INITIATE A RETURN, PLEASE VISIT{" "}
                    <a
                      href="https://RETURNS.AMIRI.COM"
                      target="_blank"
                      title="https://RETURNS.AMIRI.COM"
                    >
                      HERE
                    </a>
                    . AMIRI CURRENTLY ALLOWS RETURNS AND EXCHANGES WITHIN 14
                    DAYS OF THE ORDER DELIVERY DATE. ALL RETURNED ITEMS MUST BE
                    UNWORN, UNDAMAGED, AND UNWASHED WITH ALL ORIGINAL TAGS
                    ATTACHED. THE ORIGINAL INVOICE MUST BE INCLUDED WITH ANY
                    RETURN. FAILURE TO DO SO CAN DELAY THE PROCESSING OF YOUR
                    RETURN.
                    <br />
                    <br />
                    EXCHANGES CAN BE MADE FOR A DIFFERENT SIZE OR COLOR OF THE
                    ORIGINAL STYLE ORDERED, DEPENDING ON PRODUCT AVAILABILITY.
                    IF YOU WOULD LIKE TO EXCHANGE YOUR ITEM FOR A DIFFERENT
                    STYLE, PLEASE RETURN YOUR ITEM FOR A REFUND AND PLACE A NEW
                    ORDER FOR THE PREFERRED STYLE. UP TO ONE EXCHANGE SHIPMENT
                    WILL BE PAID BY AMIRI.
                    <br />
                    <br />
                    RETURNS ARE PROCESSED WITHIN 3-5 BUSINESS DAYS OF ARRIVING
                    AT OUR FACILITY. THIS PERIOD MAY BE LONGER DURING PEAK
                    PERIODS. A FULL REFUND WILL BE ISSUED UPON THE ARRIVAL AND
                    INSPECTION OF YOUR RETURN. REFUNDS WILL BE ISSUED TO THE
                    ORIGINAL PAYMENT METHOD OR BY CHECK MAILED TO THE ADDRESS
                    LISTED FOR THE ORDER. FOR REFUNDS ISSUED TO THE ORIGINAL
                    PAYMENT METHOD, PLEASE ALLOW 5-10 BUSINESS DAYS FOLLOWING
                    PROCESSING FOR THE REFUND TO APPEAR ON YOUR BANK STATEMENT.
                    FOR REFUNDS ISSUED BY CHECK, PLEASE ALLOW 10 BUSINESS DAYS
                    FOLLOWING PROCESSING FOR THE REFUND TO ARRIVE.
                    <br />
                    <br />
                    IF AMIRI DETERMINES THAT ANY PRODUCTS ARE NOT IN ORIGINAL
                    CONDITION, A REFUND OR EXCHANGE WILL NOT BE GRANTED AND THE
                    ITEMS WILL BE RETURNED TO YOU.
                    <br />
                    <br />
                    IF YOU HAVE ANY QUESTIONS, PLEASE CONTACT CUSTOMER SERVICE
                    AT SUPPORT@AMIRI.COM.
                  </p>
                </div>
              </details>
              <details>
                <summary className="flex jcb aic">
                  <span>Returns: International Customers</span>
                  <span className="details__icon" />
                </summary>
                <div className="details-content">
                  <p>
                    AMIRI OFFERS COMPLIMENTARY INTERNATIONAL RETURNS. TO
                    INITIATE A RETURN FOR AN INTERNATIONAL ORDER, PLEASE VISIT{" "}
                    <a
                      href="https://web.global-e.com/returns/portal/mZbO"
                      target="_blank"
                      title="https://web.global-e.com/returns/portal/mZbO"
                    >
                      HERE
                    </a>
                    .<br />
                    <br />
                    INTERNATIONAL ORDERS ARE NOT ELIGIBLE FOR EXCHANGE. IF YOU
                    WOULD LIKE TO EXCHANGE YOUR ITEM FOR A DIFFERENT SIZE,
                    PLEASE RETURN YOUR ITEM FOR A REFUND AND PLACE A NEW ORDER
                    ON AMIRI.COM.
                    <br />
                    <br />
                    AMIRI CURRENTLY ALLOWS THE CUSTOMER TO INITIATE A RETURN
                    WITHIN 14 DAYS OF THE ORDER DELIVERY DATE. ALL RETURNED
                    ITEMS MUST BE UNWORN, UNDAMAGED, AND UNWASHED WITH ALL
                    ORIGINAL TAGS ATTACHED. THE ORIGINAL INVOICE MUST BE
                    INCLUDED WITH ANY RETURN. FAILURE TO DO SO CAN DELAY THE
                    PROCESSING OF YOUR RETURN.
                    <br />
                    <br />
                    RETURNS ARE PROCESSED WITHIN 3-5 BUSINESS DAYS OF ARRIVING
                    AT OUR FACILITY. A FULL REFUND WILL BE ISSUED UPON THE
                    ARRIVAL AND INSPECTION OF YOUR RETURN. REFUNDS WILL BE
                    ISSUED TO THE ORIGINAL PAYMENT METHOD OR BY CHECK MAILED TO
                    THE ADDRESS LISTED FOR THE ORDER. FOR REFUNDS ISSUED TO THE
                    ORIGINAL PAYMENT METHOD, PLEASE ALLOW 5-10 BUSINESS DAYS
                    FOLLOWING PROCESSING FOR THE REFUND TO APPEAR ON YOUR BANK
                    STATEMENT. FOR REFUNDS ISSUED BY CHECK, PLEASE ALLOW 10
                    BUSINESS DAYS FOLLOWING PROCESSING FOR THE REFUND TO ARRIVE.
                    IF AMIRI DETERMINES THAT ANY PRODUCTS ARE NOT IN ORIGINAL
                    CONDITION, A REFUND OR EXCHANGE WILL NOT BE GRANTED AND THE
                    ITEMS WILL BE RETURNED TO YOU.
                    <br />
                    <br />
                    IF YOU HAVE ANY QUESTIONS, PLEASE CONTACT CUSTOMER SERVICE
                    AT SUPPORT@AMIRI.COM.
                  </p>
                </div>
              </details>
              <details>
                <summary className="flex jcb aic">
                  <span>Customer Service Hours</span>
                  <span className="details__icon" />
                </summary>
                <div className="details-content">
                  <p>
                    MONDAY – FRIDAY
                    <br />
                    10AM – 6PM PST
                  </p>
                  <p />
                  <p>
                    PLEASE NOTE THAT AMIRI OBSERVES THE FOLLOWING HOLIDAYS:
                    <br />· NEW YEAR’S DAY
                    <br />· PRESIDENTS’ DAY
                    <br />· MEMORIAL DAY
                    <br />· JUNETEENTH
                    <br />· INDEPENDENCE DAY
                    <br />· LABOR DAY
                    <br />· INDIGENOUS PEOPLES' DAY
                    <br />· THANKSGIVING
                    <br />· DAY AFTER THANKSGIVING
                    <br />· CHRISTMAS EVE
                    <br />· CHRISTMAS
                  </p>
                </div>
              </details>
              <details>
                <summary className="flex jcb aic">
                  <span>Lost Packages</span>
                  <span className="details__icon" />
                </summary>
                <div className="details-content">
                  <p>
                    PLEASE NOTE THAT ONCE PROOF OF DELIVERY IS ATTACHED TO A
                    TRACKING NUMBER, AMIRI IS NOT RESPONSIBLE FOR LOST, DAMAGED,
                    OR STOLEN ITEMS. ALL RISKS ARE ASSUMED BY THE COURIER.&nbsp;
                    <br />
                    <br />
                    IF YOU HAVE ANY ADDITIONAL QUESTIONS OR REQUIRE FURTHER
                    ASSISTANCE, PLEASE CONTACT&nbsp;SUPPORT@AMIRI.COM.
                  </p>
                </div>
              </details>
              <details>
                <summary className="flex jcb aic">
                  <span>Final Sale Items</span>
                  <span className="details__icon" />
                </summary>
                <div className="details-content">
                  <p>
                    DURING SALE PERIODS, ALL SALES ARE FINAL. AMIRI RESERVES THE
                    RIGHT TO EXTEND, MODIFY, OR DISCONTINUE MARKDOWNS AT ANY
                    TIME WITHOUT NOTICE.
                    <br />
                    <br />
                    IF AMIRI MARKS DOWN THE PRICE OF AN ITEM YOU HAVE ALREADY
                    PURCHASED, WE WILL ADJUST THE SALE PRICE AT YOUR REQUEST
                    WITHIN 7 DAYS OF YOUR DELIVERY DATE.&nbsp;
                    <br />
                    <br />
                    AMIRI DOES NOT PARTICIPATE IN PRICE MATCHING WITH OTHER
                    RETAILERS.
                  </p>
                </div>
              </details>
              <details>
                <summary className="flex jcb aic">
                  <span>Complimentary Gifts (GWP)</span>
                  <span className="details__icon" />
                </summary>
                <div className="details-content">
                  <p>
                    GIFT WITH PURCHASE OFFERS ARE VALID WHILE SUPPLIES LAST.
                    OFFERS ARE NOT VALID ON PREVIOUSLY PURCHASED MERCHANDISE.
                    AMIRI RESERVES THE RIGHT TO EXTEND, MODIFY OR DISCONTINUE
                    OFFERS AT ANY TIME WITHOUT NOTICE.
                    <br />
                  </p>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
