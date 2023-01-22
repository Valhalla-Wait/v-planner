import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import useDevice from "../../hooks/useDevice"
import Social from "../Social"
import Logo from "../UI/Logo"
import { LabelCompany } from "./LabelCompany"
import { LabelLike } from "./LabelLike"
import { SidebarUserAccount } from "./SidebarUserAccount"
import { SidebarVendorAccount } from "./SidebarVendorAccount"

export const SidebarAccount = () => {

  const auth = useContext(AuthContext)
  const device = useDevice()

  if(auth.user.role === process.env.REACT_APP_ROLE_USER){
    return (
      <>
        <SidebarUserAccount />
        {
          device.isMobile
          ? (
            <>
              <Logo style={{width: 160, height: 37, margin: "58px auto 31px"}} />
              <Social columnGap={36} />
            </>
          )
          : <LabelLike />
        }
      </>
    )
  }

  if(auth.user.role === process.env.REACT_APP_ROLE_VENDOR){
    return (
      <>
       <SidebarVendorAccount />
       {
         device.isMobile
           ? (
             <>
               <Logo style={{width: 160, height: 37, margin: "58px auto 31px"}} />
               <Social columnGap={36} />
             </>
           )
           : <LabelCompany />
       }
      </>
     )
  }
}