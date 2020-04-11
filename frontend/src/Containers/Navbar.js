import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withStyles } from "@material-ui/core";
import styles from "./styles/NavbarStyle";
import AuthActions, { AuthSelectors } from "../Redux/AuthRedux";

class Navbar extends Component {
  _logout = () => {
    const { logout, history } = this.props;
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    logout();
    history.push("/")
  };
  render() {
    const { classes, isAuthenticated } = this.props;
    return (
      <div className={classes.container}>
        <h1 className={classes.title}>SIMPLE LOGIN</h1>
        {isAuthenticated ? (
          <button onClick={this._logout} className={classes.logout}>
            Logout
          </button>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: AuthSelectors.isAuthenticated(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(AuthActions.logout())
  };
};

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withStyles(styles),
  withRedux
)(Navbar);
