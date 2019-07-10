import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthSelectors } from "../Redux/AuthRedux";
import { withStyles } from "@material-ui/core";
import styles from "./styles/HomeScreenStyle";
import { compose } from "redux";

class HomeScreen extends Component {
  state = {
    username: ""
  };
  componentDidUpdate() {
    if (this.props.user) {
      this.setState({
        username: this.props.user.username
      });
    }
  }
  render() {
    const { classes } = this.props;
    const { username } = this.state;
    return (
      <div className={classes.container}>
        <h2>Hi {username}, this is the HomeScreen</h2>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: AuthSelectors.getUser(state)
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
