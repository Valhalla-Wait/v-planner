import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import useDevice from "../../hooks/useDevice"
import {useSelector} from 'react-redux'

export const LabelLike = () => {

  const auth = useContext(AuthContext)
  const device = useDevice()

  const likedVendors = useSelector(state => state.myVendors)


  return (
    <div className={ likedVendors.vendors.length < 10 ?  "menu-page__label label-menu active" : "menu-page__label label-menu"}>
      <div className="label-menu__header">
        {
          device.isMobile
            ? <div className="label-menu__body">Like 10 vendors to get started</div>
            : <div className="label-menu__title">Matchlist</div>
        }
        <div className="label-menu__marker">
          <i className="label-menu__icon icon-like"></i>
          <span className="label-menu__dot">{ likedVendors.vendors.length }/10</span>
        </div>
      </div>
      { !device.isMobile && <div className="label-menu__body">Like 10 vendors to get started</div> }
      <div className="label-menu__progress">
        <span style={{width: 100 / 10 * likedVendors.vendors.length + "%"}}></span>
      </div>
    </div>
  )
}