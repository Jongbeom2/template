import React from 'react';
import {Route, Redirect} from 'react-router-dom';
const AuthRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() =>
        rest.isSignedin
        ? (children)
        : (<Redirect to={{pathname: "/signin"}}/>)
      }
    />
  );
};

export default AuthRoute;