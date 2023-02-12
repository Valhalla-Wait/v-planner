import axios from "axios";
import { signUpFailed, signUpStart, signUpSuccess } from "../Reducers/UserReducer";

export const signUpAction = (data) => {
  return (dispatch) => {
    dispatch(signUpStart())
    const reqBody = new FormData();
    let obj = {
      aboutCompany: data.aboutCompany,
      aboutTeam: data.aboutTeam,
      city: data.state.value,
      country: data.country,
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
      priceFrom: data.priceRange.value.priceFrom,
      priceTo: data.priceRange.value.priceTo,
      serviceModels: data.serviceModels,
      surname: data.lastName,
      tiktok: data.tiktok,
      twitter: data.twitter,
      username: data.name,
      weddingActivity: data.activities.value,
      yearsOnMarket: data.amount,
      youtube: data.youtube,
      photoStyle: data.types_3.map(el => el.value).join(", "),
      serviceType: data.types_1.map(el => el.value).join(", ")
    }

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

    axios({
      method: "post",
      url: `${process.env.REACT_APP_URL_TEST}/vendors/create`,
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
