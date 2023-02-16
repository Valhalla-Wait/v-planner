import {
  GET_ALL_VENDORS,
  GET_ALL_VENDORS_SUCESS,
  GET_ALL_VENDORS_FAILED,

} from "../types";

const initialState = {
  loading: true,
  allVendors: {
    result:[
      {
        id: 8 ,
        title: "data is changed ",
        price: "1$-3000$",
        description:
            "When couples start thinking about their wedding plans, one of the details that typically first comes to mind is their wedding cake.",
        services: ["Wedding Bakary", "Wedding Cakes"],
        about:
            "When couples start thinking about their wedding plans, one of the details that typically first comes to mind is their wedding cake.",
        photos: [
          {
            id:14,
            name:"pe3P7OqJ--1652305628.jpeg",
            type:"AVATAR",
            url:""
          }
        ],
      },
      {
        id: 9,
        title: "Wedding Cakes 2",
        price: "2$-3000$",
        description:
            "When couples start thinking about their wedding plans, one of the details that typically first comes to mind is their wedding cake. When couples start thinking about their wedding plans, one of the details that typically first comes to mind is their wedding cake. When couples start thinking about their wedding plans, one of the details that typically first comes to mind is their wedding cake.",
        services: ["Wedding Bakary", "Wedding Cakes"],
        about:
            "When couples start thinking about their wedding plans, one of the details that typically first comes to mind is their wedding cake.",
        photos: [
          {
            id:14,
            name:"pe3P7OqJ--1652305628.jpeg",
            type:"AVATAR",
            url:""
          }
        ],
      },
      {
        id: 10,
        title: "Wedding Cakes 3",
        price: "3$-3000$",
        description:
            "When couples start thinking about their wedding plans, one of the details that typically first comes to mind is their wedding cake.",
        services: ["Wedding Bakary", "Wedding Cakes"],
        about:
            "When couples start thinking about their wedding plans, one of the details that typically first comes to mind is their wedding cake.",
        photos: [
          {
            id:14,
            name:"pe3P7OqJ--1652305628.jpeg",
            type:"AVATAR",
            url:""
          }
        ],
      },
      {
        id: 11,
        title: "Wedding Cakes 4",
        price: "4$-3000$",
        description:
            "When couples start thinking about their wedding plans, one of the details that typically first comes to mind is their wedding cake.",
        services: ["Wedding Bakary", "Wedding Cakes"],
        about:
            "When couples start thinking about their wedding plans, one of the details that typically first comes to mind is their wedding cake.",
        photos: [
          {
            id:14,
            name:"pe3P7OqJ--1652305628.jpeg",
            type:"AVATAR",
            url:""
          }
        ],
      },
    ],
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
