import axios from "axios";

const SET_FIELD = "SET_FIELD";
const LOGIN = "LOGIN";
const LOGIN_FULFILLED = "LOGIN_FULFILLED";
const REGIST = "REGIST";
const REGIST_FULFILLED = "REGIST_FULFILLED";
const CLEAR_FIELD = "CLEAR_FIELD";
const CONNECT = "CONNECT";
const CONNECT_FULFILLED = "CONNECT_FULFILLED";

const initialState = {
  loginPage: true,
  username: "",
  password: "",
  usernameReg: "",
  passwordReg: "",
  registSuccess: "0",
  loginSuccess: false,
  userInformation: {
    username: "",
    color: ""
  },
  loginPort: "8000"
};

export default (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case CLEAR_FIELD:
      return {
        ...initialState
      };
    case SET_FIELD:
      return {
        ...state,
        [action.key]: action.value
      };
    case LOGIN_FULFILLED:
      if (action.payload.valid)
        return {
          ...state,
          loginSuccess: true,
          userInformation: action.payload.userInformation,
          username: "",
          password: ""
        };
      else
        return {
          ...state,
          loginSuccess: false
        };

    case CONNECT_FULFILLED:
      return {
        ...state,
        loginPort: action.payload.destination
      };

    case REGIST_FULFILLED:
      return {
        ...state,
        registSuccess: action.payload,
        usernameReg: "",
        passwordReg: ""
      };
    default:
      return state;
  }
};

export const setField = (key, value) => ({
  type: SET_FIELD,
  key,
  value
});

export const regist = (username, password, loginPort) => ({
  type: REGIST,
  payload: axios
    .post(`http://10.207.176.187:${loginPort}/regist`, {
      username: username,
      password: password
    })
    .then(function(response) {
      return response.data.valid;
    })
});

export const onConnection = () => ({
  type: CONNECT,
  payload: axios
    .get("http://10.207.176.187:4999/selServ")
    .then(function(response) {
      return response.data;
    })
});

export const login = (username, password, loginPort) => ({
  type: LOGIN,
  payload: axios
    .post(`http://10.207.176.187:${loginPort}/login`, {
      username: username,
      password: password
    })
    .then(function(response) {
      if (response.data.valid) {
        return {
          valid: true,
          userInformation: response.data.userInformation
        };
      }
      return {
        valid: false
      };
    })
});

export const clearField = () => ({
  type: CLEAR_FIELD
});
