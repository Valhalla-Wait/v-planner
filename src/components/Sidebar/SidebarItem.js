import { useContext } from "react"
import { Link, useLocation } from "react-router-dom"
import { SidebarContext } from "../../context/SidebarContext"

export const SidebarItem = ({ to, title, forbidden, marker }) => {

  const sidebar = useContext(SidebarContext)

  const { pathname } = useLocation()
  return (
    <li
      className={pathname === to ? "menu-page__item active" : "menu-page__item"}
      onClick={() => {
        sidebar.destroy()
      }}
    >
      {
        forbidden
          ? <span className="menu-page__link forbidden">{ title }</span>
          : <Link to={to} className="menu-page__link">
              { pathname === to ? <span>{ title }</span> : title }
              {marker && <div className="menu-page__marker"><span>{ marker }</span></div>}
          </Link>
      }
    </li>
  )
}