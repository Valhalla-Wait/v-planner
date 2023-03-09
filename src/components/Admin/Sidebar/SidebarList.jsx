import React from 'react'
import SidebarItem from './SidebarItem'

import { ReactComponent as DashboardIcon } from "../../../assets/icons/dashboard.svg"
import { ReactComponent as VendorsIcon } from "../../../assets/icons/vendors.svg"
import { ReactComponent as ClientsIcon } from "../../../assets/icons/clients.svg"
import { ReactComponent as ServicesIcon } from "../../../assets/icons/services.svg"

const SidebarList = () => {
    const links = [
        { to: "/admin/dashboard", title: "Dashboard", Icon: DashboardIcon },
        { to: "/admin/vendors", title: "Vendors", Icon: VendorsIcon },
        { to: "/admin/clients", title: "Clients", Icon: ClientsIcon },
        { to: "/admin/services", title: "Services", Icon: ServicesIcon },
    ]

    return (
        <ul>
            {
                links.map(link =>
                    <SidebarItem to={link.to} title={link.title} Icon={link.Icon} key={link.to} />
                )
            }
        </ul>
    )
}

export default SidebarList