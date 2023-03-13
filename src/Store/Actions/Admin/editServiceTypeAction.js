import axios from "axios";
import { editServiceTypeSuccess } from "../../Reducers/Admin/ServicesReducer";

export const editServiceTypeAction = (jwt, serviceType) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `${process.env.REACT_APP_URL_TEST}/service-type/update`,
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${jwt}` },
            data: serviceType
        })
            .then((res) => {
                dispatch(editServiceTypeSuccess(res.data.result))
            })
            .catch((err) => {
                console.log(err)
            });
    }
}
