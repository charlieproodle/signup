import React, { Component } from "react";
import { Link } from "react-router-dom";
import FormInput from "Components/FormInput";
import { Field, Form } from "react-final-form";
import styles from "./styles.module.scss";
import navRoutes from "Navigation/NavRoutes";

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
    const { handleSubmit, error, fetching } = this.props;
    return (
        <Form 
            validate={validate}
            onSubmit={handleSubmit}
            render={({ handleSubmit }) => (
                <form
                className={styles.formContainer}
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
                  type={"password"}
                  label={"Password"}
                  placeholder={"Password"}
                  render={props => <FormInput {...props} type={"password"}/>}
                />
                {error && <div className={styles.error}><p>{error}</p></div>}
                <div className={styles.buttonContainer}>
                  <button className={styles.button}>
                    {fetching ? "Loading..." : "Log In"}
                  </button>
                </div>
                <Link className={styles.linkContainer} to={navRoutes.signup}>
                  Don't have an account?
                </Link>
              </form>
            )}
        />
    );
  }
}

export default LoginForm;
