import axios from "axios";
import { deleteGeneralServiceByIdSuccess } from "../../Reducers/Admin/ServicesReducer";


export const deleteGeneralServiceByIdAction = (jwt, generalServiceId, serviceTypeId) => {
    return (dispatch) => {
        return axios({
            method: "delete",
            url: `${process.env.REACT_APP_URL_TEST}/admin/delete-general-service`,
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${jwt}` },
            params: { id: generalServiceId }
        })
            .then(() => {
                dispatch(deleteGeneralServiceByIdSuccess(generalServiceId, serviceTypeId))
            })
            .catch((err) => {
                console.log(err)
            });
    }
}
