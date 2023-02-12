import axios from "axios";

export const addVendorPhoto = (file, type) => {
    return (dispatch) => {
        const token = localStorage.getItem('token')
        const reqBody = new FormData();

        const json = JSON.stringify(type)
        const blob = new Blob([json], {
            type: 'application/json'
        });
        reqBody.append("file", file);
        reqBody.append("photoTypeEnum", blob)

        return axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}/vendors/add-photo`,
            data: reqBody,
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
        })
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
                throw err
            });
    };
};

export const replaceVendorPhoto = (id, image) => {
    return (dispatch) => {
        const token = localStorage.getItem('token')
        const reqBody = new FormData();

        const json = JSON.stringify(id)
        const blob = new Blob([json], {
            type: 'application/json'
        });
        reqBody.append("id", blob)
        reqBody.append("file", image[0]);

        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}/vendors/replace-photo`,
            data: reqBody,
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
        })
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
                throw err
            });
    };
};

export const deleteVendorPhoto = (id) => {
    return (dispatch) => {
        const token = localStorage.getItem('token')
        const reqBody = new FormData();
        reqBody.append("photoId", id)

        return axios({
            method: "delete",
            url: `${process.env.REACT_APP_API_URL}/vendors/delete-photo`,
            data: reqBody,
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
        })
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
                throw err
            });
    };
};