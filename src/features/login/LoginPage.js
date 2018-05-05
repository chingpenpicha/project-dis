import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setField, login, regist, clearField, onConnection } from "./reducer";
import { Layout, Menu, Icon, Button } from "antd";
import { bindActionCreators } from "redux";
import { WrappedNormalLoginForm } from "./NormalLoginForm";
import { WrappedNormalRegisterForm } from "./RegisterForm";

import Background from "./stars.jpg";
import logochat from "./logochat.png";

const { Header, Sider } = Layout;

const mapStateToProps = state => {
  return {
    loginPage: state.login.loginPage,
    username: state.login.username,
    usernameReg: state.login.usernameReg,
    passwordReg: state.login.passwordReg,
    password: state.login.password,
    loginSuccess: state.login.loginSuccess,
    registSuccess: state.login.registSuccess,
    loginPort: state.login.loginPort
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    setField: bindActionCreators(setField, dispatch),
    login: bindActionCreators(login, dispatch),
    regist: bindActionCreators(regist, dispatch),
    clearField: bindActionCreators(clearField, dispatch),
    onConnection: bindActionCreators(onConnection, dispatch)
  };
};

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.props.socket.on("connect_error", function(err) {
      props.socket.disconnect();
      props.swap();
    });

    this.props.socket.on("disconnect", () => {});
  }

  componentDidMount() {
    this.props.onConnection();
  }

  render() {
    if (this.props.loginSuccess) {
      this.props.setField("loginSuccess", false);
      return <Redirect to={"/chat"} />;
    }
    if (this.props.loginPage) {
      return (
        <div
          style={{
            backgroundImage: `url(${Background})`,
            backgroundSize: "cover",
            overflow: "hidden",
            textAlign: "center",
            minWidth: "100%",
            minHeight: "100%"
          }}
        >
          <img
            src={logochat}
            style={{
              marginLeft: "-20px",
              marginTop: "5%"
            }}
          />
          <div
            style={{
              backgroundColor: "white",
              padding: 50,
              width: "400px",
              height: "300px",
              marginLeft: "35%"
            }}
          >
            <WrappedNormalLoginForm
              setField={(key, value) => this.props.setField(key, value)}
              login={() =>
                this.props.login(
                  this.props.username,
                  this.props.password,
                  this.props.loginPort
                )
              }
              clearField={() => this.props.clearField()}
            />
          </div>
          <div
            style={{
              height: 260,
              bottom: 0
            }}
          />
        </div>
      );
    } else {
      return (
        <div
          style={{
            backgroundImage: `url(${Background})`,
            backgroundSize: "cover",
            overflow: "hidden",
            textAlign: "center",
            minWidth: "100%",
            minHeight: "100%"
          }}
        >
          <img
            src={logochat}
            style={{
              marginLeft: "-20px",
              marginTop: "5%"
            }}
          />
          <div
            style={{
              backgroundColor: "white",
              padding: 50,
              width: "400px",
              height: "300px",
              marginLeft: "35%"
            }}
          >
            <WrappedNormalRegisterForm
              setField={(key, value) => this.props.setField(key, value)}
              regist={() =>
                this.props.regist(
                  this.props.usernameReg,
                  this.props.passwordReg,
                  this.props.loginPort
                )
              }
              registSuccess={this.props.registSuccess}
              clearField={() => this.props.clearField()}
            />
          </div>
          <div
            style={{
              height: 260,
              bottom: 0
            }}
          />
        </div>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
