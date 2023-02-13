import MatchService from "../../services/MatchService"
import { likeVendorsFailed, likeVendorsStart, likeVendorsSuccess } from "../Reducers/LikedVendors"

export const likeVendor = (id, vendor) => {
    return (dispatch) => {
        likeVendorsStart()
        return MatchService.like(id)
            .then(() => {
                dispatch(likeVendorsSuccess(vendor))
            })
            .catch((err) => {
                console.log(err)
                dispatch(likeVendorsFailed(err))
            })
    }
}