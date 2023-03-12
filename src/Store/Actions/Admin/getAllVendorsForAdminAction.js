import axios from "axios";
import { getAllVendorsForAdminFailed, getAllVendorsForAdminStart, getAllVendorsForAdminSuccess } from "../../Reducers/Admin/VendorsReducer";


export const getAllVendorsForAdminAction = (jwt) => {
    return (dispatch) => {
        dispatch(getAllVendorsForAdminStart());
        axios({
            method: "get",
            url: `${process.env.REACT_APP_URL_TEST}/vendors/getAll`,
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${jwt}` },
        })
            .then((res) => {
                dispatch(getAllVendorsForAdminSuccess(res.data.result))
            })
            .catch((err) => {
                dispatch(getAllVendorsForAdminFailed(err.message));
            });
    }
}
