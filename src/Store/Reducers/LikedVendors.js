import {
    GET_LIKED_VENDORS,
    GET_LIKED_VENDORS_SUCCESS,
    GET_LIKED_VENDORS_FAILED,
    LIKE_VENDORS_SUCCESS,
    LIKE_VENDORS_START,
    LIKE_VENDORS_FAILED,

} from "../types";

const initialState = {
    loading: false,
    error: null,
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
        case LIKE_VENDORS_START:
            return {
                ...state,
                loading: true,
            };
        case LIKE_VENDORS_SUCCESS:
            return {
                ...state,
                loading: false,
                vendors: [...state.vendors, action.payload]
            }
        case LIKE_VENDORS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const likeVendorsStart = () => ({ type: LIKE_VENDORS_START })
export const likeVendorsSuccess = (vendor) => ({ type: LIKE_VENDORS_SUCCESS, payload: vendor })
export const likeVendorsFailed = (err) => ({ type: LIKE_VENDORS_FAILED, payload: err })
