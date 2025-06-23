import React from "react";
import { Navigate } from "react-router-dom";

const PrivateAdminRoute = ({ children }) => {
  const token = sessionStorage.getItem("auth_token");
  const user = JSON.parse(sessionStorage.getItem("user"));

  // Ako nije ulogovan ili nije admin → redirect
  if (!token || !user || user.email !== "admin@gmail.com") {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateAdminRoute;
