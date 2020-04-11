import EmptyScreen from "Containers/EmptyScreen";
import LoginScreen from "Containers/LoginScreen";
import Navbar from "Containers/Navbar";
import SignupScreen from "Containers/SignupScreen";
import navRoutes from "Navigation/NavRoutes";
import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Route, Switch } from "react-router-dom";
import AuthActions, { AuthSelectors } from "Redux/AuthRedux";
import RestrictedRoutes from "./RestrictedRoutes";
import WelcomeScreen from "Containers/WelcomeScreen";
class MainRoute extends Component {
  state = {
    accessToken: null,
  };

  render() {
    const { isAuthenticated } = this.props;
    return (
      <div>
        <Route path={navRoutes.root} component={Navbar} />
        <Switch>
          <Route exact path={navRoutes.root} component={WelcomeScreen} />
          <Route path={navRoutes.login} component={LoginScreen} />
          <Route path={navRoutes.signup} component={SignupScreen} />
          <RestrictedRoutes isAuthenticated={isAuthenticated} />
          <Route render={() => <EmptyScreen error_msg={404} />} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: AuthSelectors.isAuthenticated(state),
  };
};

const mapActionsToProps = dispatch => {
  return {
    authCheck: data => dispatch(AuthActions.authCheckRequest(data)),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapActionsToProps
  )(MainRoute)
);
