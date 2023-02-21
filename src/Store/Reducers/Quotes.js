import {
    GET_ALL_QUOTES_FAILED, GET_ALL_QUOTES_SUCCESS, GET_ALL_QUOTES,
} from "../types";

const initialState = {
    loading: false,
    error: null,
    quotesList: []
};

export default function quotesReducer(state = initialState, action) {

    switch (action.type) {
        case GET_ALL_QUOTES:
            return {
                ...state,
                loading: true,
            };
        case GET_ALL_QUOTES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                quotesList: action.payload?.data
            };
        case GET_ALL_QUOTES_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };


        default:
            return state;
    }
}
