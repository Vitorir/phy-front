import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
    const navigate = useNavigate();
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    console.log(token);
    return token ? true : false;
  };

  return isAuthenticated() ? element : navigate('log-in');
};

export default PrivateRoute;
