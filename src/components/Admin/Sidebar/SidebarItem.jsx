import React, { useContext } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { SidebarContext } from '../../../context/SidebarContext'
import { classNames } from '../../../utils/classNames'

import cls from "./Sidebar.module.scss"

const SidebarItem = ({ to, title, Icon }) => {
    const { pathname } = useLocation()
    const sidebar = useContext(SidebarContext)

    const handleNavigation = () => {
        sidebar.destroy()
    }

    return (
        <li>
            <NavLink
                to={to}
                className={cls.sidebarLink}
                onClick={handleNavigation}
            >
                <div className={classNames(cls.sidebarItem, { [cls.sidebarItemActive]: pathname === to }, [])}>
                    <Icon className={cls.sidebarIcon} />{title}
                </div>
            </NavLink>
        </li>
    )
}

export default SidebarItem