import {
    DELETE_QUOTE,
    SET_QUOTE,
} from "../types";

const initialState = null

export default function quoteReducer(state = initialState, action) {

    switch (action.type) {
        case SET_QUOTE:
            return action.payload.data
        case DELETE_QUOTE:
            return null
        default:
            return state;
    }
}
