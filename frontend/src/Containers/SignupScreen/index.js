import SignupForm from "Forms/SignupForm";
import React, { Component } from "react";
import { connect } from "react-redux";
import AuthActions, { AuthSelectors } from "Redux/AuthRedux";
import styles from "./styles.module.scss";
import navRoutes from "Navigation/NavRoutes";

class SignupScreen extends Component {
  state = {
    fetching: false,
    error: null,
    success: false,
  };

  signupFailure = error => {
    this.setState({
      fetching: false,
      success: false,
      error: error,
    });
  };

  signupSuccess = () => {
    this.setState({
      fetching: false,
      success: true,
      error: null,
    });
    this.props.history.push(navRoutes.homeScreen);
  };

  handleSubmit = values => {
    const { signup } = this.props;
    const resolve = {
      onSuccess: () => this.signupSuccess(),
      onFailure: e => this.signupFailure(e)
    }
    signup(values, resolve);
  };

  render() {
    const { fetching, error, success } = this.state;
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Signup</h1>
        <SignupForm handleSubmit={this.handleSubmit} fetching={fetching} error={error} success={success} />
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
    signup: (data, resolve) =>
      dispatch(AuthActions.signupRequest(data, resolve)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupScreen);

