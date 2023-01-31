import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { SidebarUser } from "./SidebarUser"
import { SidebarVendor } from "./SidebarVendor"
import { LabelLike } from "./LabelLike"
import { LabelCompany } from "./LabelCompany"
import useDevice from "../../hooks/useDevice"
import Logo from "../UI/Logo"
import Social from "../Social"
import { useSelector } from "react-redux"

export const Sidebar = () => {

  const device = useDevice()
  const role = useSelector(state => state.userInfo.userData.roleModel.role)

  if (role === process.env.REACT_APP_ROLE_USER) {
    return (
      <>
        <SidebarUser />
        {
          device.isMobile
            ? (
              <>
                <Logo style={{ width: 160, height: 37, margin: "58px auto 31px" }} />
                <Social columnGap={36} />
              </>
            )
            : <LabelLike />
        }
      </>
    )
  }

  if (role === process.env.REACT_APP_ROLE_VENDOR) {
    return (
      <>
        <SidebarVendor />
        {
          device.isMobile
            ? (
              <>
                <Logo style={{ width: 160, height: 37, margin: "58px auto 31px" }} />
                <Social columnGap={36} />
              </>
            )
            : <LabelCompany />
        }
      </>
    )
  }
  return <>NO SIDEBAR</>
}