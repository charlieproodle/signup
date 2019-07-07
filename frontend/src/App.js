import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import { Switch, Route, withRouter } from "react-router-dom";

import LoginScreen from "./Containers/LoginScreen";
import RegisterScreen from "./Containers/RegisterScreen";
import HomeScreen from "./Containers/HomeScreen";
import EmptyScreen from "./Containers/EmptyScreen";
import Navbar from "./Containers/Navbar";
import PrivateRoute from "./Containers/PrivateRoute";

class App extends Component {
  state = {
    accessToken: null
  };
  componentDidMount() {
    const accessToken = localStorage.getItem("access");
    this.setState({
      accessToken: accessToken
    });
  }
  render() {
    const { accessToken } = this.state;
    return (
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={LoginScreen} />
          <Route path="/Register" component={RegisterScreen} />
          <PrivateRoute
            path="/HomeScreen"
            component={HomeScreen}
            accessToken={accessToken}
          />
          <Route render={() => <EmptyScreen error_msg={404} />} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapActionsToProps = {};

export default withRouter(
  connect(
    mapStateToProps,
    mapActionsToProps
  )(App)
);
