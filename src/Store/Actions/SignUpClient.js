import axios from "axios";
import { signUpSuccess, signUpFailed, signUpStart } from "../Reducers/UserReducer";

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
}) => {

  return (dispatch) => {
    dispatch(signUpStart())
    const reqBody = new FormData();


    const obj = {
      firstName: firstName,
      surname: lastName,
      password: password,
      weddingDate: weddingDate,
      email: email,
      engagementDate: engagementDate,
      engagementAddress: location.value,
      weddingAddress: location.value,
      isEngagement: 1,
      amountOfGuests: countGuest,
      phoneNumber: "123123",
      partnerFirstName: partnersFirstName,
      partnerLastName: partnersLastName,
      budget: customBudget,
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
    })
      .then((res) => {
        const token = res.data.result.jwt
        localStorage.setItem("token", token)
        dispatch(signUpSuccess(res.data.result))
      })
      .catch((err) => {
        console.log(err.message);
        dispatch(signUpFailed(err))
      });
  };
};
