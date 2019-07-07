import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withStyles } from "@material-ui/core";
import styles from "./styles/NavbarStyle";

class Navbar extends Component {
  logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    this.props.history.push("/HomeScreen");
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <h1 className={classes.title}>SIMPLE LOGIN</h1>
        <button onClick={this.logout} className={classes.logout}>
          Logout
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
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
)(Navbar);
