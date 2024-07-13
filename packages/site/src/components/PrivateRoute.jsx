import React from 'react';
import { useWallet } from '../context/WalletContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { isConnected } = useWallet();

  if (!isConnected) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
