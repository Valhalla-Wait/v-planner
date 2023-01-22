import { LOGIN_USER, LOGIN_SUCCESS, LOGIN_FAILED } from "../types";
import axios from "axios";
import {getCurrentUser} from "./getCurrentUser"

export const loginAction = ({ email, password }) => {
  console.log(email,password)
  return (dispatch) => {
    dispatch(LoginStart);
    axios
      .post(`${process.env.REACT_APP_API_URL}/user/login`, {
        email,
        password,
      })
      .then((res) => {
        console.log(res,"response in res")
        dispatch(getCurrentUser(res.data?.result.jwt))
        dispatch(loginSuccess(res))
      })
      .catch((err) => {
        dispatch(loginFailed(err.message));
      });
  };
};
const loginSuccess = (response) => {

  return {
    type: LOGIN_SUCCESS,
    payload: {
      token: response.data?.result.jwt,
    },
  };
};

const LoginStart = () => ({
  type: LOGIN_USER,
});

const loginFailed = (error) => ({
  type: LOGIN_FAILED,
  payload: {
    error,
  },
});
