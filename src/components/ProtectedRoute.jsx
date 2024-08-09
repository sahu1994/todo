import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  // If user is not authenticated, redirect to login
  if (user === null) {
    return <Navigate to="/" replace />;
  }
  // If authenticated, render the children or nested routes
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
