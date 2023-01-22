import { SidebarList } from "./SidebarList"

export const SidebarVendorAccount = () => {
  return (
    <>
      <div className="menu-page__title">Account</div>
      <SidebarList
        list={[
          {to: "/account/personal_information", title: "Personal Information"},
          {to: "/account/company_information", title: "Company Information"},
          {to: "/account/service_details", title: "Service Details"},
          {to: "/account/about_company", title: "About Company"},
          {to: "/account/files", title: "Photo and Video"},
          {to: "/account/social_networks", title: "Soсial Networks"},
          {to: "/account/security", title: "Security"}
        ]}
      />
    </>
  )
}