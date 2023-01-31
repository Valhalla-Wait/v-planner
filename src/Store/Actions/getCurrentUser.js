import axios from "axios";
import { getCurrentUserFailed, getCurrentUserStart, getCurrentUserSuccess } from "../Reducers/UserReducer";

export const getCurrentUser = (jwt) => {
    return (dispatch) => {
        dispatch(getCurrentUserStart());
        axios({
            method: "get",
            url: `${process.env.REACT_APP_URL_TEST}/user/current`,
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${jwt}` },
        })
            .then((res) => {
                dispatch(getCurrentUserSuccess(res.data.result));
            })
            .catch((err) => {
                dispatch(getCurrentUserFailed(err.message));
            });
    }
}
