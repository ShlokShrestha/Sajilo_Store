import { useEffect } from "react";
import "./index.css";
import Header from "./components/layout/Header/Header.jsx";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import Footer from "./components/layout/Footer/Footer.jsx";
import Home from "./components/Home/Home.jsx";
import ProductDetails from "./components/Product/ProductDetails.jsx";
import Product from "./components/Product/Products.jsx";
import Search from "./components/Product/Search.jsx";
import LoginSignUp from "./components/User/LoginSignUp.jsx";
import store from "./store";
import { loadUser } from "./actions/userAction.jsx";
import Profile from "./components/User/Profile.jsx";
import ProtectRoute from "./components/Route/ProtectedRoute.jsx";
import UpdateProfile from "./components/User/UpdateProfile.jsx";
import UpdatePassword from "./components/User/UpdatePassword.jsx";
import PasswordForgot from "./components/User/PasswordForgot.jsx";
import ResetPassword from "./components/User/ResetPassword.jsx";
import Cart from "./components/Cart/Cart.jsx";
import Shipping from "./components/Cart/Shipping.jsx";
import ConfirmOrder from "./components/Cart/ConfirmOrder.jsx";
import Success from "./components/Cart/SuccessFully.jsx";
import MyOrders from "./components/Orders/MyOrders.jsx";
import Dashboard from "./components/Admin/Dashboard.jsx";
import ProductList from "./components/Admin/ProductList.jsx";
import NewProduct from "./components/Admin/NewProduct.jsx";
import UpdateProduct from "./components/Admin/UpdateProduct.jsx";
import OrderList from "./components/Admin/OrderList.jsx";
import ProcessOrder from "./components/Admin/ProcessOrder.jsx";
import UserList from "./components/Admin/UserList.jsx";
import UpdateUser from "./components/Admin/UpdateUser.jsx";
function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
  }, []);

  const isOnAdminPanel = location.pathname.startsWith("/admin");

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              <Header />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          exact
          path="/products"
          element={
            <>
              <Header />
              <Product />
              <Footer />
            </>
          }
        />
        <Route
          exact
          path="/account"
          element={
            <ProtectRoute>
              <Header />
              <Profile />
              <Footer />
            </ProtectRoute>
          }
        />
        <Route
          exact
          path="/me/update"
          element={
            <ProtectRoute>
              <Header />
              <UpdateProfile />
              <Footer />
            </ProtectRoute>
          }
        />
        <Route
          exact
          path="/password/update"
          element={
            <ProtectRoute>
              <Header />
              <UpdatePassword />
              <Footer />
            </ProtectRoute>
          }
        />
        <Route
          exact
          path="/shipping"
          element={
            <ProtectRoute>
              <Header />
              <Shipping />
              <Footer />
            </ProtectRoute>
          }
        />
        <Route
          exact
          path="/order/confirm"
          element={
            <ProtectRoute>
              <Header />
              <ConfirmOrder />
              <Footer />
            </ProtectRoute>
          }
        />
        <Route
          exact
          path="/success"
          element={
            <ProtectRoute>
              <Header />
              <Success />
              <Footer />
            </ProtectRoute>
          }
        />
        <Route
          exact
          path="/orders"
          element={
            <ProtectRoute>
              <Header />
              <MyOrders />
              <Footer />
            </ProtectRoute>
          }
        />
        <Route
          exact
          path="/search"
          element={
            <>
              <Header />
              <Search />
              <Footer />
            </>
          }
        />
        <Route
          path="/products/:keyword"
          element={
            <>
              <Header />
              <Product />
              <Footer />
            </>
          }
        />
        <Route
          exact
          path="/product/:id"
          element={
            <>
              <Header />
              <ProductDetails />
              <Footer />
            </>
          }
        />
        <Route
          exact
          path="/login"
          element={
            <>
              <Header />
              <LoginSignUp />
              <Footer />
            </>
          }
        />
        <Route
          exact
          path="/password/forgot"
          element={
            <>
              <Header />
              <PasswordForgot />
              <Footer />
            </>
          }
        />
        <Route
          exact
          path="/password/reset/:token"
          element={
            <>
              <Header />
              <ResetPassword />
              <Footer />
            </>
          }
        />
        <Route
          exact
          path="/cart"
          element={
            <>
              <Header />
              <Cart />
              <Footer />
            </>
          }
        />
        <Route
          exact
          path="/admin/dashboard"
          element={
            <ProtectRoute>
              <Dashboard />
            </ProtectRoute>
          }
        />
        <Route
          exact
          path="/admin/products"
          element={
            <ProtectRoute>
              <ProductList />
            </ProtectRoute>
          }
        />
        <Route
          exact
          path="/admin/product/new"
          element={
            <ProtectRoute>
              <NewProduct />
            </ProtectRoute>
          }
        />
        <Route
          exact
          path="/admin/product/:id"
          element={
            <ProtectRoute>
              <UpdateProduct />
            </ProtectRoute>
          }
        />
        <Route
          exact
          path="/admin/orders"
          element={
            <ProtectRoute>
              <OrderList />
            </ProtectRoute>
          }
        />
        <Route
          exact
          path="/admin/order/:id"
          element={
            <ProtectRoute>
              <ProcessOrder />
            </ProtectRoute>
          }
        />
        <Route
          exact
          path="/admin/users"
          element={
            <ProtectRoute>
              <UserList />
            </ProtectRoute>
          }
        />
        <Route
          exact
          path="/admin/user/:id"
          element={
            <ProtectRoute>
              <UpdateUser />
            </ProtectRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
