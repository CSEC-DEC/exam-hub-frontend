import React from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const cookieVal = Cookies.get("access_token");

  if (!cookieVal) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
