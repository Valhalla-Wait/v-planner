import {
  AUTH_USER,
  AUTH_USER_SUCCESS,
  AUTH_USER_FAILED,
  SIGNIN_SUCCESS,
  SIGNIN_START,
  SIGNIN_FAILED,
  GET_CURRENT_USER_START,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_FAILED,

} from "../types";

const initialState = {
  loading: false,
  userData: {
    surname: ""
  },
  token: null,
  error: null,
  isAuth: false,
};

export default function userReducer(state = initialState, action) {

  switch (action.type) {

    // case AUTH_USER_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: null,
    //     userData: action.payload?.data,

    //     token: action.payload?.token,
    //   };
    // case AUTH_USER_FAILED:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.payload.error,
    //   };
    case SIGNIN_START:
      return {
        ...state,
        loading: true,
      };
    case SIGNIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        token: action.payload,
        // isAuth: true,
      };
    case SIGNIN_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuth: false,
      };
    case GET_CURRENT_USER_START:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        userData: action.payload,
        error: null,
        loading: false,
        isAuth: true,
      };
    case GET_CURRENT_USER_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false,
        isAuth: false,
      };

    default:
      return state;
  }
}

export const signInStart = () => ({ type: SIGNIN_START })
export const signInSuccess = (jwt) => ({ type: SIGNIN_SUCCESS, payload: jwt })
export const signInFailed = (err) => ({ type: SIGNIN_FAILED, payload: err })

export const getCurrentUserStart = () => ({ type: GET_CURRENT_USER_START })
export const getCurrentUserSuccess = (user) => ({ type: GET_CURRENT_USER_SUCCESS, payload: user })
export const getCurrentUserFailed = (err) => ({ type: GET_CURRENT_USER_FAILED, payload: err })