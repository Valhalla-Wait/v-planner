import { GET_ALL_CHAT_MESSAGES_SUCCESS, GET_ALL_CHAT_MESSAGES, GET_ALL_CHAT_MESSAGES_FAILED } from "../types";
import axios from "axios";
import { getTimeFromDate } from "../../utils/getTimeFromDate";

export const getChatMessages = (senderId, recipientId) => {
    return async (dispatch, getState) => {
        try {
            console.log('CHATMESSAGES!!!!')
            dispatch(getMessagesInit);

            const { userInfo, vendorInfo } = getState()

            const isVendor = !!vendorInfo.token

            const currentUserId = isVendor ? vendorInfo.vendorData.id : userInfo.userData.id

            const chatMessages = await axios({
                method: "get",
                url: `${process.env.REACT_APP_API_URL}/messages/${senderId}/${recipientId}`,
                headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${userInfo.token ?? vendorInfo.token}` },
            })

            const newMessageHistory = chatMessages.data.result.map((m) => ({
                ...m,
                isRecipient: currentUserId == m.recipientId,
                message: m.content,
                time: getTimeFromDate(m.timestamp),
                type: 'textMessage'
            }))

            const lastMessage = chatMessages.data.result.reverse().find((mess) => mess.status === "DELIVERED")

            dispatch(getMessagesSuccess(newMessageHistory, recipientId));

            console.log("res in messages", newMessageHistory)

        } catch (e) {
            getMessagesFailed(e)
        }
    };
}
const getMessagesSuccess = (response, recipientId) => {

    return {
        type: GET_ALL_CHAT_MESSAGES_SUCCESS,
        payload: {
            recipientId,
            data: response,
        },
    };
};

const getMessagesInit = () => ({
    type: GET_ALL_CHAT_MESSAGES,
});

const getMessagesFailed = (error) => ({
    type: GET_ALL_CHAT_MESSAGES_FAILED,
    payload: {
        error,
    },
})