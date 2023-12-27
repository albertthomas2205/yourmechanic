import React from 'react';
import { Route, useNavigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAdmin, ...rest }) => {
  const navigate = useNavigate();

  return (
    <Route
      {...rest}
      render={(props) =>
        isAdmin ? <Component {...props} /> : navigate('/forbidden')
      }
    />
  );
};

export default PrivateRoute;
