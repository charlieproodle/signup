import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthSelectors } from "../Redux/AuthRedux";
import { withStyles } from "@material-ui/core";
import styles from "./styles/HomeScreenStyle";
import { compose } from "redux";

class HomeScreen extends Component {
  render() {
    const { classes, user } = this.props;
    console.log(user);
    return (
      <div className={classes.container}>
        <h2>Hi {"Charlie"}, this is the HomeScreen</h2>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: AuthSelectors.getUser(state),
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
