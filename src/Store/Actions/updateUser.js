import axios from "axios";
import { updateUserFailed, updateUserStart, updateUserSuccess } from "../Reducers/UserReducer";

export const updateUser = (user, avatar) => {

    return (dispatch) => {
        dispatch(updateUserStart())
        const reqBody = new FormData();
        const token = localStorage.getItem('token')
        const json = JSON.stringify(user);
        const blob = new Blob([json], {
            type: "application/json",
        });

        reqBody.append("updateClientModel", blob);
        if (avatar) {
            reqBody.append("avatar", avatar);
        }
        
        axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}/clients/update`,
            data: reqBody,
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
        })
            .then((res) => {
                dispatch(updateUserSuccess(res.data.result))
            })
            .catch((err) => {
                console.log(err.message);
                dispatch(updateUserFailed(err))
            });
    };
};
