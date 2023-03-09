import React, { useContext } from 'react'
import { SidebarContext } from '../../../context/SidebarContext'
import { classNames } from '../../../utils/classNames'

import cls from "./Sidebar.module.scss"
import SidebarList from './SidebarList'

const Sidebar = () => {
    const sidebar = useContext(SidebarContext)

    return (
        <>
            <div className={classNames(cls.sidebar, { [cls.sidebarActive]: sidebar.isActive })}>
                <div className={cls.sidebarLogo}>Dashboard</div>
                <SidebarList />
            </div >
            <div className={classNames(cls.background, { [cls.backgroundActive]: sidebar.isActive })} onClick={sidebar.toggle}></div>
        </>
    )
}

export default Sidebar