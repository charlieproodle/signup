import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthSelectors } from "../Redux/AuthRedux";
import "antd/dist/antd.css";
import { Spin } from "antd";

class LoadingScreen extends Component {
  componentDidUpdate(prevProps) {
    // console.log(this.props);
    // const {
    //   token,
    //   location,
    //   history,
    // } = this.props;
    // if (prevProps.token !== token && token === location.state.token) {
    //   history.push("/HomeScreen");
    // }
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center"
        }}
      >
        <Spin />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: AuthSelectors.getAccessToken(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoadingScreen);
