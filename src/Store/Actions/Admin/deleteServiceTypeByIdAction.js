import axios from "axios";
import { deleteServiceTypeByIdSuccess } from "../../Reducers/Admin/ServicesReducer";

export const deleteServiceTypeByIdAction = (jwt, id) => {
    return (dispatch) => {
        return axios({
            method: "delete",
            url: `${process.env.REACT_APP_URL_TEST}/service-type/delete`,
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${jwt}` },
            params: { id: id }
        })
            .then(() => {
                dispatch(deleteServiceTypeByIdSuccess(id))
            })
            .catch((err) => {
                console.log(err)
            });
    }
}
