import React from "react";
import { FaUser } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./UserOption.css";
import { useDispatch } from "react-redux";
import { logOut } from "../../../actions/userAction";
const UserOption = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function logoutUser() {
    dispatch(logOut());
    navigate("/");
    alert("logout successfully");
  }

  return (
    <>
      <div className="dropdown">
        <div className="mb-1">
          <FaUser className="fs-5" />
          <i className="fa fa-caret-down fs-5"></i>
        </div>
        <div className="dropdown-content">
          {user && user.role === "admin" ? (
            <Link to="/admin/dashboard">Dashboard</Link>
          ) : (
            ""
          )}
          <Link to="/account">Account</Link>
          <Link to="/orders">Order</Link>
          <Link onClick={logoutUser}>Logout</Link>
        </div>
      </div>
    </>
  );
};

export default UserOption;
