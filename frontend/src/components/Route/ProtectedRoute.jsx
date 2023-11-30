import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";

const ProtectedRoute = ({ children }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  if (loading) {
    return <Loader />;
  }

  if (
    !isAuthenticated ||
    !user ||
    !(user.role === "admin" || user.role === "user")
  ) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
