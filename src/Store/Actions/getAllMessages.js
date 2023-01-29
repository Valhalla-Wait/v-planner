import { GET_ALL_MESSAGES, GET_ALL_MESSAGES_SUCCESS, GET_ALL_MESSAGES_FAILED } from "../types";
import axios from "axios";
import { getRecipients } from "../../utils/getRecipients";
import { getTimeFromDate } from "../../utils/getTimeFromDate";

export const getMessages = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(getMessagesInit);

            console.log("POSHEL ZAPROS")
            
            const { userInfo, vendorInfo } = getState()

            const isVendor = !!vendorInfo.token

            const currentUserId = isVendor ? vendorInfo.vendorData.id : userInfo.userData.id

            const rooms = await axios({
                method: "get",
                url: `${process.env.REACT_APP_API_URL}/chat-rooms/${currentUserId}`,
                headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${userInfo.token ?? vendorInfo.token}` },
            })

            console.log(rooms)

            const allUsers = await axios({
                method: "get",
                url: `${process.env.REACT_APP_API_URL}/${isVendor ? 'clients' : 'vendors'}/getAll`,
                headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${userInfo.token ?? vendorInfo.token}` },
            })

            const recipientsList = getRecipients(rooms.data.result, allUsers.data.result)
            console.log(recipientsList)
            const recipientsChats = []

            if (recipientsList.length) {

                for (let i = 0; i < recipientsList.length; i++) {

                    const messageHistory = await axios({
                        method: "get",
                        url: `${process.env.REACT_APP_API_URL}/messages/${currentUserId}/${recipientsList[i].id}`,
                        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${userInfo.token ?? vendorInfo.token}` },
                    })

                    const newMessageHistory = messageHistory.data.result.map((m) => ({
                        ...m,
                        isRecipient: currentUserId == m.recipientId,
                        message: m.content,
                        time: getTimeFromDate(m.timestamp),
                        type: 'textMessage'
                    }))

                    const lastMessage = messageHistory.data.result.reverse().find((mess) => mess.status === "DELIVERED")

                    const messageSendTime = getTimeFromDate(lastMessage.timestamp)

                    recipientsChats.push({
                        id: recipientsList[i].id,
                        avatar: recipientsList[i].vendorModel ? recipientsList[i].vendorModel.photos[0].url : recipientsList[i].clientModel.photoModel.url,
                        firstName: recipientsList[i].firstName,
                        surname: recipientsList[i].surname,
                        companyName: recipientsList[i].vendorModel ? recipientsList[i].vendorModel.companyName : '',
                        messageHistory: newMessageHistory,
                        lastMessage: {
                            message: lastMessage.content,
                            time: messageSendTime,
                            type: 'text'
                        },
                        newMessages: 0,
                    })
                }
            }

            console.log("FETCH CHATS", recipientsChats)
            dispatch(getMessagesSuccess(recipientsChats))

        } catch (e) {
            console.log(e)
            getMessagesFailed(e)
        }
    };
}
const getMessagesSuccess = (response) => {

    return {
        type: GET_ALL_MESSAGES_SUCCESS,
        payload: {
            data: response
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
