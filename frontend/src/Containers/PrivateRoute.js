import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

class PrivateRoute extends Component {
  render() {
    const { component: Component, accessToken, ...rest } = this.props;
    console.log(accessToken)
    return (
      <Route
        {...rest}
        render={props =>
          accessToken ? (
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
