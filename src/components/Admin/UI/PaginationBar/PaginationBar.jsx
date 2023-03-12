import React from 'react'

import cls from "./PaginationBar.module.scss"
import PaginationColtrol from './PaginationControl/PaginationControl'
import PaginationLimitPicker from './PaginationLimitPicker/PaginationLimitPicker'

const PaginationBar = () => {
    return (
        <div className={cls.pagination}>
            <PaginationLimitPicker />
            <div className={cls.paginationInfo}>1-5 of 106</div>
            <PaginationColtrol />
        </div>
    )
}

export default PaginationBar