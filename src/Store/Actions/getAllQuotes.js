import { GET_ALL_QUOTES, GET_ALL_QUOTES_SUCCESS, GET_ALL_QUOTES_FAILED } from "../types";
import axios from "axios";

export const getQuotes = (token) => {
    return (dispatch) => {
        console.log('начали получать квоты')
        dispatch(getQuotesInit)
        axios({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}/quotes/get-all`,
            headers: { "Content-Type": "multipart/form-data",Authorization:`Bearer ${localStorage.getItem('token')}`},
        }).then((res) => {
            dispatch(getQuotesSuccess(res));

            console.log("QUOTES",res)
        }
    ).catch((err)=>{
            console.log(err)
            getQuotesFailed(err)
        });
};}
const getQuotesSuccess = (response) => {

    return {
        type: GET_ALL_QUOTES_SUCCESS,
        payload: {
            data: response.data?.result,
        },
    };
};

const getQuotesInit = () => ({
    type: GET_ALL_QUOTES,
});

const getQuotesFailed = (error) => ({
    type: GET_ALL_QUOTES_FAILED,
    payload: {
        error,
    },
})
