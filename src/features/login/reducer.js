import axios from "axios";

const SET_FIELD = "SET_FIELD";
const LOGIN = "LOGIN";
const LOGIN_FULFILLED = "LOGIN_FULFILLED";
const REGIST = "REGIST";
const REGIST_FULFILLED = "REGIST_FULFILLED";
const CLEAR_FIELD = "CLEAR_FIELD";

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
};

export default (state = initialState, action) => {
  //console.log(action);
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

export const regist = (username, password,ip) => ({
  type: REGIST,
  payload: axios
    .post("http://"+ip+"/regist", {
      username: username,
      password: password
    })
    .then(function(response) {
      return response.data.valid;
    })
});


export const login = (username, password,ip) => ({
  type: LOGIN,
  payload: axios
    .post("http://"+ip+"/login", {
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

