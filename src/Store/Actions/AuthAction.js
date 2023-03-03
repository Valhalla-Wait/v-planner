// import { LOGIN_USER, LOGIN_SUCCESS, LOGIN_FAILED, SIGNIN_START } from "../types";
import axios from "axios";
import { getCurrentUser } from "./getCurrentUser"

import { signInStart } from "../Reducers/UserReducer";
import { signInSuccess } from "../Reducers/UserReducer";
import { signInFailed } from "../Reducers/UserReducer";
import { $api } from "../../http";
import { useSelector } from "react-redux";



export const loginAction = (data) => {

  return (dispatch) => {
    dispatch(signInStart());
    // debugger
    // const reqBody = new FormData();
    const json = JSON.stringify(data);
    const blob = new Blob([json], {
      type: "application/json",
    });
    // reqBody.append("email", data.email);

    // reqBody.append("password", data.password);
    axios({
      method: "post",
      data,
      url: `http://142.93.15.46:8080/user/login`,
    }).then((res) => {
      localStorage.setItem('token', res.data?.result?.jwt)
      dispatch(getCurrentUser(res.data?.result.jwt))
      dispatch(signInSuccess(res.data?.result?.jwt))
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

