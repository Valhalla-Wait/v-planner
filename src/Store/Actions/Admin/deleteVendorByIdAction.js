import axios from "axios";
import { deleteVendorByIdSuccess } from "../../Reducers/Admin/VendorsReducer";


export const deleteVendorByIdAction = (jwt, id) => {
    return (dispatch) => {
        return axios({
            method: "delete",
            url: `${process.env.REACT_APP_URL_TEST}/vendors/delete`,
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${jwt}` },
            params: {id: id}
        })
            .then((res) => {
                dispatch(deleteVendorByIdSuccess(id))
            })
            .catch((err) => {
                console.log(err)
            });
    }
}
