import React, { useState } from 'react'

import { ReactComponent as CheckBoxIcon } from "../../../../assets/icons/checkbox.svg"

import cls from "./CheckBox.module.scss"

const CheckBox = ({ isChecked, handleClick }) => {

    return (
        <span className={cls.checkBox}>
            <input
                onChange={handleClick}
                type="checkbox"
                className={cls.checkBoxInput} />
            {isChecked
                ? <CheckBoxIcon className={cls.checkBoxIcon} />
                : <div className={cls.checkBoxUnchecked}></div>}
        </span>
    )
}

export default CheckBox