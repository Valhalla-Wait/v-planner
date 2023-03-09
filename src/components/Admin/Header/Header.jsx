import React from 'react'
import Button from '../UI/Button/Button'

import { ReactComponent as ExitIcon } from "../../../assets/icons/exit.svg"

import cls from "./Header.module.scss"
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../Store/Reducers/UserReducer'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const { surname, firstName } = useSelector(state => state.userInfo.userData)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('token')
        dispatch(logout())
        navigate('/')
    }

    return (
        <div className={cls.header}>
            <div className={cls.headerAdminName}>Hi, {firstName} {surname}</div>
            <Button className={cls.headerLogoutBtn} onClick={handleLogout}>
                <ExitIcon className={cls.headerLogoutBtnIcon} />
                Logout
            </Button>
        </div>
    )
}

export default Header