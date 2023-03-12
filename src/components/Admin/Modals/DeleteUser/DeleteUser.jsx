import React from 'react'
import ModalMiddleContent from '../../../UI/Modal/ModalMiddleContent'

import Button from "../../../Admin/UI/Button/Button"

import cls from "./DeleteUser.module.scss"
import { useContext } from 'react'
import { ModalContext } from '../../../../context/ModalContext'

const DeleteUser = ({ callback, plural = false }) => {
    const modal = useContext(ModalContext)

    const handleDelete = () => {
        modal.destroy()
        callback()
    }

    return (
        <ModalMiddleContent>
            <div className={cls.deleteHeader}>
                <h4>
                    {plural
                        ? "Delete users"
                        : "Delete user"
                    }
                </h4>
            </div>
            <div className={cls.deleteBody}>
                {plural
                    ? "Are you sure you want to delete selected users?"
                    : "Are you sure you want to delete user?"
                }
            </div>
            <div className={cls.deleteFooter}>
                <Button className={cls.deleteFooterDelete} onClick={handleDelete}>Delete</Button>
                <Button className={cls.deleteFooterCancel} onClick={modal.destroy}>Cancel</Button>
            </div>
        </ModalMiddleContent>
    )
}

export default DeleteUser