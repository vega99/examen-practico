import React from "react";
import { Redirect, Route } from "react-router";


const ProtectedRoute = ({ component: Component, path, isPrivate, ...rest }) => {
  return (
    <Route
      path={path}
      render={(props) =>
        isPrivate && !Boolean(localStorage.getItem("userQA")) ? (
          <Redirect to={{ pathname: "/home" }} />
        ) : (
          <Component {...props} />
        )
      }
      {...rest}
    />
  );
};

export default ProtectedRoute;