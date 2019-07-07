import React from "react";
import styles from "./styles/FormInputStyle";
import { withStyles } from "@material-ui/core";

const FormInput = props => {
  const {
    classes,
    type,
    placeholder,
    input: { value, onChange },
    meta: { error, touched }
  } = props;
  return (
    <div className={classes.container}>
      <input
        className={classes.formInput}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        style={error && touched ? {border: "solid 2px red"} : null}
      />
      {error && touched && <div className={classes.error}>{error}</div>}
    </div>
  );
};

export default withStyles(styles)(FormInput);
