import { useSelector } from "react-redux"
import useDevice from "../../hooks/useDevice"

export const LabelLike = () => {

  const device = useDevice()

  const totalLikes = useSelector(state => state.myVendors.vendors.length)

  return (
    <div className={totalLikes < 10 ? "menu-page__label label-menu active" : "menu-page__label label-menu"}>
      <div className="label-menu__header">
        {
          device.isMobile
            ? <div className="label-menu__body">Like 10 vendors to get started</div>
            : <div className="label-menu__title">Matchlist</div>
        }
        <div className="label-menu__marker">
          <i className="label-menu__icon icon-like"></i>
          <span className="label-menu__dot">{totalLikes}/10</span>
        </div>
      </div>
      {!device.isMobile && <div className="label-menu__body">Like 10 vendors to get started</div>}
      <div className="label-menu__progress">
        <span style={{ width: 100 / 10 * totalLikes + "%" }}></span>
      </div>
    </div>
  )
}