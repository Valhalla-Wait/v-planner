import {
  GET_ALL_VENDORS,
  GET_ALL_VENDORS_SUCESS,
  GET_ALL_VENDORS_FAILED,

} from "../types";

const initialState = {
  loading: true,
  allVendors: {
    result:[],
  },
  likedVendors: [],
  detailLoading: false,
  error: null,
};

export default function matchListReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_VENDORS:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_VENDORS_SUCESS:
      return {
        ...state,
        loading: false,
        allVendors: action.payload.data,
      };
    case GET_ALL_VENDORS_FAILED:
      return {
        ...state,
        loading: true,

        error: action.error,
      };

    default:
      return state;
  }
}
