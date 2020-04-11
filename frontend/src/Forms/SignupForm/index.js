import React, { Component } from "react";
import { Link } from "react-router-dom";
import FormInput from "Components/FormInput";
import { Field, Form } from "react-final-form";
import navRoutes from "Navigation/NavRoutes";
import styles from "./styles.module.scss";
import Button from "react-bootstrap/Button";

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

class SignupForm extends Component {
  render() {
    const { handleSubmit, fetching, error } = this.props;
    return (
        <Form 
            validate={validate}
            onSubmit={handleSubmit}
            render={({ handleSubmit}) => (
              <form className={styles.formContainer} onSubmit={handleSubmit}>
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
                <Field
                  name="confirm_password"
                  type={"password"}
                  label={"Confirm Password"}
                  placeholder={"Confirm Password"}
                  render={props => <FormInput {...props} type={"password"}/>}
                />
                {error && (
                  error.map(e => (
                  <div>
                    <p className={styles.error}>{e}</p>
                  </div>
                  ))
                )}
                <div className={styles.buttonContainer}>
                  <Button type={"submit"} className={styles.button}>
                    {
                      fetching ? "Loading..." : "Sign Up"
                    }
                  </Button>
                </div>
                <Link to={navRoutes.login} className={styles.linkContainer}>
                  Already have an account?
                </Link>
              </form>
            )}
        />
    );
  }
}

export default SignupForm;
