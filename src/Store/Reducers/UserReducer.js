import {
  SIGNIN_START,
  SIGNIN_SUCCESS,
  SIGNIN_FAILED,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  GET_CURRENT_USER_START,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_FAILED,
  LOGOUT,
  UPDATE_USER_START,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  CHANGE_CREDENTIALS_SUCCESS,
  CHANGE_CREDENTIALS_FAILED
} from "../types";

const initialState = {
  userData: {},
  isAuth: false,
  isLoading: false,
  error: null,
};

export default function userReducer(state = initialState, action) {

  switch (action.type) {
    case SIGNIN_START:
      return {
        ...state,
        isLoading: true,
      };
    case SIGNIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        token: action.payload,
      };
    case SIGNIN_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        isAuth: false,
      };

    case SIGNUP_START:
      return {
        ...state,
        isLoading: true
      }
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        userData: action.payload,
        isAuth: true,
      }
    case SIGNUP_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        isAuth: false,
      }

    case GET_CURRENT_USER_START:
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    case GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        userData: action.payload,
        error: null,
        isLoading: false,
        isAuth: true,
      };
    case GET_CURRENT_USER_FAILED:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        isAuth: false,
      };

    case UPDATE_USER_START:
      return {
        ...state,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        userData: action.payload,
      }
    case UPDATE_USER_FAILED:
      return {
        ...state,
        error: action.payload,
      }

    case CHANGE_CREDENTIALS_SUCCESS:
      return {
        ...state,
        userData: {
          ...state.userData,
          email: action.payload
        }
      }

    case CHANGE_CREDENTIALS_FAILED:
      return {
        ...state,
        error: action.payload
      }

    case LOGOUT:
      return {
        ...state,
        userData: {},
        isAuth: false,
      }

    default:
      return state;
  }
}

export const signInStart = () => ({ type: SIGNIN_START })
export const signInSuccess = (jwt) => ({ type: SIGNIN_SUCCESS, payload: jwt })
export const signInFailed = (err) => ({ type: SIGNIN_FAILED, payload: err })

export const signUpStart = () => ({ type: SIGNUP_START })
export const signUpSuccess = (user) => ({ type: SIGNUP_SUCCESS, payload: user })
export const signUpFailed = (err) => ({ type: SIGNUP_FAILED, payload: err })

export const logout = () => ({ type: LOGOUT })

export const getCurrentUserStart = () => ({ type: GET_CURRENT_USER_START })
export const getCurrentUserSuccess = (user) => ({ type: GET_CURRENT_USER_SUCCESS, payload: user })
export const getCurrentUserFailed = (err) => ({ type: GET_CURRENT_USER_FAILED, payload: err })

export const updateUserStart = () => ({ type: UPDATE_USER_START })
export const updateUserSuccess = (user) => ({ type: UPDATE_USER_SUCCESS, payload: user })
export const updateUserFailed = (err) => ({ type: UPDATE_USER_FAILED, payload: err })

export const changeCredentialsSuccess = (email) => ({ type: CHANGE_CREDENTIALS_SUCCESS, payload: email })
export const changeCredentialsFailed = (err) => ({ type: CHANGE_CREDENTIALS_FAILED, payload: err })