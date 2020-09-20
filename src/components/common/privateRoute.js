import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRoute({ component: Component, ...rest }) {
  const authorized = useSelector(state => state.authReducer.authorized);
  return (
    <Route
      {...rest}
      render={(props) =>
        authorized ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default PrivateRoute;
