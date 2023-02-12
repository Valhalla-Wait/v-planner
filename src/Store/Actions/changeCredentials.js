import axios from "axios";
import { changeCredentialsFailed, changeCredentialsSuccess } from "../Reducers/UserReducer";

export const changeCredentials = (email, password) => {
    return (dispatch, getState) => {
        const token = localStorage.getItem('token')

        const user = getState().userInfo.userData
        const isClient = user.roleModel.role === env.REACT_APP_ROLE_USER
        const url = isClient ? "/clients/change-credentials" : "/vendors/change-credentials"

        const reqBody = {
            email: email || user.email,
            password: password,
        }

        axios({
            method: "put",
            url: process.env.REACT_APP_API_URL + url,
            data: reqBody,
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
        })
            .then((res) => {
                dispatch(changeCredentialsSuccess(res.data.email))
            })
            .catch((err) => {
                dispatch(changeCredentialsFailed(err))
            });
    };
};