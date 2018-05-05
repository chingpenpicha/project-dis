import axios from "axios";
import React from "react";
import { Avatar } from "antd";
import io from "socket.io-client";

const GET_USER_GROUP = "GET_USER_GROUP";
const GET_USER_GROUP_FULFILLED = "GET_USER_GROUP_FULFILLED";
const RESET_STATE = "RESET_STATE";
const SET_FIELD = "SET_FIELD";

const CREATE_GROUP = "CREATE_GROUP";
const CREATE_GROUP_FULFILLED = "CREATE_GROUP_FULFILLED";

const ON_UPDATE = "ON_UPDATE";
const ON_UPDATE_FULFILLED = "ON_UPDATE_FULFILLED";

const GET_GROUP_MEMBER = "GET_GROUP_MEMBER";
const GET_GROUP_MEMBER_FULFILLED = "GET_GROUP_MEMBER_FULFILLED";
const GET_ALL_GROUP = "GET_ALL_GROUP";
const GET_ALL_GROUP_FULFILLED = "GET_ALL_GROUP_FULFILLED";

const GET_UNREAD = "GET_UNREAD";
const GET_UNREAD_FULFILLED = "GET_UNREAD_FULFILLED";

const SWAP = "SWAP";


const initialState = {
  menuChange: false,
  userGroup: [{ groupName: "" }],
  queryGroup: true,
  allGroup: [],
  rowSelected: [],
  memberInGroup: [],
  currentGroup: "",
  unreadMsg: [],
  newGroupName: "",
  socket : io("10.207.179.194:8000"),
  useIp : "10.207.179.194:8000",
  ip1 : "10.207.179.194:8000",
  ip2 : "10.207.179.194:8001"
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SWAP :
      //console.log("INSWAPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP")
      if(state.useIp === state.ip1)
        return {
          ...state,
          useIp : "10.207.179.194:8001",
          socket : io("10.207.179.194:8001")
        }
      else{
        return{
          ...state,
          useIp : "10.207.179.194:8000",
          socket : io("10.207.179.194:8000")
        }
      }
    case RESET_STATE:
      return {
        ...initialState
      };
    case SET_FIELD:
      return {
        ...state,
        [action.key]: action.value
      };
    case GET_ALL_GROUP_FULFILLED:
      return {
        ...state,
        allGroup: action.payload.groupna,
        rowSelected: action.payload.groupin
      };
    case GET_GROUP_MEMBER_FULFILLED:
      return {
        ...state,
        memberInGroup: action.payload.groupMember
      };

    case ON_UPDATE_FULFILLED:
      return {
        ...state,
        queryGroup: true,
        memberInGroup: action.payload.groupMember
      };

    case GET_UNREAD_FULFILLED:
        return {
          ...state,
          unreadMsg: action.payload
        };
    case GET_USER_GROUP_FULFILLED:
      if (action.payload.valid)
        return {
          ...state,
          queryGroup: false,
          userGroup: action.payload.groupList
        };
      else {
        return {
          ...state
        };
      }
    default:
      return state;
  }
};

export const resetState = () => ({
  type: RESET_STATE
});

export const getAllGroup = (username,ip) => ({
  type: GET_ALL_GROUP,
  payload: axios
    .post("http://"+ip+"/getUserMember", {
      userId: username
    })
    .then(function(response) {
      //console.log("resetState : " + response.data);
      return response.data;
    })
});

export const onUpdate = (username, allgroup, rowselect, ip) => ({
  type: ON_UPDATE,
  payload: axios
    .post("http://"+ip+"/update", {
      userId: username,
      allgroup: allgroup,
      index: rowselect
    })
    .then(function(response) {
      //console.log("onUpdate : " + response.data);
      return response.data;
    })
});

export const getUserGroup = (username,ip) => ({
  type: GET_USER_GROUP,
  payload: axios
    .post("http://"+ip+"/getUserGroup", {
      username: username
    })
    .then(function(response) {
      //console.log("getUserGroup : " + response.data);
      return response.data;
    })
});

export const createGroup = (username, group, ip) => ({
  type: CREATE_GROUP,
  payload: axios
    .post("http://"+ip+"/createGroup", {
      groupName: group,
      userId: username
    })
    .then(function(response) {
      //console.log("createGroup : " + response.data);
      return response.data;
    })
});

export const getGroupMember = (groupName,ip) => ({
  type: GET_GROUP_MEMBER,
  payload: axios
    .post("http://"+ip+"/getGroupMember", {
      groupName: groupName
    })
    .then(function(response) {
      //console.log("getGroupMember : " + response.data);
      return response.data;
    })
});

export const getUnread = (user, group,ip) => ({
  type: GET_UNREAD,
  payload: axios
    .post("http://"+ip+"/getUnRead", {
      userId: user,
      groupName: group
    })
    .then(function(response) {
      //console.log("getUnread : " + response.data);
      return response.data;
    })
    .then(function(response) {
      //console.log("getUnread2 : " + response);
      //console.log(response);
      if (response.result == "success") {
        const a = response.unreadmsg.map(e => {
          let b = {
            title: e.userId,
            avatar: (
              <Avatar
                style={{
                  backgroundColor: e.color,
                  verticalAlign: "middle"
                }}
                size="large"
              >
                {e.userId.substring(0, 1)}
              </Avatar>
            ),
            description: e.timestamp,
            content: e.text
          };
          return b;
        });
        return a;
      } else {
        return [];
      }
    })
});

export const setField = (key, value) => ({
  type: SET_FIELD,
  key: key,
  value: value
});

export const swap = () => ({
  type : SWAP
})