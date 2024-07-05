import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//hostlink
import { hostLink } from './Components/Hostlink/hostlink';
import { Header2 } from "./Components/HeaderFooter/Header/Header";
import Footer from "./Components/HeaderFooter/Footer/Footer";
import SearchModal from "./Components/HeaderFooter/Search/SearchModal";
import CartSidebar from "./Components/Cart/CartSidebar";
//STATIC PAGESs
import HomePage from "./Components/Static/HomePage";
import AboutPage from "./Components/Static/AboutPage";
import ContactPage from "./Components/Static/ContactPage";
import { RetailLocations } from "./Components/Static/RetailLocations";
import { Stockists } from "./Components/Static/Stockists";
import { Community } from "./Components/Static/Community";
//USER LOGIN SIGNUP
import LoginPage from "./Components/User/LoginSignup/LoginComponents/LoginPage";
import SignupForm from "./Components/User/LoginSignup/SignupComponents.jsx/SignupForm";
import ForgotPassword from "./Components/User/LoginSignup/ForgotPassword/ForgotPassword";
import MyAccount from "./Components/User/UserAccount/AccountDetails/MyAccount";
import ViewAddress from "./Components/User/UserAccount/Addresses/ViewAddress";
// ADMIN PAGES
import AdminLogin from "./Components/Admin/AdminLogin";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import ProductDetailsPage from "./Components/Products/ProductDetails/ProductDetailPage";
import MenPage from "./Components/Categories/MenPage";
import WomenPage from "./Components/Categories/WomenPage";
//CART WISHLIST CHECKOUT PAGES
import WishlistPage from "./Components/Wishlist/WishlistPage";
import CartPage from "./Components/Cart/CartPage/CartPage";
import CheckoutPage from "./Components/Checkout/CheckoutPage";
//CONTEXT IMPORT
import AddProductContext from "./Components/Context/AddProductContext";
import CartContext from "./Components/Context/CartContext";
import WishlistContext from "./Components/Context/WishlistContext";
import TokenContext from "./Components/Context/TokenContext";
import LoginContext from "./Components/Context/LoginContext";
import LocationInfo from "./Components/Context/LocationInfo";
import UserDetails from "./Components/Context/UserDetails";
import ProductFetch from "./Components/Context/ProductFetch";
import CategoriesContext from "./Components/Context/CategoriesContext";
import { CheckoutBillingShippingAddressContext } from './Components/Context/CheckoutBillingShippingAddressContext';


import { ShippingReturns } from "./Components/Static/ShippingReturns";
import { FullShippingPolicy} from "./Components/Static/FullShippingPolicy";
import { RefundPolicy} from "./Components/Static/RefundPolicy";
import { TermsUse } from "./Components/Static/TermsUse";
import { Privacy } from "./Components/Static/Privacy";
import { ZeyrFineriLaunchingInYourCountry } from "./Components/Static/ZeyrFineriLaunchingInYourCountry";
import { AccessibilityStatement } from "./Components/Static/AccessibilityStatement";
import { AllCollections } from "./Components/Categories/AllCollections";
import { AdminUsersContext } from './Components/Context/AdminUsersContext';

import { SingleOrderContainer } from './Components/User/UserAccount/Orders/SingleOrderContainer';
import MemberCard from './Components/User/UserAccount/AccountDetails/MemberCard';
import { ZFAccountDetails } from './Components/User/UserAccount/AccountDetails/ZFAccountDetails';
import MProducts from './Components/MembershipProducts/MProducts';
import { AdminContext } from './Components/Context/AdminContext';

const App = () => {
  const path = "/dashboard";
  return (
    <Router>
      <>

        <WishlistContext>
          <CartContext>
            <TokenContext>
              <Header2 />
            </TokenContext>
          </CartContext>
        </WishlistContext>
        

        <Routes>
          {/* STATIC ROUTES */}
          <Route path="*" element={
             <ProductFetch>
              <TokenContext>
              <UserDetails>
              <WishlistContext>
                
          <HomePage />
          
          </WishlistContext>
          </UserDetails>
          </TokenContext>
          </ProductFetch>
          } />

          <Route path='/memberships' element={
            
            <TokenContext>
              <CartContext>
                <WishlistContext>
                  <ProductFetch>
                  <MProducts/>
                  </ProductFetch>
                </WishlistContext>
              </CartContext>
            </TokenContext>
          }/>

          <Route path="/about" element={<AboutPage />} />
          <Route path="/pages/stores" element={<RetailLocations />} />
          <Route path="/pages/stockists-so" element={<Stockists />} />
          <Route path="/pages/community" element={<Community />} />
          <Route path="/policies/shipping-policy" element={<FullShippingPolicy/>} />
          <Route path="/policies/refund-policy" element={<RefundPolicy/>} />
          <Route path="/pages/shipping-returns" element={<ShippingReturns />} />
          <Route path="/pages/terms-of-use" element={<TermsUse />} />
          <Route path="/pages/privacy" element={<Privacy />} />
          <Route path="/pages/contact" element={<ContactPage />} />
          <Route
            path="/pages/accessibility-statement"
            element={<AccessibilityStatement />}
          />
          <Route
            path="/pages/zeyrfineri-launching-in-your-country"
            element={<ZeyrFineriLaunchingInYourCountry />}
          />
          {/* end */}

          {/* CATEGORIES PAGES */}
          <Route
            path="/men"
            element={
              <TokenContext>
              <UserDetails>
              <WishlistContext>
                <CartContext>
                  <ProductFetch>
                    <MenPage />
                  </ProductFetch>
                </CartContext>
              </WishlistContext>
              </UserDetails>
              </TokenContext>
            }
          />

          <Route
            path="/women"
            element={
              <TokenContext>
              <UserDetails>
              <WishlistContext>
                <CartContext>
                  <ProductFetch>
                    <WomenPage />
                  </ProductFetch>
                </CartContext>
              </WishlistContext>
              </UserDetails>
              </TokenContext>
            }
          />
          <Route
            path="/all-collections"
            element={
              <TokenContext>
              <UserDetails>
              <WishlistContext>
                <CartContext>
                  <ProductFetch>
                    <AllCollections />
                  </ProductFetch>
                </CartContext>
              </WishlistContext>
              </UserDetails>
              </TokenContext>
            }
          />
          {/* end */}

          <Route
            path="/wishlist"
            element={
             
              <TokenContext>
              <UserDetails>
              <WishlistContext>
                <CartContext>
                  <ProductFetch>
                  <WishlistPage />
                  </ProductFetch>
                </CartContext>
              </WishlistContext>
              
              </UserDetails>
                  </TokenContext>
              
            }
          />

          <Route
            path={`/products/:productId`}
            element={

              <WishlistContext>
                <CartContext>
                <ProductFetch>
                  <TokenContext>
                <UserDetails>
                  <ProductDetailsPage />
                  </UserDetails>
                  </TokenContext>
                  </ProductFetch>
                </CartContext>
              </WishlistContext>
            }
          />

          <Route
            path="/login"
            element={
              <LoginContext>
                <TokenContext>
                  <LoginPage hostlink={hostLink} />
                </TokenContext>
              </LoginContext>
            }
          />

          <Route
            path="/forgot-password"
            element={<ForgotPassword/>}
          />
          <Route
            path="/my-zf"
            element={
              <TokenContext>
                <UserDetails>
                  <LocationInfo>
                  <ProductFetch>
                  <AdminContext>
                    <MyAccount/>
                    </AdminContext>
                    </ProductFetch>
                  </LocationInfo>
                </UserDetails>
              </TokenContext>
            }
          />

          <Route
            path="/my-zf/:orderid"
            element={
              <TokenContext>
                <UserDetails>
                  <LocationInfo>
                  <ProductFetch>
                    <AdminContext>
                    <SingleOrderContainer/>
                    </AdminContext>
                    </ProductFetch>
                  </LocationInfo>
                </UserDetails>
              </TokenContext>
            }
          />

          <Route
            path="/my-zf/card"
            element={
              <TokenContext>
                <UserDetails>
                  <LocationInfo>
                  <ProductFetch>
                    <AdminContext>
                    <MemberCard/>
                    </AdminContext>
                    </ProductFetch>
                  </LocationInfo>
                </UserDetails>
              </TokenContext>
            }
          />

          <Route
            path="/myzf-account-details"
            element={
              <TokenContext>
                <UserDetails>
                  <LocationInfo>
                  <ProductFetch>
                    <ZFAccountDetails/>
                    </ProductFetch>
                  </LocationInfo>
                </UserDetails>
              </TokenContext>
            }
          />

          <Route path="/signup" element={<SignupForm isAdmin={false}/>} />
          <Route
            path="/view-addresses"
            element={
              <TokenContext>
                <UserDetails>
                  <ViewAddress />
                </UserDetails>
              </TokenContext>
            }
          />

          <Route
            exact
            path="/admin"
            element={
            <TokenContext>
              <AdminContext>
            <AdminLogin
            />
            </AdminContext>
            </TokenContext>
            }
          />

        
          <Route
            exact
            path="/dashboard/*"
            element={
              <TokenContext>
              <ProductFetch>
              <AdminContext>
              <AdminUsersContext>
              <CategoriesContext>
                <AddProductContext>
            <AdminDashboard hostlink={hostLink} />
            </AddProductContext>
            </CategoriesContext>
            </AdminUsersContext>
            </AdminContext>
            </ProductFetch>
            </TokenContext>
            }
          />


          {/* CART & CHECKOUT PAGE */}
          <Route
            path="/cart"
            element={
              
              <ProductFetch>
              <CartContext>
                <TokenContext>
              <UserDetails>
                <CartPage />
                </UserDetails>
                </TokenContext>
              </CartContext>
              
              </ProductFetch>
              
            }
          />

          <Route
            path="/checkout"
            element={
             
              <TokenContext>
                 <CheckoutBillingShippingAddressContext>
                <LoginContext>
                  <CartContext>
                    <UserDetails>
                      <ProductFetch>
                       <CheckoutPage />
                      </ProductFetch>
                    </UserDetails>
                  </CartContext>
                </LoginContext>
                </CheckoutBillingShippingAddressContext>
              </TokenContext>
             
              
            }
          />
        </Routes>

        <LocationInfo>
          <ProductFetch>
          <Footer />
          </ProductFetch>
        </LocationInfo>

      
<WishlistContext>
        <ProductFetch>
          <TokenContext>
        <UserDetails>
          <SearchModal />
          </UserDetails>
          </TokenContext>
        </ProductFetch>
        </WishlistContext>

        
        <WishlistContext>
        <ProductFetch>
        <CartContext>
          <CartSidebar />
        </CartContext>
        </ProductFetch>
        </WishlistContext>
      </>
    </Router>
  );
};

export default App;
