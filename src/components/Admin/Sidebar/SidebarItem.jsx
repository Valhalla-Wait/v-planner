import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { classNames } from '../../../utils/classNames'

import cls from "./Sidebar.module.scss"

const SidebarItem = ({ to, title, Icon }) => {
    const { pathname } = useLocation()
    return (
        <li className={classNames(cls.sidebarItem, { [cls.sidebarItemActive]: pathname === to }, [])}>
            <Icon className={cls.sidebarIcon} />
            <NavLink to={to} className={cls.sidebarLink}>{title}</NavLink>
        </li>
    )
}

export default SidebarItem