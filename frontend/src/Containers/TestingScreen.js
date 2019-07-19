// This screen is for testing out new React concepts

import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import styles from "./styles/HomeScreenStyle";
import { withStyles } from "@material-ui/core";
import AuthActions, { AuthSelectors } from "../Redux/AuthRedux";

class TestingScreen extends Component {
  _handleSubmit = e => {
    e.preventDefault();
    const name = e.target.name.value;
    this.props.changeName(name)
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <form onSubmit={this._handleSubmit}>
          <input name={"name"} placeholder={"Insert name"} />
          <button type="submit">Click to change name</button>
        </form>
        <p>The name is {this.props.name}</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      name: AuthSelectors.getName(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
      changeName: data => dispatch(AuthActions.changeName(data))
  };
};

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withStyles(styles),
  withRedux
)(TestingScreen);
