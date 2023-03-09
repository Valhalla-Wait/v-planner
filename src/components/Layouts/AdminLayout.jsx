import React, { useContext, useLayoutEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { ThemeContext } from '../../context/ThemeContext'
import Header from '../Admin/Header/Header'
import Sidebar from '../Admin/Sidebar/Sidebar'

import cls from "./AdminLayout.module.scss"

const Layout = () => {
  const theme = useContext(ThemeContext);

    useLayoutEffect(() => {
        theme.setAdmin();
        return theme.setThemeBeforeAdmin
    }, [theme])

    return (
        <div className={cls.layout}>
            <Sidebar />
            <div className={cls.main}>
                <Header />
                <div className={cls.content}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Layout