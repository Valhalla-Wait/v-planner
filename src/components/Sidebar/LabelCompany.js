import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

export const LabelCompany = () => {

  const auth = useContext(AuthContext)

  const { blocks } = auth.user.profile

  const filled = Object.keys(blocks).map(block => blocks[block]).filter(Boolean).length
  const total = Object.keys(blocks).length

  return (
    <div className={ total > filled ?  "menu-page__label label-menu active" : "menu-page__label label-menu"}>
      <div className="label-menu__header">
        <div className="label-menu__title">Company</div>
        <div className="label-menu__marker">
          <i className="label-menu__icon icon-company"></i>
          <span className="label-menu__dot">{ filled }/{ total }</span>
        </div>
      </div>
      <div className="label-menu__body">Fill all information about company</div>
      <div className="label-menu__progress">
        <span style={{width: 100 / total * filled + "%"}}></span>
      </div>
    </div>
  )
}