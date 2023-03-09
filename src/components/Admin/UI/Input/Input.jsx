import React from 'react'
import { FieldError } from '../../../UI/FieldError'

import { classNames } from '../../../../utils/classNames'

import cls from "./Input.module.scss"

const Input = ({ error, isValid, register = {}, className, type = "text", ...props }) => {

    return (
        <>
            <input
                type={type}
                className={classNames(cls.input, { [cls.notValid]: !isValid }, [className])}
                {...register}
                {...props}
            />
            {error && <FieldError text={error} />}
        </>
    )
}

export default Input