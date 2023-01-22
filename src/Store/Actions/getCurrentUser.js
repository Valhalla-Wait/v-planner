import axios from "axios";
import {
    GET_CURRENT,
    GET_CURRENT_SUCCESS,
    GET_CURRENT_FAILED,
    VENDOR_SUCCESS, AUTH_USER_SUCCESS,
} from "../types";

export const getCurrentUser = (jwt) =>{
    return (dispatch,getState)=>{
        dispatch(fetchStart);

        axios({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}/user/current`,
            headers: { "Content-Type": "multipart/form-data",Authorization:`Bearer ${jwt}`},
        }).then((res) => {
            console.log(res)
            console.log(res.data.result.roleModel.id)
            if(res.data.result.roleModel.id == 2){
                dispatch(fetchSuccess(AUTH_USER_SUCCESS,res,jwt));

            }
            else if(res.data.result.roleModel.id == 3){
                dispatch(fetchSuccess(VENDOR_SUCCESS,res,jwt));

                console.log("vendor")
            }
            console.log("response in  getCurrent js",res)
        })
            .catch((err) => {
                dispatch(fetchFailed(err.message));
            });
    }
}
const fetchSuccess = (type,response,jwt) => {
    return {
        type: type,
        payload: {
            data: response.data.result,
            token: jwt
        },
    };
};

const fetchStart = () => ({
    type: GET_CURRENT,
});

const fetchFailed = (error) => ({
    type: GET_CURRENT_FAILED,
    payload: {
        error,
    },
});
