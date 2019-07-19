import React, { Component } from "react";
import AuthActions, { AuthSelectors } from "../Redux/AuthRedux";
import { connect } from "react-redux";
import { compose } from "redux";
import LoginForm from "../Forms/LoginForm";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/LoginScreenStyle";

class LoginScreen extends Component {
  state = {
    submitError: null,
  };

  _submitFailed = error => {
    this.setState({
      submitError: error.detail,
    });
  };

  handleSubmit = val => {
    const { login, history } = this.props;
    let onError = error => this._submitFailed(error);
    login(val, history, onError);
  };

  render() {
    const { classes } = this.props;
    const { submitError } = this.state;
    return (
      <div className={classes.container}>
        <h2 className={classes.title}>Login</h2>
        <LoginForm onSubmit={this.handleSubmit} submitError={submitError} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: AuthSelectors.isLoggedIn(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (data, history, onError) =>
      dispatch(AuthActions.loginRequest(data, history, onError)),
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
