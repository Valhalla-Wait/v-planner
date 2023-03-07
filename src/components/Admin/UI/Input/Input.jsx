import React from 'react'

import cls from "./Input.module.scss"

const Input = ({ className, type = "text" }) => {
    return (
        <input type={type} className={[cls.input, className].join(' ')} />
    )
}

export default Input