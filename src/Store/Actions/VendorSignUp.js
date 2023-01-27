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
      aboutCompany: data.aboutCompany,
      aboutTeam: data.aboutTeam,
      city: data.state.value,
      companyDescription: data.description,
      companyName: data.name,
      companyTitle: data.title,
      email: data.email,
      facebook: data.facebook,
      fieldOfActivity: data.type.value,
      firstName: data.firstName,
      instagram: data.instagram,
      password: data.password,
      phoneNumber: data.phone,
      photoStyle: data.type.value,
      priceFrom: data.priceRange.value.priceFrom,
      priceTo: data.priceRange.value.priceTo,
      serviceModels: [
        //   {
        //     name: data.serviceModels[0].name,
        //     price: data.serviceModels[0].price,
        //   }
        {
          "name": "test_name",
          "price": 0
        },
      ],
      surname: data.lastName,
      tiktok: data.tiktok,
      twitter: data.twitter,
      username: data.name,
      // typeOfService: data.type.value,
      weddingActivity: data.activities.value,
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
