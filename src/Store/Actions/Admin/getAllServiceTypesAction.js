import axios from "axios";
import { getAllServiceTypesFailed, getAllServiceTypesStart, getAllServiceTypesSuccess } from "../../Reducers/Admin/ServicesReducer";


export const getAllServiceTypesAction = (jwt) => {
    return (dispatch) => {
        dispatch(getAllServiceTypesStart());
        axios({
            method: "get",
            url: `${process.env.REACT_APP_URL_TEST}/service-type/get-all`,
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${jwt}` },
        })
            .then((res) => {
                dispatch(getAllServiceTypesSuccess(res.data.result))
            })
            .catch((err) => {
                dispatch(getAllServiceTypesFailed(err.message));
            });
    }
}
