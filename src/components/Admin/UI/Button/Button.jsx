import React from 'react'
import { classNames } from '../../../../utils/classNames'

import cls from "./Button.module.scss"

const Button = ({ children, className, ...props }) => {
    return (
        <button
            className={classNames(cls.btn, {}, [className])}
            {...props}
        >{children}</button>
    )
}

export default Button