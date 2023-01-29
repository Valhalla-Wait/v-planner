import axios from "axios";
import { getCurrentUserFailed, getCurrentUserStart, getCurrentUserSuccess } from "../Reducers/UserReducer";
import {
    GET_CURRENT_USER_START,
    GET_CURRENT_USER_SUCCESS,
    GET_CURRENT_USER_FAILED,
    VENDOR_SUCCESS, AUTH_USER_SUCCESS,
} from "../types";

export const getCurrentUser = (jwt) => {
    return (dispatch, getState) => {
        dispatch(getCurrentUserStart());
        axios({
            method: "get",
            url: `${process.env.REACT_APP_URL_TEST}/user/current`,
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${jwt}` },
        }).then((res) => {
            if (res.data.result.roleModel.id == 2) {
                dispatch(getCurrentUserSuccess(res.data.result));
            }
            else if (res.data.result.roleModel.id == 3) {
                dispatch(fetchSuccess(VENDOR_SUCCESS, res, jwt));
                console.log("vendor", res)
            }
        })
            .catch((err) => {
                dispatch(getCurrentUserFailed(err.message));
            });
    }
}
const fetchSuccess = (type, response, jwt) => {
    return {
        type: type,
        payload: {
            data: response.data.result,
            token: jwt
        },
    };
};

// const fetchStart = () => ({
//     type: GET_CURRENT,
// });

// const fetchFailed = (error) => ({
//     type: GET_CURRENT_FAILED,
//     payload: {
//         error,
//     },
// });
