import axios from "axios";
import { editGeneralServiceSuccess } from "../../Reducers/Admin/ServicesReducer";

export const editGeneralServiceAction = (jwt, generalService, serviceTypeId) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `${process.env.REACT_APP_URL_TEST}/admin/update-general-service`,
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${jwt}` },
            data: generalService
        })
            .then(() => {
                dispatch(editGeneralServiceSuccess(generalService, serviceTypeId))
            })
            .catch((err) => {
                console.log(err)
            });
    }
}
