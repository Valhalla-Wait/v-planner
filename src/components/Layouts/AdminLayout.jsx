import React, { useLayoutEffect } from 'react'
import { Outlet } from 'react-router-dom'
import useTheme from '../../hooks/useTheme'

const Layout = () => {
    const theme = useTheme()

    useLayoutEffect(() => {
        theme.setAdmin();
    })

    return (
        <div>
            <Outlet />
        </div>
    )
}

export default Layout