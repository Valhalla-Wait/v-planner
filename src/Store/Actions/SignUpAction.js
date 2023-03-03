import { SIGNIN_SUCCESS, SIGNIN_START, SIGNIN_FAILED } from "../types";
import axios from "axios";

export const signUpAction = ({
  firstName,
  lastName,
  email,

  nickname,
  partnersFirstName,
  partnersLastName,
  engagementDate,
  weddingDate,
  location,
  countGuest,
  customBudget,
  password,
  avatar,
}, auth) => {

  return (dispatch) => {
    dispatch(LoginStart());
    const reqBody = new FormData();


    const obj = {
      firstName: firstName,
      surname: lastName,
      password: password,
      weddingDate: weddingDate,
      email: email,
      engagementDate: engagementDate,
      engagementAddress: location.value,
      weddingAddress:location.value,
      isEngagement: 1,
      amountOfGuests: countGuest,
      phoneNumber: "123123",
      partnerFirstName:partnersFirstName,
      partnerLastName:partnersLastName,
      budget:customBudget,
      city: location.value,
      username: nickname,
      description: partnersFirstName,

    };
    const json = JSON.stringify(obj);
    const blob = new Blob([json], {
      type: "application/json",
    });
    reqBody.append("createClientModel", blob);

    reqBody.append("avatar", avatar[0]);

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/clients/create`,
      data: reqBody,
      headers: { "Content-Type": "multipart/form-data" },
    }).then((res) => {

        console.log(res, "res in create client");
        localStorage.setItem('token', res.data?.result?.jwt)
        dispatch(loginAction({
          email: obj.email,
          password: obj.password
        }))
        if(auth) auth(obj.email, obj.password)
        dispatch(signInSuccess(res));
      })
      .catch((err) => {
        console.log("error  here", err.message);
        dispatch(addTodoFailure(err.message));
      });
  };
};
const signInSuccess = (response) => {
  return {
    type: SIGNIN_SUCCESS,
    payload: {
      data: response.data?.result,
      token: response.data?.result.jwt,
    },
  };
};

const LoginStart = () => ({
  type: SIGNIN_START,
});

const addTodoFailure = (error) => ({
  type: SIGNIN_FAILED,
  payload: {
    error,
  },
});
