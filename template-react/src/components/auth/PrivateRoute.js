import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {Auth} from './Auth';
const PrivateRoute = ({ children, ...rest }) => {
  console.log(Auth());
  return (
    <Route
      {...rest}
      render={() =>
        Auth().isLogined
        ? (children)
        : (<Redirect to={{pathname: "/login"}}/>)
      }
    />
  );
};

export default PrivateRoute;