import React, { useLayoutEffect } from 'react'
import { Outlet } from 'react-router-dom'
import useTheme from '../../hooks/useTheme'
import Sidebar from '../Admin/Sidebar/Sidebar'

const Layout = () => {
    const theme = useTheme()

    useLayoutEffect(() => {
        theme.setAdmin();
    })

    return (
        <div>
            <Sidebar />
            <Outlet />
        </div>
    )
}

export default Layout