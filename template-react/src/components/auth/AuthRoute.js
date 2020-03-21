import React from 'react';
import {Route, Redirect} from 'react-router-dom';
const AuthRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() =>
        rest.isLogined
        ? (children)
        : (<Redirect to={{pathname: "/login"}}/>)
      }
    />
  );
};

export default AuthRoute;