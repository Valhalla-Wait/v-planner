import axios from "axios";
import { getAllClientsForAdminFailed, getAllClientsForAdminStart, getAllClientsForAdminSuccess } from "../../Reducers/Admin/ClientsReducer";


export const getAllClientsForAdminAction = (jwt) => {
    return (dispatch) => {
        dispatch(getAllClientsForAdminStart());
        axios({
            method: "get",
            url: `${process.env.REACT_APP_URL_TEST}/clients/getAll`,
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${jwt}` },
        })
            .then((res) => {
                dispatch(getAllClientsForAdminSuccess(res.data.result))
            })
            .catch((err) => {
                dispatch(getAllClientsForAdminFailed(err.message));
            });
    }
}
