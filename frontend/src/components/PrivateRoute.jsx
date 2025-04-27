import React from "react";
import { Navigate } from "react-router-dom";
import { getUserRole } from "../utils/auth.js"; // Import role checking utility

const PrivateRoute = ({ role, children }) => {
  const userRole = getUserRole(); // Get the user's role from token

  if (!userRole) {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }

  if (userRole !== role) {
    return <Navigate to={`/${userRole}/dashboard`} />; // Redirect to the appropriate dashboard based on role
  }

  return children; // If the role matches, render the child component
};

export default PrivateRoute;
