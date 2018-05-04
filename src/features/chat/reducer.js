import axios from "axios";

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

const initialState = {
  userGroup: [{ groupName: "" }],
  queryGroup: true,
  allGroup: [],
  rowSelected: [],
  memberInGroup: [],
  currentGroup: "",
  unreadMsg: [],
  newGroupName: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
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
      if (action.payload.result == "success")
        return {
          ...state,
          unreadMsg: action.payload.unreadmsg
        };
      else {
        return {
          ...state,
          unreadMsg: []
        };
      }
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

export const getAllGroup = username => ({
  type: GET_ALL_GROUP,
  payload: axios
    .post("http://localhost:8000/getUserMember", {
      userId: username
    })
    .then(function(response) {
      console.log(response.data);
      return response.data;
    })
});

export const onUpdate = (username, allgroup, rowselect) => ({
  type: ON_UPDATE,
  payload: axios
    .post("http://localhost:8000/update", {
      userId: username,
      allgroup: allgroup,
      index: rowselect
    })
    .then(function(response) {
      console.log(response.data);
      return response.data;
    })
});

export const getUserGroup = username => ({
  type: GET_USER_GROUP,
  payload: axios
    .post("http://localhost:8000/getUserGroup", {
      username: username
    })
    .then(function(response) {
      console.log(response.data);
      return response.data;
    })
});

export const createGroup = (username, group) => ({
  type: CREATE_GROUP,
  payload: axios
    .post("http://localhost:8000/createGroup", {
      groupName: group,
      userId: username
    })
    .then(function(response) {
      console.log(response.data);
      return response.data;
    })
});

export const getGroupMember = groupName => ({
  type: GET_GROUP_MEMBER,
  payload: axios
    .post("http://localhost:8000/getGroupMember", {
      groupName: groupName
    })
    .then(function(response) {
      console.log(response.data);
      return response.data;
    })
});

export const getUnread = (user, group) => ({
  type: GET_UNREAD,
  payload: axios
    .post("http://localhost:8000/getUnRead", {
      userId: user,
      groupName: group
    })
    .then(function(response) {
      console.log(response.data);
      return response.data;
    })
});

export const setField = (key, value) => ({
  type: SET_FIELD,
  key: key,
  value: value
});
