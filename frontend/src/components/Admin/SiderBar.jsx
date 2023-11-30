import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MdDashboard,
  MdHome,
  MdOutlineFormatListNumbered,
  MdFormatListBulletedAdd,
  MdOutlineRateReview,
  MdOutlineContactPhone,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import "./admin.css";
import Loader from "../layout/Loader/Loader";
import { clearErrors } from "../../actions/userAction";
const SiderBar = () => {
  const dispatch = useDispatch();
  const { loading, user, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="slider sticky-top bg-white py-2">
          <div className="heading text-center py-3 ">
            <div className="mx-auto my-3">
              {user && user.avatar && (
                <img
                  src={user.avatar.url}
                  alt={user.name}
                  className="w-25 rounded-circle "
                />
              )}
            </div>
            <div className="d-flex flex-column mb-3">
              <b className="fs-5">{user.name}</b>
              <span>{user.email}</span>
            </div>
            <div className="line w-75 mx-auto"></div>
          </div>
          <div>
            <div>
              <div className="d-flex align-items-center fs-5 px-2 py-2 btns mx-auto my-2 ">
                <MdDashboard className="me-3" />
                <Link to="/admin/dashboard">Dashboard</Link>
              </div>
              <div className="d-flex align-items-center fs-5 px-2 py-2 btns mx-auto my-2 ">
                <MdHome className="me-3" />
                <Link to="/">Home</Link>
              </div>
              <div className="d-flex align-items-center fs-5 px-2 py-2 btns mx-auto my-2 ">
                <MdOutlineFormatListNumbered className="me-3" />
                <Link to="/admin/products">Product List</Link>
              </div>
              <div className="d-flex align-items-center fs-5 px-2 py-2 btns mx-auto my-2 ">
                <MdFormatListBulletedAdd className="me-3" />
                <Link to="/admin/product/new">Add Product</Link>
              </div>
              <div className="d-flex align-items-center fs-5 px-2 py-2 btns mx-auto my-2 ">
                <MdOutlineFormatListNumbered className="me-3" />
                <Link to="/admin/orders">Orders</Link>
              </div>
              <div className="d-flex align-items-center fs-5 px-2 py-2 btns mx-auto my-2 ">
                <MdOutlineRateReview className="me-3" />
                <Link to="/admin/orders">Review</Link>
              </div>
              <div className="d-flex align-items-center fs-5 px-2 py-2 btns mx-auto my-2 ">
                <MdOutlineContactPhone className="me-3" />
                <Link to="/admin/orders">Contact</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SiderBar;
