import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import useDevice from "../../hooks/useDevice"

export const LabelLike = () => {

  const auth = useContext(AuthContext)
  const device = useDevice()

  const { likes } = auth.user.profile

  const total = Object.keys(likes.users).length

  return (
    <div className={ total < 10 ?  "menu-page__label label-menu active" : "menu-page__label label-menu"}>
      <div className="label-menu__header">
        {
          device.isMobile
            ? <div className="label-menu__body">Like 10 vendors to get started</div>
            : <div className="label-menu__title">Matchlist</div>
        }
        <div className="label-menu__marker">
          <i className="label-menu__icon icon-like"></i>
          <span className="label-menu__dot">{ total }/10</span>
        </div>
      </div>
      { !device.isMobile && <div className="label-menu__body">Like 10 vendors to get started</div> }
      <div className="label-menu__progress">
        <span style={{width: 100 / 10 * total + "%"}}></span>
      </div>
    </div>
  )
}