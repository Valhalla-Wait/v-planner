import axios from "axios";
import { updateUserFailed, updateUserStart, updateUserSuccess } from "../Reducers/UserReducer";

export const updateClient = (user, avatar) => {
    return (dispatch) => {
        dispatch(updateUserStart())
        const reqBody = new FormData();
        const token = localStorage.getItem('token')
        const json = JSON.stringify(user);
        const blob = new Blob([json], {
            type: "application/json",
        });

        reqBody.append("updateClientModel", blob);
        if (avatar) {
            reqBody.append("avatar", avatar);
        }

        axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}/clients/update`,
            data: reqBody,
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
        })
            .then((res) => {
                dispatch(updateUserSuccess(res.data.result))
            })
            .catch((err) => {
                console.log(err.message);
                dispatch(updateUserFailed(err))
            });
    };
};

export const updateVendor = (vendor) => {
    return (dispatch, getState) => {
        dispatch(updateUserStart())

        const user = getState().userInfo.userData

        const oldData = {
            id: user.id,
            aboutCompany: user.vendorModel.aboutCompany,
            aboutTeam: user.vendorModel.aboutTeam,
            city: user.city,
            country: user.vendorModel.country,
            companyDescription: user.vendorModel.companyDescription,
            companyName: user.vendorModel.companyName,
            companyTitle: user.vendorModel.companyTitle,
            facebook: user.vendorModel.facebook,
            fieldOfActivity: user.vendorModel.fieldOfActivity,
            firstName: user.firstName,
            instagram: user.vendorModel.instagram,
            phoneNumber: user.phoneNumber,
            photoStyle: user.vendorModel.photoStyle,
            priceFrom: user.vendorModel.priceFrom,
            priceTo: user.vendorModel.priceTo,
            serviceModels: user.vendorModel.services,
            serviceType: user.vendorModel.serviceType,
            weddingActivity: user.vendorModel.weddingActivity,
            surname: user.surname,
            tiktok: user.vendorModel.tiktok,
            twitter: user.vendorModel.twitter,
            username: user.username,
            yearsOnMarket: user.vendorModel.yearsOnMarket,
            youtube: user.vendorModel.youtube,
        }

        const updatedData = {
            ...oldData,
            ...vendor
        }

        const reqBody = new FormData();
        const token = localStorage.getItem('token')
        const json = JSON.stringify(updatedData);
        const blob = new Blob([json], {
            type: "application/json",
        });
        reqBody.append("updateVendorModel", blob);

        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}/vendors/update`,
            data: reqBody,
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
        })
            .then((res) => {
                dispatch(updateUserSuccess(res.data.result))
            })
            .catch((err) => {
                console.log(err.message);
                dispatch(updateUserFailed(err))
                throw err
            });
    };
}
