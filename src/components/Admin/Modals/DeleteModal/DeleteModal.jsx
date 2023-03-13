import React from 'react'
import ModalMiddleContent from '../../../UI/Modal/ModalMiddleContent'

import Button from "../../UI/Button/Button"

import cls from "./DeleteModal.module.scss"
import { useContext } from 'react'
import { ModalContext } from '../../../../context/ModalContext'

const DeleteModal = ({ callback, header, body }) => {
    const modal = useContext(ModalContext)

    const handleDelete = () => {
        modal.destroy()
        callback()
    }

    return (
        <ModalMiddleContent>
            <div className={cls.header}>
                <h4>
                    {header}
                </h4>
            </div>
            <div className={cls.body}>
                {body}
            </div>
            <div className={cls.footer}>
                <Button className={cls.footerDeleteBtn} onClick={handleDelete}>Delete</Button>
                <Button className={cls.footerCancelBtn} onClick={modal.destroy}>Cancel</Button>
            </div>
        </ModalMiddleContent>
    )
}

export default DeleteModal