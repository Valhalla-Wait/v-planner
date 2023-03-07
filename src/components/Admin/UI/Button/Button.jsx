import React from 'react'

import cls from "./Button.module.scss"

const Button = ({ children, className }) => {
    return (
        <button className={[cls.btn, className].join(' ')}>{children}</button>
    )
}

export default Button