import React, { useContext, useState } from 'react'
import Button from '../../UI/Button/Button'

import { classNames } from '../../../../utils/classNames'
import CheckBox from '../../UI/CheckBox/CheckBox'

import cls from "./ClientsItem.module.scss"
import { ModalContext } from '../../../../context/ModalContext'
import { formatDate } from '../../../../utils/formatDate'
import DeleteUser from '../../Modals/DeleteUser/DeleteUser'
import { useDispatch } from 'react-redux'
import { deleteClientByIdAction } from '../../../../Store/Actions/Admin/deleteClientByIdAction'

const ClientsItem = ({ client, isChecked, handleCheck, isDeletingAll }) => {
    const modal = useContext(ModalContext)
    const dispatch = useDispatch()
    const [isDeleting, setIsDeleting] = useState(false)

    const deleteUser = () => {
        const token = localStorage.getItem("token")
        setIsDeleting(true)
        dispatch(deleteClientByIdAction(token, client.id))
            .finally(() => {
                setIsDeleting(false)
            })
    }

    const openModal = () => {
        modal.start()
        modal.setContent(<DeleteUser callback={deleteUser} />)
    }

    const handleClick = () => {
        console.log('cheked')
        handleCheck(client.id, isChecked)
    }

    return (
        <tr>
            <td className={cls.listItem}>
                <CheckBox isChecked={isChecked} handleClick={handleClick} />
            </td>
            <td className={classNames(cls.listItem, {}, [cls.listItemBold])}>{client.id}</td>
            <td className={cls.listItem}>{client.firstName} {client.surname}</td>
            <td className={cls.listItem}>{formatDate(client.clientModel.weddingDate)}</td>
            <td className={cls.listItem}>{client.email}</td>
            <td className={cls.listItem}>
                <Button
                    className={classNames(cls.listItemDeleteBtn, { [cls.disabled]: isDeletingAll || isDeleting })}
                    onClick={openModal}
                    isLoading={isDeleting}
                    disabled={isDeletingAll || isDeleting}
                >Delete</Button>
            </td>
        </tr>
    )
}

export default ClientsItem