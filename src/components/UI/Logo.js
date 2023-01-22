import { useContext } from "react"
import { SidebarContext } from "../../context/SidebarContext"
import { ThemeContext } from "../../context/ThemeContext"

const Logo = (props) => {

  const sidebar = useContext(SidebarContext)
  const theme = useContext(ThemeContext)

  return (
    <img
      src={`/assets/images/logo/logo-theme-${theme.get()}@1x.png`}
      srcSet={`/assets/images/logo/logo-theme-${theme.get()}@2x.png 2x`}
      alt="Logo"
      className="logo"
      loading="lazy"
      onClick={sidebar.destroy}
      {...props}
    />
  )
}

export default Logo
