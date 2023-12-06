import React from "react";
import { Link } from "react-router-dom";
import { MdShoppingCart, MdOutlineSearch } from "react-icons/md";
import UserOption from "./UserOption";
import { useSelector } from "react-redux";
import "./UserOption.css";
const Header = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <>
      <div className="bg-dark text-white py-2">
        <div className="container py-1 d-flex justify-content-between">
          <span>Free shipping, 30-day return or refund guarantee.</span>
          <div>
            <Link to="/login" className="text-decoration-none text-white">
              My Account
            </Link>
          </div>
        </div>
      </div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm ">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <span className="fw-bold text-dark">SAJILO</span><span className="fw-bold text-danger">STORE</span>
          </Link>
          <button
            className="navbar-toggler w-auto border-0 shadow-none me-0 "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 ">
              <li className="nav-item mx-3">
                <Link
                  className="nav-link   text-dark"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item mx-3">
                <Link className="nav-link text-dark" to="/products">
                  Product
                </Link>
              </li>
              <li className="nav-item mx-3">
                <Link className="nav-link  text-dark" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item mx-3">
                <Link className="nav-link  text-dark" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>
            <div className=" d-flex pe-4 align-items-center">
              <Link to="/search" className="me-2  fs-4 text-dark">
                <MdOutlineSearch />
              </Link>
              <Link to="/cart" className="me-3  fs-5 text-dark ">
                <MdShoppingCart className="cart" />
                <span className="cartItem me-2">{cartItems.length}</span>
              </Link>
              <Link to="/login" className=" me-3 fs-4 text-dark">
                {isAuthenticated ? <UserOption /> : ""}
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
