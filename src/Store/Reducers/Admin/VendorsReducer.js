import {
    GET_ALL_VENDORS_FOR_ADMIN_START,
    GET_ALL_VENDORS_FOR_ADMIN_SUCCESS,
    GET_ALL_VENDORS_FOR_ADMIN_FAILED,
    DELETE_VENDOR_BY_ID_SUCCESS
} from "../../types";

const initialState = {
    vendors: [],
    isLoading: false,
    error: null,
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_VENDORS_FOR_ADMIN_START:
            return {
                ...state,
                isLoading: true,
            };
        case GET_ALL_VENDORS_FOR_ADMIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                vendors: action.payload
            };
        case GET_ALL_VENDORS_FOR_ADMIN_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        case DELETE_VENDOR_BY_ID_SUCCESS:
            return {
                ...state,
                vendors: state.vendors.filter(vendor => vendor.id !== action.payload)
            }

        default:
            return state;
    }
}

export const getAllVendorsForAdminStart = () => ({ type: GET_ALL_VENDORS_FOR_ADMIN_START })
export const getAllVendorsForAdminSuccess = (vendors) => ({ type: GET_ALL_VENDORS_FOR_ADMIN_SUCCESS, payload: vendors })
export const getAllVendorsForAdminFailed = (err) => ({ type: GET_ALL_VENDORS_FOR_ADMIN_FAILED, payload: err })

export const deleteVendorByIdSuccess = (id) => ({ type: DELETE_VENDOR_BY_ID_SUCCESS, payload: id })
