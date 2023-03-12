import axios from "axios";
import { deleteClientByIdSuccess } from "../../Reducers/Admin/ClientsReducer";


export const deleteClientByIdAction = (jwt, id) => {
    return (dispatch) => {
        return axios({
            method: "delete",
            url: `${process.env.REACT_APP_URL_TEST}/clients/delete`,
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${jwt}` },
            params: {id: id}
        })
            .then((res) => {
                dispatch(deleteClientByIdSuccess(id))
            })
            .catch((err) => {
                console.log(err)
            });
    }
}
