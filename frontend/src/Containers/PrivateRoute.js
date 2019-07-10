import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

class PrivateRoute extends Component {
  render() {
    const { component: Component, accessToken, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props =>
          localStorage.getItem("access") ? (
            <Component {...props} />
          ) : (
            <Redirect to="/" />
          )
        }
      />
    );
  }
}

export default PrivateRoute;
