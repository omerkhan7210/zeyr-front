import React, { useContext } from "react";
import { CartContextC } from "../../Context/CartContext";
import CartItemRows from "./CartItemRows"
import { Link } from "react-router-dom";
import { CheckoutSection } from "./CheckoutSection";

const CartPage = ({ hostLink }) => {
  const { cartItems,loading } = useContext(CartContextC);
  // Calculate the total price by multiplying the price of each item with its quantity and then summing them up
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      <main
        id="MainContent"
        className="content-for-layout cart-page"
        role="main"
        tabIndex="-1"
      >
        <div
          id="shopify-section-template--14940997189697__cart-items"
          className="shopify-section"
          style={{ background: "white" }}
        >
          <script src="/cdn/shop/t/300/assets/cart.js" defer="defer"></script>
          <link
            href="/cdn/shop/t/300/assets/cart-items.css"
            rel="stylesheet"
            type="text/css"
            media="all"
          />
          <link
            href="/cdn/shop/t/300/assets/cart-page.css"
            rel="stylesheet"
            type="text/css"
            media="all"
          />
          <style data-shopify="">
            {`
                .section-template--14940997189697__cart-items-padding {
                    padding-top: 27px;
                    padding-bottom: 27px;
                }

                @media screen and (min-width: 750px) {
                    .section-template--14940997189697__cart-items-padding {
                        padding-top: 36px;
                        padding-bottom: 36px;
                    }
                }
				`}
          </style>
          
          {loading ? <p className='cart-sidebar-loading' style={{height:'100vh'}}> <img src='/images/loadingGIF.gif'  width={"30px"} /></p> 
          :
          <div className="page-width is-empty">
            {cartItems.length > 0 ? (
              <>
                <div className="title-wrapper-with-link flex jcb flex--mobile">
                  <h1 className="title title--primary h4">Shopping bag</h1>
                  <a href="/all-collections" className="underlined-link">
                    Continue shopping
                  </a>
                </div>
                <div
                  className="cart__items"
                  id="main-cart-items"
                  data-id="template--14940997189697__cart-items"
                >
                  <div className="js-contents">
                    <table className="cart-items">
                      <caption className="visually-hidden">
                        Shopping bag
                      </caption>
                      <thead>
                        <tr>
                          <th
                            className="caption-with-letter-spacing"
                            colSpan="2"
                            scope="col"
                          >
                            Product
                          </th>
                          <th
                            className="cart-items__heading--wide small-hide caption-with-letter-spacing"
                            colSpan="1"
                            scope="col"
                          >
                            Quantity
                          </th>
                          <th
                            className="small-hide right caption-with-letter-spacing"
                            colSpan="1"
                            scope="col"
                          >
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((item) => (
                          <CartItemRows
                            key={item.id}
                            item={item}
                            hostlink={hostLink}
                          />
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="cart__warnings">
                  <h1 className="cart__empty-text h4">Your bag is empty</h1>
                  <Link to="/all-collections" className="button">
                    Continue shopping
                  </Link>
                  <h2 className="cart__login-title h4">Have an account?</h2>
                  <p className="cart__login-paragraph">
                    <Link to="/login" className="link underlined-link">
                      Log in
                    </Link>{" "}
                    to check out faster.
                  </p>
                </div>
              </>
            )}
          </div>
          } 
        </div>
        {cartItems && cartItems.length>0 ?  <CheckoutSection totalPrice={totalPrice} /> : null}
       
      </main>
    </>
  );
};

export default CartPage;