import React from "react";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const auth = localStorage.getItem("isLoggedin");

  if (!auth) return <Navigate to="/" />;
  return children;
};

export default RequireAuth;
