import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import FormInput from "../Components/FormInput";
import { withStyles } from "@material-ui/core";
import styles from "./styles/RegisterFormStyle";

const validate = values => {
  const errors = {};
  if (!values.username) {
    errors.username = "Required";
  }
  if (!values.password) {
    errors.password = "Required";
  }
  if (values.confirm_password !== values.password) {
    errors.confirm_password = "Passwords must match";
  }
  return errors;
};

class RegisterForm extends Component {
  render() {
    const { handleSubmit, classes } = this.props;
    return (
      <form className={classes.formContainer} onSubmit={handleSubmit}>
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
        <Field
          name="confirm_password"
          component={FormInput}
          type={"password"}
          label={"Confirm Password"}
          placeholder={"Confirm Password"}
        />
        <div className={classes.buttonContainer}>
          <button className={classes.button}>Sign Up</button>
        </div>
        <Link to="/" className={classes.linkContainer}>
          Already have an account?
        </Link>
      </form>
    );
  }
}

RegisterForm = reduxForm({
  form: "register",
  validate
})(RegisterForm);

export default withStyles(styles)(RegisterForm);
