import axios from "axios";
import { addServiceTypeSuccess } from "../../Reducers/Admin/ServicesReducer";

export const addServiceTypeAction = (jwt, serviceType) => {
    return (dispatch) => {
        return axios({
            method: "post",
            url: `${process.env.REACT_APP_URL_TEST}/service-type/create`,
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${jwt}` },
            data: serviceType
        })
            .then((res) => {
                dispatch(addServiceTypeSuccess(res.data.result))
            })
            .catch((err) => {
                console.log(err)
            });
    }
}
