import {
   GET_DETAIL_VENDOR,   GET_DETAIL_VENDOR_SUCCESS,GET_LIKED_VENDORS_FAILED
} from "../types";

const initialState = {
    loading: false,
    vendorData: {
        id: 10,
        firstName: "vendor5 wedding",
        surname: "surname",
        phoneNumber: "phoneNumber",
        username: "username",
        email: "kesusandbaha@gmail.com",
        city: "city",
        clientModel: null,
        vendorModel: {
            id: 7,
            companyName: "companyName",
            fieldOfActivity: "fieldOfActivity",
            weddingActivity: "weddingActivity",
            companyTitle: "companyTitle",
            companyDescription: "companyDescription",
            aboutCompany: "aboutCompany",
            aboutTeam: "photoStyle",
            photoStyle: "photoStyle",
            tiktok: null,
            instagram: null,
            twitter: null,
            facebook: null,
            services: [],
            photos: [
                {
                    id: 23,
                    name: "n2kwncri--390824283.jpeg",
                    type: "AVATAR",
                    url: "https://images-and-videos.fra1.digitaloceanspaces.comimages/gVj6u3Ew--246181654.jpg"
                },
                {
                    id: 24,
                    name: "n2kwncri--390824283.jpeg",
                    type: "COMPANY_AVATAR",
                    url: "https://images-and-videos.fra1.digitaloceanspaces.comimages/kek0EFXo--2042227933.jpg"
                },
                {
                    id: 25,
                    name: "n2kwncri--390824283.jpeg",
                    type: "PHOTO_AND_VIDEOS",
                    url: "https://images-and-videos.fra1.digitaloceanspaces.comimages/b7GEOhF1-452679422.jpg"
                }
            ]
    },
    error: null,
}
}

export default function DetailVendor(state = initialState, action) {
    switch (action.type) {
        case GET_DETAIL_VENDOR:
            return {
                ...state,
                loading: true,
            };
        case GET_DETAIL_VENDOR_SUCCESS:
            console.log("in reducer",action.payload.data)
            return {
                ...state,
                loading: false,
                error: null,
                vendorData: action.payload?.data,

            };
        case GET_LIKED_VENDORS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };
        default:
            return state
    }
}
