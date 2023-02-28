import { SidebarList } from "./SidebarList"

export const SidebarVendor = () => {
  return (
    <SidebarList
      list={[
        {to: "/chat", title: "Chat", forbidden: false},
        {to: "/orders", title: "My Orders", forbidden: false},
        {to: "/reports", title: "Reports", forbidden: false},
        {to: "/financial-reports", title: "Financial Reports", forbidden: false}
      ]}
    />
  )
}