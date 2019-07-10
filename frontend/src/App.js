import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";

import LoginScreen from "./Containers/LoginScreen";
import RegisterScreen from "./Containers/RegisterScreen";
import HomeScreen from "./Containers/HomeScreen";
import EmptyScreen from "./Containers/EmptyScreen";
import Navbar from "./Containers/Navbar";
import PrivateRoute from "./Containers/PrivateRoute";

import AuthActions from "./Redux/AuthRedux";

import { withRouter } from "react-router";

class App extends Component {
  state = {
    accessToken: null
  };

  componentDidMount() {
    if(localStorage.getItem("access")){
      this.setState({
        accessToken: localStorage.getItem("access")
      });
    }

    const { location: { pathname }, authCheck, history } = this.props;

    if(pathname !== '/' && pathname !== '/Register'){
      authCheck(this.state.accessToken, history, pathname)
    }


  }
  render() {
    const { accessToken } = this.state;
    return (
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={LoginScreen}/>
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

const mapActionsToProps = dispatch => {
  return {
    authCheck: (data, history, pathname) => dispatch(AuthActions.authCheckRequest(data, history, pathname))
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapActionsToProps
  )(App)
);