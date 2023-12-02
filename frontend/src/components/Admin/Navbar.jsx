import React from "react";
import "./admin.css";
import { Link } from "react-router-dom";
import {
  MdDashboard,
  MdHome,
  MdOutlineFormatListNumbered,
  MdFormatListBulletedAdd,
  MdOutlineRateReview,
  MdOutlineContactPhone,
} from "react-icons/md";
const Navbar = () => {
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div class="container-fluid">
          <button
            class="navbar-toggler shadow-none "
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#sidebar"
            aria-controls="offcanvasExample"
          >
            <span class="navbar-toggler-icon" data-bs-target="#sidebar"></span>
          </button>
          <a
            class="navbar-brand me-auto ms-lg-0 ms-3 text-uppercase fw-bold"
            href="#"
          >
            <span className="fw-bold text-white">SAJILO</span>
            <span className="fw-bold text-danger">STORE</span>
          </a>
        </div>
      </nav>
      <div
        class="offcanvas offcanvas-start sidebar-nav bg-dark"
        tabindex="-1"
        id="sidebar"
      >
        <div class="offcanvas-body p-0">
          <nav class="navbar-dark">
            <ul class="navbar-nav mt-4">
              <li className="mb-2"> 
                <div class="text-muted small fw-bold text-uppercase px-3">
                  Admin Dashboard
                </div>
              </li>
              <li>
                <div className="d-flex align-items-center px-2 py-2 btns mx-auto my-1 ">
                  <MdDashboard className="me-2" />
                  <Link to="/admin/dashboard">Dashboard</Link>
                </div>
              </li>
              <li>
                <div className="d-flex align-items-center px-2 py-2 btns mx-auto my-1 ">
                  <MdHome className="me-2" />
                  <Link to="/">Home</Link>
                </div>
              </li>
              <li>
                <div className="d-flex align-items-center px-2 py-2 btns mx-auto my-1 ">
                  <MdOutlineFormatListNumbered className="me-2" />
                  <Link to="/admin/products">Product List</Link>
                </div>
              </li>
              <li>
                <div className="d-flex align-items-center px-2 py-2 btns mx-auto my-1 ">
                  <MdFormatListBulletedAdd className="me-2" />
                  <Link to="/admin/product/new">Add Product</Link>
                </div>
              </li>
              <li>
                <div className="d-flex align-items-center px-2 py-2 btns mx-auto my-1 ">
                  <MdOutlineFormatListNumbered className="me-2" />
                  <Link to="/admin/orders">Orders</Link>
                </div>
              </li>
              <li>
                <div className="d-flex align-items-center px-2 py-2 btns mx-auto my-1 ">
                  <MdOutlineRateReview className="me-2" />
                  <Link to="/admin/orders">Review</Link>
                </div>
              </li>
              <li>
                <div className="d-flex align-items-center px-2 py-2 btns mx-auto my-1 ">
                  <MdOutlineContactPhone className="me-2" />
                  <Link to="/admin/orders">Contact</Link>
                </div>
              </li>
              <li class="my-4">
                <hr class="dropdown-divider bg-light" />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
