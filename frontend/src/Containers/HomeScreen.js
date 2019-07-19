import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthSelectors } from "../Redux/AuthRedux";
import { withStyles } from "@material-ui/core";
import styles from "./styles/HomeScreenStyle";
import { compose } from "redux";

class HomeScreen extends Component {
  render() {
    const { classes, username } = this.props;
    return (
      <div className={classes.container}>
        <h2>Hi {username}, this is the HomeScreen</h2>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: AuthSelectors.getUsername(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withStyles(styles),
  withRedux
)(HomeScreen);
