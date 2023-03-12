import React from 'react'

import { ReactComponent as ArrowIcon } from "../../../../../assets/icons/arrow.svg"

import { classNames } from '../../../../../utils/classNames'

import cls from './PaginationControl.module.scss'

const PaginationColtrol = () => {
    return (
        <div className={cls.control}>
            <button className={classNames(cls.controlBtn, {}, [cls.controlBtnLeft])}>
                <ArrowIcon />
            </button>
            <button className={classNames(cls.controlBtn, {}, [cls.controlBtnRight])}>
                <ArrowIcon />
            </button>
        </div>
    )
}

export default PaginationColtrol