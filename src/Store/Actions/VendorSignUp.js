import { VENDOR_SIGNIN, VENDOR_SUCCESS, VENDOR_FAILED } from "../types";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { loginAction } from "./AuthAction";
import { vendorSignIn } from "../Reducers/VendorReducer";

export const signUpAction = (data, auth) => {
  // console.log("data in signUpAction", data);
  return (dispatch) => {
    dispatch(vendorSignIn());
    const reqBody = new FormData();
    const obj = {
      aboutCompany: data.aboutCompany,
      aboutTeam: data.aboutTeam,
      city: data.state.value,
      companyDescription: data.description,
      companyName: data.name,
      companyTitle: data.title,
      email: data.email,
      facebook: data.facebook,
      fieldOfActivity: 'Activity',
      firstName: data.firstName,
      generalServiceIds: [data.type.value[0].id],
      individualServiceModels: [],
      instagram: data.instagram,
      password: data.password,
      phoneNumber: data.phone,
      photoStyle: 'PhotoCool',
      priceFrom: data.priceRange.value.priceFrom,
      priceTo: data.priceRange.value.priceTo,
      surname: data.lastName,
      tiktok: data.tiktok,
      twitter: data.twitter,
      username: data.name,
      // typeOfService: data.type.value,
      weddingActivity: data.activities.value,
      yearsOnMarket: 12,
      youtube: data.youtube
    }

    console.log('obj', obj)

    const json = JSON.stringify(obj)
    const blob = new Blob([json], {
      type: 'application/json'
    });

    reqBody.append("avatar", data.avatar[0]);
    reqBody.append("companyAvatar", data.file[0]);
    reqBody.append("createVendorModel", blob);
    for (const image of data.images) {
      reqBody.append("photoAndVideos", image);
    }

    for (var pair of reqBody.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

    for (const value of reqBody.values()) {
      console.log('value', value)
    }


    axios({
      method: "post",
      url: `${process.env.REACT_APP_URL_TEST}/vendors/create`,
      data: reqBody,
      headers: { "Content-Type": "multipart/form-data" },
    }).then((res) => {
      console.log("response in vendro", res)
      dispatch(loginAction({
        email: obj.email,
        password: obj.password
      }))
      if(auth) auth(obj.email, obj.password)
      signInSuccess(res)
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

const addTodoFailure = (error) => ({
  type: VENDOR_FAILED,
  payload: {
    error,
  },
});
