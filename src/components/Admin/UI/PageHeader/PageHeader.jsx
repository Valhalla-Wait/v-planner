import React from 'react'

import { classNames } from '../../../../utils/classNames'

import cls from "./PageHeader.module.scss"

const PageHeader = ({ children, className }) => {
    return (
        <div className={classNames(cls.pageHeader, {}, [className])}>
            {children}
        </div>
    )
}

export default PageHeader