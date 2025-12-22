import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isSignedIn } = useUser();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = isSignedIn || user;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

 
  if (requireAdmin && user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;