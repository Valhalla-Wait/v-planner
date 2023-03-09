import React from 'react'

import cls from "./Sidebar.module.scss"
import SidebarList from './SidebarList'

const Sidebar = () => {
    return (
        <div className={cls.sidebar}>
            <div className={cls.sidebarLogo}>Dashboard</div>
            <SidebarList />
        </div >
    )
}

export default Sidebar