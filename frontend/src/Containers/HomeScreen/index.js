import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthSelectors } from "Redux/AuthRedux";
import styles from "./styles.module.scss";

class HomeScreen extends Component {
  render() {
    const { username } = this.props;
    return (
      <div className={styles.container}>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

