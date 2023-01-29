import {
    GET_ALL_MESSAGES_FAILED, GET_ALL_MESSAGES_SUCCESS, GET_ALL_MESSAGES, GET_ALL_CHAT_MESSAGES_FAILED, GET_ALL_CHAT_MESSAGES_SUCCESS, GET_ALL_CHAT_MESSAGES, UPDATE_CHAT_MESSAGES_SUCCESS, UPDATE_CHAT_MESSAGES, UPDATE_CHAT_MESSAGES_FAILED,
} from "../types";

const initialState = {
    loading: false,
    chats: [],
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
                chats: action.payload?.data,

            };
        case GET_ALL_MESSAGES_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };
        case GET_ALL_CHAT_MESSAGES:
            return {
                ...state,
                loading: true,
            };
        case GET_ALL_CHAT_MESSAGES_SUCCESS:
            const findChatIndex = state.chats.findIndex(recipient => recipient.id === action.payload.recipientId);
            
            const newChat = {
                ...state,
                loading: false,
                error: null,
                chats: [...state.chats][findChatIndex].messageHistory = action.payload.data
            }

            console.log('NEW CHAT', newChat)


            return {
                ...state,
                loading: false,
                error: null,
                chats: [...state.chats][findChatIndex].messageHistory = action.payload.data
            };
        case GET_ALL_CHAT_MESSAGES_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };
        case UPDATE_CHAT_MESSAGES_SUCCESS:
            return {
                ...state,
                chats: [
                    ...state.chats,
                    action.payload
                ],
                loading:false,
                error: null
            }
        case UPDATE_CHAT_MESSAGES:
            return {
                ...state,
                loading:true,
            }
        case UPDATE_CHAT_MESSAGES_FAILED:
            return {
                ...state,
                chats: [
                    ...state.chats,
                    action.payload.data
                ],
                loading:false,
                error: action.payload.error
            }

        default:
            return state;
    }
}
