import axios from "axios";
import { getTimeFromDate } from "../../utils/getTimeFromDate";
import { UPDATE_CHAT_MESSAGES, UPDATE_CHAT_MESSAGES_FAILED, UPDATE_CHAT_MESSAGES_SUCCESS } from "../types";

// export const updateChatMessages = (senderId, recipientId) => {
//     return async (dispatch, getState) => {
//         try {
//             dispatch(getMessagesInit);

//             const { userInfo, vendorInfo } = getState()

//             const isVendor = !!vendorInfo.token

//             const currentUserId = isVendor ? vendorInfo.vendorData.id : userInfo.userData.id

//             const chatMessages = await axios({
//                 method: "get",
//                 url: `${process.env.REACT_APP_API_URL}/messages/${senderId}/${recipientId}`,
//                 headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${userInfo.token ?? vendorInfo.token}` },
//             })

//             const newMessageHistory = chatMessages.data.result.map((m) => ({
//                 ...m,
//                 isRecipient: currentUserId == m.recipientId,
//                 message: m.content,
//                 time: getTimeFromDate(m.timestamp),
//                 type: 'textMessage'
//             }))

//             const lastMessage = chatMessages.data.result.reverse().find((mess) => mess.status === "DELIVERED")

//             dispatch(getMessagesSuccess(newMessageHistory, recipientId));

//             console.log("res in messages", newMessageHistory)
//             debugger
//         } catch (e) {
//             getMessagesFailed(e)
//         }
//     };
// }

export const updateChatMessages = (message) => {

    return {
        type: UPDATE_CHAT_MESSAGES_SUCCESS,
        payload: {
            data: message,
        },
    };
};

const updateMessagesInit = () => ({
    type: UPDATE_CHAT_MESSAGES,
});

const updateMessagesFailed = (error) => ({
    type: UPDATE_CHAT_MESSAGES_FAILED,
    payload: {
        error,
    },
})