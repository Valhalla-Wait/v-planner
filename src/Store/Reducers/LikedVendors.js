import {
    GET_LIKED_VENDORS,
    GET_LIKED_VENDORS_SUCCESS,
    GET_LIKED_VENDORS_FAILED,

} from "../types";

const initialState = {
    loading: false,
    vendors: [],
};

export default function LikedVendors(state = initialState, action) {

    switch (action.type) {
        case GET_LIKED_VENDORS:
            return {
                ...state,
                loading: true,
            };
        case GET_LIKED_VENDORS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                vendors: action.payload?.data,

            };
        case GET_LIKED_VENDORS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };

        default:
            return state;
    }
}
