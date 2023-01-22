import {
    GET_ALL_MESSAGES_FAILED, GET_ALL_MESSAGES_SUCCESS, GET_ALL_MESSAGES,
} from "../types";

const initialState = {
    messages: null,
    error: null,
};

export default function chatReducer(state = initialState, action) {

    switch (action.type) {
        case GET_ALL_MESSAGES:
            return {
                ...state,
                loading: true,
            };
        case GET_ALL_MESSAGES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                messages: action.payload?.data,

            };
        case GET_ALL_MESSAGES_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };


        default:
            return state;
    }
}
