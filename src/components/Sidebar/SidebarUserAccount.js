import { SidebarList } from "./SidebarList"

export const SidebarUserAccount = () => {
  return (
    <>
      <div className="menu-page__title">Account</div>
      <SidebarList
        list={[
          {to: "/account/personal_information", title: "Personal Information"},
          {to: "/account/wedding_information", title: "Wedding Information"},
          {to: "/account/security", title: "Security"}
        ]}
      />
    </>
  )
}