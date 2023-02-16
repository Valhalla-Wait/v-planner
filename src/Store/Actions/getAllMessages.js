import { GET_ALL_MESSAGES, GET_ALL_MESSAGES_SUCCESS, GET_ALL_MESSAGES_FAILED } from "../types";
import axios from "axios";
import { getRecipients } from "../../utils/getRecipients";
import { getTimeFromDate } from "../../utils/getTimeFromDate";
import { quoteStatuses } from "./quoteActions";

export const getMessages = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(getMessagesInit());

            console.log("POSHEL ZAPROS")

            const { userInfo, vendorInfo } = getState()

            const isVendor = !!vendorInfo.vendorData.id

            const currentUserId = isVendor ? vendorInfo.vendorData.id : userInfo.userData.id

            const rooms = await axios({
                method: "get",
                url: `${process.env.REACT_APP_API_URL}/chat-rooms/${currentUserId}`,
                headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem('token')}` },
            })

            const quotes = await axios({
                method: "get",
                url: `${process.env.REACT_APP_API_URL}/quotes/get-all`,
                headers: { "Content-Type": "multipart/form-data",Authorization:`Bearer ${localStorage.getItem('token')}`},
            }) 

            
            // const findChatQuote = (recId) => {
            //     if q
            //     const quote = 

            //     return quote ? quote : null
            // }

            console.log(rooms)

            const allUsers = await axios({
                method: "get",
                url: `${process.env.REACT_APP_API_URL}/${isVendor ? 'clients' : 'vendors'}/getAll`,
                headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem('token')}` },
            })

            const recipientsList = getRecipients(rooms.data.result, allUsers.data.result)
            console.log(recipientsList)
            const recipientsChats = []
            if (recipientsList.length) {

                for (let i = 0; i < recipientsList.length; i++) {
                    const messageHistory = await axios({
                        method: "get",
                        url: `${process.env.REACT_APP_API_URL}/messages/${currentUserId}/${recipientsList[i].id}`,
                        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem('token')}` },
                    })

                    if (messageHistory.data.result.length) {

                        const newMessageHistory = messageHistory.data.result.map((m) => {
                            return {
                                ...m,
                            isRecipient: currentUserId == m.recipientId,
                            message: m.content,
                            time: getTimeFromDate(m.timestamp),
                            type: m.content === 'createRoom' || m.content === 'Room created' ? 'serviceMessage' : 'textMessage'
                            }
                        })

                        const lastMessage = messageHistory.data.result.reverse().find((mess) => mess.status === "DELIVERED" || mess.status === "RECEIVED")

                        const messageSendTime = getTimeFromDate(lastMessage.timestamp)

                        recipientsChats.push({
                            id: recipientsList[i].id,
                            avatar: recipientsList[i].vendorModel ? recipientsList[i].vendorModel.photos[0].url : recipientsList[i].clientModel.photoModel.url,
                            firstName: recipientsList[i].firstName,
                            surname: recipientsList[i].surname,
                            companyName: recipientsList[i].vendorModel ? recipientsList[i].vendorModel.companyName : '',
                            quote: quotes.data.result.filter(quote => {
                                if(isVendor){
                                    return quote.vendor.id === currentUserId && quote.client.id === Number(recipientsList[i].id)
                                }else{
                                    return quote.client.id === currentUserId && quote.vendor.id === Number(recipientsList[i].id) && (quote.status === quoteStatuses.NEW.value || quote.status === quoteStatuses.VIEWED.value)
                                }
                            })[0] || null,
                            messageHistory: newMessageHistory,
                            lastMessage: {
                                message: lastMessage.content === 'createRoom' || lastMessage.content === 'Room created' ? '' : lastMessage.content,
                                time: lastMessage.content === 'createRoom' || lastMessage.content === 'Room created'? '' : messageSendTime,
                                type: 'text'
                            },
                            newMessages: 0,
                        })
                    }


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
