import React, { Component } from "react";
import AuthActions, { AuthSelectors } from "../Redux/AuthRedux";
import { connect } from "react-redux";
import { compose } from "redux";
import LoginForm from "../Forms/LoginForm";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/LoginScreenStyle";
import navRoutes from "Navigation/NavRoutes";

class LoginScreen extends Component {
  state = {
    fetching: false,
    success: false,
    error: null,
  };

  loginFailure = error => {
    this.setState({
      fetching: false,
      success: false,
      error: error.detail,
    });
  };

  loginSuccess = () => {
    this.setState({
      fetching: false,
      success: true,
      error: null,
    });
    console.log('Success')
    this.props.history.push(navRoutes.homeScreen);
  };

  handleSubmit = val => {
    this.setState({ fetching: true });
    const { login } = this.props;
    const resolve = {
      onSuccess: () => this.loginSuccess(),
      onFailure: e => this.loginFailure(e)
    }
    login(val, resolve)
  };

  render() {
    const { classes } = this.props;
    const { fetching, error, success } = this.state;
    return (
      <div className={classes.container}>
        <h2 className={classes.title}>Login</h2>
        <LoginForm handleSubmit={this.handleSubmit} error={error} fetching={fetching} success={success}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: AuthSelectors.isAuthenticated(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (data, resolve) =>
      dispatch(AuthActions.loginRequest(data, resolve)),
  };
};

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default compose(
  withStyles(styles),
  withRedux
)(LoginScreen);
