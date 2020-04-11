import navRoutes from "Navigation/NavRoutes";
import React, { Component } from "react";
import { Button, Navbar as BSNavbar } from "react-bootstrap";
import { connect } from "react-redux";
import AuthActions, { AuthSelectors } from "Redux/AuthRedux";
import styles from "./styles.module.scss";

class Navbar extends Component {
  _logout = () => {
    const { logout, history } = this.props;
    logout();
    history.push(navRoutes.root);
  };
  render() {
    const { isAuthenticated, history } = this.props;
    return (
      <BSNavbar expand="lg" variant="light" bg="light">
        <BSNavbar.Brand href="#">Welcome to your Project</BSNavbar.Brand>
        <div className={styles.buttonContainer}>
          {isAuthenticated ? (
                <Button onClick={this._logout}>
                  Logout
                </Button>
              ) : <>
                  <Button style={{ marginRight: 10 }} onClick={() => history.push(navRoutes.login)}>Login</Button>
                  <Button onClick={() => history.push(navRoutes.signup)}>Signup</Button>
              </>}
              </div>
      </BSNavbar>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);

