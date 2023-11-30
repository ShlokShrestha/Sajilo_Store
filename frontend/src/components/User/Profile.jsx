import React, { useEffect } from "react";
import "./Profile.css";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useNavigate, Link } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { loading, user, isAuthenticated } = useSelector((state) => state.user);
  const isoDate = new Date(user.createAt);
  const date = isoDate.toLocaleString();
  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated, user, navigate]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="profileContainer">
            <h4 className="text-center pt-4 mb-2">My Profile</h4>
            <div className="line w-25 mx-auto my-3 "></div>
            <div className="container-fluid">
              <div className="row mt-5">
                <div className="col-lg-4">
                  <h4 className="text-center">PROFILE OVERVIEW</h4>
                  <div className="bg-white shadow-sm profileOverview text-center">
                    <div className="profileImg">
                      <img src={user.avatar.url} alt={user.name} />
                    </div>
                    <div className="mt-3">
                      <b>Full Name: </b>
                      <p>{user.name}</p>
                    </div>
                    <div>
                      <b>Email:</b>
                      <p>{user.email}</p>
                    </div>
                    <div>
                      <b>Member Since:</b>
                      <p>{date}</p>
                    </div>
                  </div>
                  <div className="ordersOverView bg-white ">
                    <h4 className="text-center mb-3">Orders</h4>
                    <Link to={"/orders"}>
                      <button className="w-100">Orders</button>
                    </Link>
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="personalInfo">
                    <div className="mb-4">
                      <h6 className="fw-bold">PERSONAL INFORMATION</h6>
                      <p>
                        Hey there ! Feel free to edit any of your details below
                        so your account is up to date.
                      </p>
                    </div>
                    <div className="my-4">
                      <h6 className="fw-bold">MY DETAILS</h6>
                      <div className="d-flex flex-column my-3">
                        <span className="mb-1">Name : {user.name}</span>
                        <span className="mb-1">Email: {user.email}</span>
                        <span className="mb-1">Name : {user.name}</span>
                      </div>
                      <Link to="/me/update">
                        <button className="w-50">Edit Profile</button>
                      </Link>
                    </div>
                    <div className="my-1">
                      <h6 className="fw-bold">LOGIN DETAILS</h6>
                      <div className="d-flex flex-column mt-3 ">
                        <div>
                          <b>Email: </b>
                          <p>{user.email}</p>
                        </div>
                        <div>
                          <b>Password: </b>
                          <p>*************</p>
                        </div>
                      </div>
                      <Link to="/password/update">
                        <button className="w-50">Change Password</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
