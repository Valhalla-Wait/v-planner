import axios from "axios";
import { getCurrentUser } from "./getCurrentUser"

import { signInStart, signInSuccess, signInFailed } from "../Reducers/UserReducer";



export const loginAction = ({ email, password }) => {
  return (dispatch) => {
    dispatch(signInStart());
    axios
      .post(`${process.env.REACT_APP_URL_TEST}/user/login`, {
        email,
        password,
      })
      .then((res) => {
        const token = res.data.result.jwt
        localStorage.setItem('token', token)
        dispatch(signInSuccess(token))
        dispatch(getCurrentUser(token))
      })
      .catch((err) => {
        dispatch(signInFailed(err.message));
      });
  };
};
