import React from 'react'
import { ReactComponent as ArrowIcon } from "../../../../../assets/icons/arrow.svg"

import cls from "./PaginationLimitPicker.module.scss"

const PaginationLimitPicker = () => {
  return (
    <div className={cls.limitPicker}>
      <ul className={cls.limitPickerContent}>
        <li className={cls.limitPickerContentItem}>10</li>
        <li className={cls.limitPickerContentItem}>25</li>
        <li className={cls.limitPickerContentItem}>50</li>
      </ul>
      <button className={cls.limitPickerBtn}>5 <ArrowIcon className={cls.limitPageBtnIcon}/></button>
    </div>
  )
}

export default PaginationLimitPicker