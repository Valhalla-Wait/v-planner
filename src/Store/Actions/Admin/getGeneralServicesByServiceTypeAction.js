import axios from "axios";
import { getGeneralServicesByServiceTypeSuccess } from "../../Reducers/Admin/ServicesReducer";


export const getGeneralServicesByServiceTypeAction = (jwt, serviceTypeId) => {
    return (dispatch) => {
        return axios({
            method: "get",
            url: `${process.env.REACT_APP_URL_TEST}/services/get-by-service-type`,
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${jwt}` },
            params: { service_type_id: serviceTypeId }
        })
            .then((res) => {
                dispatch(getGeneralServicesByServiceTypeSuccess(res.data.result, serviceTypeId))
            })
            .catch((err) => {
                console.log(err)
            });
    }
}
