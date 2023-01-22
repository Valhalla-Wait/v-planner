    import {
  AUTH_USER,
  AUTH_USER_SUCCESS,
  AUTH_USER_FAILED,
  SIGNIN_SUCCESS,
  SIGNIN_USER,
  SIGNIN_FAILED, GET_ALL_MESSAGES,
} from "../types";

const initialState = {
  loading: false,
  userData: {
    surname:""
  },
  token: null,
  error: null,
};

export default function userReducer(state = initialState, action) {

  switch (action.type) {

    case AUTH_USER_SUCCESS:
      return { 
        ...state,
        loading: false,
        error: null,
        userData: action.payload?.data,

        token: action.payload?.token,
      };
    case AUTH_USER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case SIGNIN_USER:
      return {
        ...state,
        loading: true,
      };
    case SIGNIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        userData: action.payload?.data,

        token: action.payload?.token,
      };
    case SIGNIN_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
}
