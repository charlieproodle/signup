import MainRoute from "Navigation/MainRoute";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import "./App.css";
import AuthActions from "./Redux/AuthRedux";

class App extends Component {
  state = {
    accessToken: null,
  };

  render() {
    return (
      <MainRoute />
    );
  }
}

const mapStateToProps = state => {
  return {};
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
  )(App)
);
