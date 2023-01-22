import { useContext } from "react"
import { Outlet } from "react-router-dom"
import { SidebarContext } from "../../context/SidebarContext"
import useDevice from "../../hooks/useDevice"
import { Sidebar } from "../Sidebar/Sidebar"

const MainPageLayout = () => {

  const sidebar = useContext(SidebarContext)
  const device = useDevice()

  return <>
    <main className="page">
      <div className="container">
        <div className="page__content">
          <nav className={
            !device.isMobile
              ? "page__menu menu-page"
              : sidebar.isActive
                ? "page__menu menu-page active"
                : "page__menu menu-page"}
          >
            <Sidebar />
          </nav>
          <div className="page__body">
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  </>
}

export default MainPageLayout