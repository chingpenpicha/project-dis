import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getUserGroup,
  resetState,
  getGroupMember,
  getAllGroup,
  setField,
  createGroup,
  getUnread,
  onUpdate
} from "./reducer";
import { Layout, Menu, Icon, Button, Popover, Table, Input } from "antd";
import { bindActionCreators } from "redux";

import "./ChatPage.css";

import Background from "../login/stars.jpg";

const { Header, Sider } = Layout;

const mapStateToProps = state => {
  return {
    userInformation: state.login.userInformation,
    queryGroup: state.chat.queryGroup,
    userGroup: state.chat.userGroup,
    rowSelected: state.chat.rowSelected,
    allGroup: state.chat.allGroup,
    currentGroup: state.chat.currentGroup,
    newGroupName: state.chat.newGroupName,
    menuChange: state.chat.menuChange,
    socket : state.chat.socket
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    getUserGroup: bindActionCreators(getUserGroup, dispatch),
    resetState: bindActionCreators(resetState, dispatch),
    getGroupMember: bindActionCreators(getGroupMember, dispatch),
    getAllGroup: bindActionCreators(getAllGroup, dispatch),
    setField: bindActionCreators(setField, dispatch),
    createGroup: bindActionCreators(createGroup, dispatch),
    getUnread: bindActionCreators(getUnread, dispatch),
    onUpdate: bindActionCreators(onUpdate, dispatch)
  };
};

const columns = [
  {
    title: "Group Name",
    dataIndex: "name"
  }
];

class ChatPage extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  state = {
    visible: false,
    selectedRows: this.props.rowSelected
  };
  onSelectChange = selectedRows => {
    console.log("selectedRowKeys changed: ", selectedRows);
    this.setState({ selectedRows });
    this.props.setField("rowSelected", selectedRows);
  };

  handleVisibleChange = visible => {
    this.setState({ visible });
  };
  render() {
    if (this.props.queryGroup) {
      this.props.getUserGroup(this.props.userInformation.username);
    }
    const { selectedRows } = this.state;

    const rowSelection = {
      selectedRows: this.props.rowSelected,
      onChange: this.onSelectChange
    };

    return (
      <Layout
        style={{
          position: "fixed",
          width: "100%",
          zIndex: 1000,
          top: 0
        }}
      >
        <Header
          style={{
            backgroundImage: `url(${Background})`,
            backgroundSize: "cover",
            textAlign: "center",
            height: 65,
            left: 0,
            top: 0
          }}
        >
          <div
            style={{
              position: "fixed",
              right: 20,
              color: "white"
            }}
          >
            <h2
              style={{
                color: "white"
              }}
            >
              {this.props.userInformation.username}
              <Link to="/">
                <Button
                  onClick={() => this.props.resetState()}
                  style={{
                    marginLeft: 20,
                    height: 25
                  }}
                  ghost={true}
                  icon="poweroff"
                >
                  Log Out
                </Button>
              </Link>
            </h2>
          </div>
        </Header>

        <Layout>
          <Sider
            style={{
              theme: "light",
              background: "#e9ebee",
              width: 200,
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              left: 0
            }}
          >
            <div
              style={{
                textAlign: "left",
                background: "#D3D3D3",
                color: "gray",
                borderColor: "#D3D3D3",
                height: "50px",
                margin: "auto"
              }}
            >
              <h3
                style={{
                  padding: "15px 0px 0px 15px"
                }}
              >
                <Icon type="aliwangwang-o" /> Groups
                <Popover
                  content={
                    <div>
                      <Input
                        placeholder="Enter Group Name"
                        onChange={e =>
                          this.props.setField("newGroupName", e.target.value)
                        }
                        addonAfter={
                          <Button
                            type="primary"
                            icon="usergroup-add"
                            style={{
                              marginTop: -25,
                              marginBottom: -25,
                              marginLeft: -11,
                              marginRight: -11
                            }}
                            onClick={() => {
                              this.props.createGroup(
                                this.props.userInformation.username,
                                this.props.newGroupName
                              );
                              this.props.getAllGroup(
                                this.props.userInformation.username
                              );
                            }}
                          />
                        }
                      />
                      <Table
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={this.props.allGroup}
                      />

                      <Button
                        type="primary"
                        style={{ width: "100%" }}
                        onClick={() => {
                          this.props.onUpdate(
                            this.props.userInformation.username,
                            this.props.allGroup,
                            this.state.selectedRows
                          );
                          this.setState({ visible: false });
                        }}
                      >
                        Save
                      </Button>
                    </div>
                  }
                  placement="rightTop"
                  title="Group Management"
                  trigger="click"
                  visible={this.state.visible}
                  onVisibleChange={this.handleVisibleChange}
                >
                  <Button
                    type="inline"
                    shape="circle"
                    icon="setting"
                    size="small"
                    style={{ marginLeft: 60 }}
                    onClick={() => {
                      this.props.getAllGroup(
                        this.props.userInformation.username
                      );
                      this.props.setField("rowSelected", []);
                    }}
                  />
                </Popover>
              </h3>
            </div>

            <Menu
              theme="light"
              mode="inline"
              style={{
                height: "100%"
              }}
              onSelect={e => {
                this.props.getGroupMember(e.key);
                this.props.socket.emit("leftgroup", {
                  groupName:this.props.currentGroup
                });
                this.props.setField("currentGroup", e.key);
                this.props.getUnread(
                  this.props.userInformation.username,
                  e.key
                );
                this.props.setField("menuChange", true);
              }}
            >
              {this.props.userGroup.map(e => (
                <Menu.Item className="menu-item" key={e.groupName}>
                  <Link to={"/chat/" + e.groupName} />
                  {e.groupName}
                </Menu.Item>
              ))}
            </Menu>
          </Sider>
        </Layout>
      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
