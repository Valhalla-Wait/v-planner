import {
    GET_LIKED_VENDORS,
    GET_LIKED_VENDORS_SUCCESS,
    GET_LIKED_VENDORS_FAILED,

} from "../types";

const initialState = {
    loading: false,
    vendors: [{
        id: 1,
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
                id: 26,
                name: "lGQDrud7--1197993887.jpg",
                type: "AVATAR",
                url: "https://images-and-videos.fra1.digitaloceanspaces.comimages/lGQDrud7--1197993887.jpg"
            },
            {
                id: 27,
                name: "i28mlfMb-1885065787.jpg",
                type: "COMPANY_AVATAR",
                url: "https://images-and-videos.fra1.digitaloceanspaces.comimages/i28mlfMb-1885065787.jpg"
            },
            {
                id: 28,
                name: "NQxD6RnP--1723052065.jpg",
                type: "PHOTO_AND_VIDEOS",
                url: "https://images-and-videos.fra1.digitaloceanspaces.comimages/NQxD6RnP--1723052065.jpg"
            }
        ]
    }],
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
