import React, { Component } from "react";
import PrivateRoute from "./PrivateRoute";
import navRoutes from "Navigation/NavRoutes";
import HomeScreen from "Containers/HomeScreen";

export default class RestrictedRoute extends Component {
  render() {
    const {
      isAuthenticated
    } = this.props;
    return (
      <>
        <PrivateRoute
          path={navRoutes.homeScreen}
          component={HomeScreen}
          isAuthenticated={isAuthenticated}
        />
      </>
    );
  }
}