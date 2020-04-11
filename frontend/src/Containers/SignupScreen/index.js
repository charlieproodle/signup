import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import styles from "./styles/RegisterScreenStyle";
import { withStyles } from "@material-ui/core";
import RegisterForm from "../Forms/RegisterForm";
import AuthActions, { AuthSelectors } from "../Redux/AuthRedux";

class RegisterScreen extends Component {
  state = {
    submitError: null,
  };

  componentDidUpdate() {
    if (this.props.isAuthenticated) {
      this.props.history.push("/HomeScreen");
    }
  }

  _submitFailed = error => {
    console.log("Submit failed", error);
    this.setState({
      submitError: error.detail,
    });
  };

  handleSubmit = values => {
    const { signup, history } = this.props;
    let onError = error => this._submitFailed(error);
    signup(values, history, onError);
  };

  render() {
    const { classes } = this.props;
    const { submitError } = this.state;
    return (
      <div className={classes.container}>
        <h1 className={classes.title}>Register</h1>
        <RegisterForm onSubmit={this.handleSubmit} submitError={submitError} />
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
    signup: (data, history, onError) =>
      dispatch(AuthActions.signupRequest(data, history, onError)),
  };
};

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withStyles(styles),
  withRedux
)(RegisterScreen);
