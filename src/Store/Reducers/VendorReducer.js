import {
  LOGIN_VENDOR,
  VENDOR_SUCCESS,
  VENDOR_FAILED,
  VENDOR_SIGNIN,
  VENDOR_SIGNIN_SUCCESS,
  VENDOR_SIGNIN_FAILED,
  VENDOR_LOGOUT,
} from "../types";

const initialState = {
  loading: false,
  vendorData: {
    username:""
  },
  token: null,
  error: null,
};

export default function VendorReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_VENDOR:
      return {
        ...state,
        loading: true,
      };
    case VENDOR_SUCCESS:
      console.log(action.type, action.payload.data)
      return {
        ...state,
        loading: false,
        error: null,
        vendorData: action.payload?.data,

        token: action.payload?.token,
      };
    case VENDOR_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case VENDOR_SIGNIN:
      return {
        ...state,
        loading: true,
      };
    case VENDOR_SIGNIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        userData: action.payload?.data,

        token: action.payload?.token,
      };
    case VENDOR_SIGNIN_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      case VENDOR_LOGOUT:
      return {
        ...state,
        vendorData: {
          username:""
        }
      };
    default:
      return state;
  }
}

export const vendorLogout = () => ({type: VENDOR_LOGOUT})
export const vendorSignIn = () => ({type: LOGIN_VENDOR})