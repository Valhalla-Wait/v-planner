import { GET_ALL_MESSAGES, GET_ALL_MESSAGES_SUCCESS, GET_ALL_MESSAGES_FAILED } from "../types";
import axios from "axios";

export const getMessages = () => {
    return (dispatch,getState) => {
        dispatch(getMessagesInit);
        const {userInfo} = getState()
        axios({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}/chat-rooms/${userInfo.userData.clientModel.id}`,
            headers: { "Content-Type": "multipart/form-data",Authorization:`Bearer ${userInfo.token}`},
        }).then((res) => {
            dispatch(getMessagesSuccess(res));

            console.log("res in messages",res)
        }
    ).catch((err)=>{
            getMessagesFailed(err)
        });
};}
const getMessagesSuccess = (response) => {

    return {
        type: GET_ALL_MESSAGES_SUCCESS,
        payload: {
            data: response.data?.result,
        },
    };
};

const getMessagesInit = () => ({
    type: GET_ALL_MESSAGES,
});

const getMessagesFailed = (error) => ({
    type: GET_ALL_MESSAGES_FAILED,
    payload: {
        error,
    },
})
