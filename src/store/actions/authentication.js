import * as actionType from "./actionTypes";
import axios from "axios";
import jwt_decode from "jwt-decode";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com"
});

export const login = (userData, history) => {
  return async dispatch => {
    try {
      let res = await instance.post("/login/", userData);
      let token = res.data.token;
      dispatch(setAuthToken(token));
      history.replace("/");
    } catch (error) {
      console.error(error);
    }
  };
};

export const signup = (userData, history) => {
  return async dispatch => {
    try {
      let res = await instance.post("/signup/", userData);
      let token = res.data.token;
      dispatch(setAuthToken(token));
      history.replace("/");
    } catch (error) {
      console.error(error);
    }
  };
};

export const logout = () => setAuthToken();

const setCurrentUser = userData => {
  return {
    type: actionType.SET_CURRENT_USER,
    payload: userData
  };
};

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common.Authorization = `JWT ${token}`;
    const decodedUser = jwt_decode(token);
    localStorage.setItem("myToken", token);
    return setCurrentUser(decodedUser);
  } else {
    delete axios.defaults.headers.common.Authorization;
    localStorage.removeItem("myToken");
    return setCurrentUser();
  }
};

export const checkForExpiredToken = () => {
  const token = localStorage.getItem("myToken");
  if (token) {
    const currentTime = Date.now() / 1000;
    const user = jwt_decode(token);
    if (user.exp >= currentTime) {
      return setAuthToken(token);
    }
  }
  return logout();
};
