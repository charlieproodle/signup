import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import styles from "./styles/RegisterScreenStyle";
import { withStyles } from "@material-ui/core";
import RegisterForm from "../Forms/RegisterForm";
import AuthActions, { AuthSelectors } from "../Redux/AuthRedux";

class RegisterScreen extends Component {
  componentDidUpdate() {
    if (this.props.isLoggedIn) {
      this.props.history.push("/HomeScreen");
    }
  }
  handleSubmit = values => {
    const { signup } = this.props;
    signup(values);
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <h1 className={classes.title}>Register</h1>
        <RegisterForm onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: AuthSelectors.isLoggedIn(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signup: data => dispatch(AuthActions.signupRequest(data))
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
