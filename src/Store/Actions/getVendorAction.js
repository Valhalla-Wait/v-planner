import {
  GET_DETAIL_VENDOR,
  GET_DETAIL_VENDOR_FAILED, GET_DETAIL_VENDOR_SUCCESS,
} from "../types";
import axios from "axios";

export const getDetailVendor = (id) => {
  return (dispatch,getState) => {
    dispatch(fetchStart);
    const state = getState()
    const token = state.userInfo.token
    console.log("token in getDetail ",token)
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/vendors/getById?id=${id}`,
      headers: { "Content-Type": "multipart/form-data",Authorization:`Bearer ${token}`}
    })
      .then((res) => {
        console.log("response in detail vendor", res);
        dispatch(fetchSuccess(res));
      })
      .catch((err) => {
        dispatch(fetchFailed(err.message));
      });
  };
};
const fetchSuccess = (response) => {
  return {
    type: GET_DETAIL_VENDOR_SUCCESS,
    payload: {
      data: response.data.result,
    },
  };
};

const fetchStart = () => ({
  type: GET_DETAIL_VENDOR,
});

const fetchFailed = (error) => ({
  type: GET_DETAIL_VENDOR_FAILED,
  payload: {
    error,
  },
});
