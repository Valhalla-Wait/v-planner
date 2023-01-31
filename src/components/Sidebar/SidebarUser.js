import { useContext } from "react"
import { useSelector } from "react-redux"
import { AuthContext } from "../../context/AuthContext"
import { SidebarList } from "./SidebarList"

export const SidebarUser = () => {
  const likesCount = useSelector(state => state.myVendors.vendors).length

  const forbidden = likesCount < 10

  return (
    <SidebarList
      list={[
        { to: "/matchlist", title: "Matchlist", forbidden: false },
        { to: "/chat", title: "Chat", forbidden },
        { to: "/vendor", title: "My Vendors", forbidden },
        { to: "/quotes", title: "Quotes And Orders", forbidden },
        // {to: "/orders", title: "My Orders", forbidden},
        { to: "/help", title: "Help", forbidden: false },
      ]}
    />
  )
}