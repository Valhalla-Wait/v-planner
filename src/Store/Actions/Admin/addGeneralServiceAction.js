import axios from "axios";
import { addGeneralServiceSuccess } from "../../Reducers/Admin/ServicesReducer";

export const addGeneralServiceAction = (jwt, generalService) => {
    return (dispatch) => {
        return axios({
            method: "post",
            url: `${process.env.REACT_APP_URL_TEST}/services/create`,
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${jwt}` },
            data: generalService
        })
            .then((res) => {
                dispatch(addGeneralServiceSuccess(res.data.result, generalService.serviceTypeId))
            })
            .catch((err) => {
                console.log(err)
            });
    }
}
