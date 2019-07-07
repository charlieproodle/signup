import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import styles from "./styles/LoginFormStyle";
import FormInput from "../Components/FormInput";

const validate = values => {
  const errors = {};
  if (!values.username) {
    errors.username = "Required";
  }
  if (!values.password) {
    errors.password = "Required";
  }
  return errors;
};

class LoginForm extends Component {
  render() {
    const { handleSubmit, classes } = this.props;
    return (
      <form
        className={classes.formContainer}
        onSubmit={handleSubmit}
        testval="Test"
      >
        <Field
          name="username"
          component={FormInput}
          type={"text"}
          label={"Username"}
          placeholder={"Username"}
        />
        <Field
          name="password"
          component={FormInput}
          type={"password"}
          label={"Password"}
          placeholder={"Password"}
        />
        <div className={classes.buttonContainer}>
          <button className={classes.button}>Log In</button>
        </div>
        <Link className={classes.linkContainer} to="/Register">
          Don't have an account?
        </Link>
      </form>
    );
  }
}

LoginForm = reduxForm({
  form: "login",
  validate
})(LoginForm);

export default withStyles(styles)(LoginForm);
