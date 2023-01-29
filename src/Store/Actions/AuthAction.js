// import { LOGIN_USER, LOGIN_SUCCESS, LOGIN_FAILED, SIGNIN_START } from "../types";
import axios from "axios";
import { getCurrentUser } from "./getCurrentUser"

import { signInStart } from "../Reducers/UserReducer";
import { signInSuccess } from "../Reducers/UserReducer";
import { signInFailed } from "../Reducers/UserReducer";
import { $api } from "../../http";
import { useSelector } from "react-redux";



export const loginAction = ({ email, password }) => {

  return (dispatch) => {
    dispatch(signInStart());
    axios
      .post(`${process.env.REACT_APP_URL_TEST}/user/login`, {
        email,
        password,
      })
      .then((res) => {
        dispatch(signInSuccess(res.data?.result?.jwt))
        localStorage.setItem('token', res.data?.result?.jwt)
        dispatch(getCurrentUser(res.data?.result.jwt))
      })
      .catch((err) => {
        dispatch(signInFailed(err.message));
      });
  };
};

export const checkAuth = () => {
  return (dispatch) => {
    dispatch(signInStart());
    $api.post('/user/current')
      .then((res) => {
        dispatch(signInSuccess(res.data?.result?.jwt))
        localStorage.setItem('token', res.data?.result?.jwt)
        // dispatch(getCurrentUser(res.data?.result.jwt))
      })
      .catch((err) => {
        dispatch(signInFailed(err.message));
      });
  };
};

// const loginSuccess = (response) => {
//   return {
//     type: LOGIN_SUCCESS,
//     payload: {
//       token: response.data?.result.jwt,
//     },
//   };
// };

// const LoginStart = () => ({
//   type: LOGIN_USER,
// });

// const loginFailed = (error) => ({
//   type: LOGIN_FAILED,
//   payload: {
//     error,
//   },
// });

