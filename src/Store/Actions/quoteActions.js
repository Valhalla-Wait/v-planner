import axios from "axios";
import { DELETE_QUOTE, SET_QUOTE } from "../types";
import { getQuotes } from "./getAllQuotes";

export const quoteStatuses = {
    'NEW': {
        value: 'NEW',
        class: 'new',
        title: 'New'
    },
    'VIEWED': {
        value: 'VIEWED',
        class: 'viewed',
        title: 'Viewed'
    },
    'ACCEPTED': {
        value: 'ACCEPTED',
        class: 'accepted',
        title: 'Accepted'
    },
    'DECLINED': {
        value: 'DECLINED',
        class: 'declined',
        title: 'Declined'
    }
}

// export const updateQuote = () => {
//      return (dispatch,getState) => {
//         dispatch(getMessagesInit);
//         const {userInfo} = getState()
//         axios({
//             method: "get",
//             url: `${process.env.REACT_APP_API_URL}/chat-rooms/${userInfo.userData.clientModel.id}`,
//             headers: { "Content-Type": "multipart/form-data",Authorization:`Bearer ${userInfo.token}`},
//         }).then((res) => {
//             dispatch(getMessagesSuccess(res));

//             console.log("res in messages",res)
//         }
//     ).catch((err)=>{
//             getMessagesFailed(err)
//         });
// }}

export const changeStatusQuote = (idQuote, status) => {
    return (dispatch,getState) => {
       const {userInfo} = getState()
       axios({
           method: "put",
           url: `${process.env.REACT_APP_API_URL}/quotes/update-quote-status?id=${idQuote}&status=${status}`,
           headers: { "Content-Type": "multipart/form-data",Authorization:`Bearer ${localStorage.getItem('token')}`},
       }).then((res) => {
           dispatch(getQuotes())
           console.log("res in messages",res)
       }
   ).catch((err)=>{
    console.log(err)
        //    getMessagesFailed(err)
       });
}}

export const setCurrentQuote = (data) => ({
    type: SET_QUOTE,
    payload: {
        data
    }
});

export const deleteCurrentQuote = (error) => ({
    type: DELETE_QUOTE,
    payload: {
        error,
    },
})