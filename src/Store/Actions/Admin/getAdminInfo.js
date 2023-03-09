import axios from "axios";
import { getCurrentUserFailed, getCurrentUserStart, getCurrentUserSuccess } from "../../Reducers/UserReducer";

export const getAdminInfo = (jwt) => {
    return (dispatch) => {
        dispatch(getCurrentUserStart());
        axios({
            method: "get",
            url: `${process.env.REACT_APP_URL_TEST}/user/current`,
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${jwt}` },
        })
            .then((res) => {
                if (res.data.result.roleModel.role === process.env.REACT_APP_ROLE_ADMIN) {
                    dispatch(getCurrentUserSuccess(res.data.result));
                } else {
                    localStorage.removeItem('token')
                    throw Error('Incorrect email or password')
                }
            })
            .catch((err) => {
                dispatch(getCurrentUserFailed(err.message));
                throw err
            });
    }
}
