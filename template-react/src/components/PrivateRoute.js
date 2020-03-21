import React from 'react';
import {Route, Redirect} from 'react-router-dom';
const PrivateRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() =>
        rest.user.isLogined
        ? (children)
        : (<Redirect to={{pathname: "/login"}}/>)
      }
    />
  );
};

export default PrivateRoute;