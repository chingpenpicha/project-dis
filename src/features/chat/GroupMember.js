import React from "react";
import { Layout, Menu, Icon, Input, Button } from "antd";
import { List, Avatar } from "antd";
import { connect } from "react-redux";
import {} from "./reducer";

const enhance = connect(
  state => ({
    memberInGroup: state.chat.memberInGroup
  }),
  {}
);

const { Sider } = Layout;

const GroupMember = props => (
  <Sider
    style={{
      theme: "light",
      background: "#f2f3f5",
      minWidth: 200,
      marginTop: 115,
      overflow: "auto",
      height: "100vh",
      position: "fixed",
      borderColor: "#D3D3D3",
      right: 0
    }}
  >
    <div
      style={{
        textAlign: "left",
        background: "#e9ebee",
        color: "gray",
        height: "50px",
        margin: "auto"
      }}
    >
      <h3
        style={{
          padding: "15px 0px 0px 15px"
        }}
      >
        <Icon
          style={{
            marginRight: 10
          }}
          type="team"
        />Group Members
      </h3>
    </div>

    <List
      itemLayout="horizontal"
      dataSource={props.memberInGroup}
      style={{ marginLeft: 20 }}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar
                style={{
                  backgroundColor: item.color,
                  verticalAlign: "middle"
                }}
                size="small"
              >
                {item.userId.substring(0, 1)}
              </Avatar>
            }
            title={item.userId}
          />
        </List.Item>
      )}
    />
  </Sider>
);

export default enhance(GroupMember);
