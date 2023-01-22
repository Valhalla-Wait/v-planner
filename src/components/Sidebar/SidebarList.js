import { SidebarItem } from "./SidebarItem"

export const SidebarList = ({ list = [] }) => {

  return (
    <ul className="menu-page__list">
      {
        list.map(item => <SidebarItem key={item.to} {...item} />)
      }
    </ul>
  )
}