import React, { useContext, useState } from 'react'
import Button from '../../UI/Button/Button'

import { classNames } from '../../../../utils/classNames'
import CheckBox from '../../UI/CheckBox/CheckBox'

import cls from "./ClientsItem.module.scss"
import { ModalContext } from '../../../../context/ModalContext'
import { formatDate } from '../../../../utils/formatDate'
import DeleteModal from '../../Modals/DeleteModal/DeleteModal'
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
        const headerText = "Delete Client"
        const bodyText = "Are you sure you want to delete client?"
        modal.start()
        modal.setContent(<DeleteModal callback={deleteUser} header={headerText} body={bodyText} />)
    }

    const handleClick = () => {
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