import React from "react";
import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../provider/AuthContext";

export const ProtectedRoute = () => {
  const {authenticated} = useAuth();
  // Check if the user is authenticated
  if (authenticated === false) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};

export const ProtectedAuthRoute = () => {
  const {authenticated} = useAuth();
  if (authenticated === true) {
    console.log("navigate /");
    return <Navigate to="/" />;
  } else {
    console.log("navigate login");
    return <Navigate to="/login" />;
  }
};
