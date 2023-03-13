import React from 'react'
import { classNames } from '../../../../utils/classNames'
import Loader from '../Loader/Loader'

import cls from "./Button.module.scss"

const Button = ({ children, className, isLoading = false, disabled = false, ...props }) => {

    return (
        <button
            className={classNames(cls.btn, { [cls.disabled]: disabled }, [className])}
            {...props}
        >
            {isLoading && <Loader />}
            <span className={classNames("", { [cls.notVisible]: isLoading })}>{children}</span></button>
    )
}

export default Button