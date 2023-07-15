import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./Layout/User";
import Home from "./pages/home/Home";
import About from "./pages/About";
import Contact from "./pages/Contact/Contact";
import OurStore from "./pages/OurStore/OurStore";
import Blog from "./pages/blog/Blog";
import CompareProduct from "./pages/CompareProduct/CompareProduct";
import WishList from "./pages/WishList/WishList";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import SignUp from "./pages/Sign-Up/SignUp";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import SingleBlog from "./pages/SingleBlog/SingleBlog";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy/RefundPolicy";
import ShippingPolicy from "./pages/ShippingPolicy/ShippingPolicy";
import TermAndCondition from "./pages/TermsAndCondition/TermAndCondition";
import SingleProduct from "./pages/SingleProduct/SingleProduct";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import RequireAuth from "./components/RequireAuth/index";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={
              <User>
                <Home />
              </User>
            }
          />
          <Route
            path="/about"
            element={
              <User>
                <About />
              </User>
            }
          />
          <Route
            path="/contact"
            element={
              <User>
                <Contact />
              </User>
            }
          />
          <Route
            path="/product"
            element={
              <User>
                <OurStore />
              </User>
            }
          />
          <Route
            path="/product/:id"
            element={
              <User>
                <SingleProduct />
              </User>
            }
          />
          <Route
            path="/blogs"
            element={
              <User>
                <Blog />
              </User>
            }
          />
          <Route
            path="/blogs/:id"
            element={
              <User>
                <SingleBlog />
              </User>
            }
          />
          <Route element={<RequireAuth />}>
            {" "}
            <Route
              path="/cart"
              element={
                <User>
                  <Cart />
                </User>
              }
            />
          </Route>

          <Route
            path="/checkout"
            element={
              <User>
                <Checkout />
              </User>
            }
          />
          <Route
            path="/compare-product"
            element={
              <User>
                <CompareProduct />
              </User>
            }
          />
          <Route
            path="/wishlist"
            element={
              <User>
                <WishList />
              </User>
            }
          />
          <Route
            path="/login"
            element={
              <User>
                <Login />
              </User>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <User>
                <ForgotPassword />
              </User>
            }
          />
          <Route
            path="/sign-up"
            element={
              <User>
                <SignUp />
              </User>
            }
          />
          <Route
            path="/reset-password"
            element={
              <User>
                <ResetPassword />
              </User>
            }
          />
          <Route
            path="/privacy-policy"
            element={
              <User>
                <PrivacyPolicy />
              </User>
            }
          />
          <Route
            path="/refund-policy"
            element={
              <User>
                <RefundPolicy />
              </User>
            }
          />
          <Route
            path="/shipping-policy"
            element={
              <User>
                <ShippingPolicy />
              </User>
            }
          />
          <Route
            path="/term-conditions"
            element={
              <User>
                <TermAndCondition />
              </User>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
