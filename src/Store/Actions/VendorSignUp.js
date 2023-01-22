import { VENDOR_SIGNIN, VENDOR_SUCCESS, VENDOR_FAILED } from "../types";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export const signUpAction = (data) => {
  // console.log("data in signUpAction", data);
  return (dispatch) => {

    dispatch(LoginStart);
    const reqBody = new FormData();
    const obj = {
      firstName:  data.firstName,
      surname:  data.lastName,
      phoneNumber: data.phone,
      username: data.name,
      email: data.email,
      password: data.password,
      city: data.state.value,
      companyName: data.name,
      fieldOfActivity: data.type.value,
      typeOfService:  data.type.value,
      priceFrom: data.priceRange.value.priceFrom,
      priceTo: data.priceRange.value.priceTo,
      weddingActivity: data.activities.value,
      companyTitle: data.title,
      companyDescription: data.description,
      aboutCompany: data.aboutCompany,
      aboutTeam: data.aboutTeam,
      photoStyle: data.type.value,
      serviceModels:[
        {
          name: data.serviceModels[0].name,
          price:data.serviceModels[0].price,
        }
      ]
     }

    const json = JSON.stringify(obj)
    const blob = new Blob([json], {
      type: 'application/json'
    });

    reqBody.append("createVendorModel",blob);
    reqBody.append("avatar", data.avatar[0]);
    reqBody.append("companyAvatar", data.file[0]);
    for (const image of data.images) {
      reqBody.append("photoAndVideos",image);
    }

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/vendors/create`,
      data: reqBody,
      headers: { "Content-Type": "multipart/form-data" },
    }).then((res) => {
        console.log("response in vendro",res)
        dispatch(signInSuccess(res));
      })
      .catch((err) => {
        dispatch(addTodoFailure(err.message));
      });
  };
};
const signInSuccess = (response) => {
  return {
    type: VENDOR_SUCCESS,
    payload: {
      data: response.data?.result,
      token: response.data?.result.jwt,
    },
  };
};

const LoginStart = () => ({
  type: VENDOR_SIGNIN,
});

const addTodoFailure = (error) => ({
  type: VENDOR_FAILED,
  payload: {
    error,
  },
});
