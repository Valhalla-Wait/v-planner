import React, { useContext, useEffect, useState } from 'react'
import Button from '../../UI/Button/Button'
import { ReactComponent as EditIcon } from "../../../../assets/icons/edit.svg"
import { ReactComponent as DeleteIcon } from "../../../../assets/icons/delete.svg"

import cls from "./GeneralServiceItem.module.scss"
import { ModalContext } from '../../../../context/ModalContext'
import DeleteModal from '../../Modals/DeleteModal/DeleteModal'
import { classNames } from '../../../../utils/classNames'
import { useDispatch } from 'react-redux'
import { deleteGeneralServiceByIdAction } from '../../../../Store/Actions/Admin/deleteGeneralServiceByIdAction'
import { editGeneralServiceAction } from '../../../../Store/Actions/Admin/editGeneralServiceAction'
import GeneralServiceModal from '../../Modals/GeneralServiceModal/GeneralServiceModal'

const GeneralServiceItem = ({ generalService }) => {
    const modal = useContext(ModalContext)
    const dispatch = useDispatch()
    const [isEditing, setIsEditing] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const editService = ({ name, price }) => {
        setIsEditing(true)
        const token = localStorage.getItem("token")
        const updatedService = {
            id: generalService.id,
            name: name,
            price: price,
            serviceTypeId: generalService.serviceType.id,
            description: ""
        }
        dispatch(editGeneralServiceAction(token, updatedService, generalService.serviceType.id))
            .finally(() => setIsEditing(false))
    }

    const deleteService = () => {
        setIsDeleting(true)
        const token = localStorage.getItem("token")
        dispatch(deleteGeneralServiceByIdAction(token, generalService.id, generalService.serviceType.id))
            .finally(() => setIsDeleting(false))
    }

    const openEditModal = () => {
        const headerText = "Edit general service"
        const footerText = "Edit"
        modal.start()
        modal.setContent(<GeneralServiceModal callback={editService} header={headerText} footer={footerText} name={generalService.name} price={generalService.price} />)
    }

    const openDeleteModal = () => {
        const headerText = "Delete general service"
        const bodyText = "Are you sure you want to delete general service?"
        modal.start()
        modal.setContent(<DeleteModal callback={deleteService} header={headerText} body={bodyText} />)
    }

    return (
        <tr>
            <td className={cls.listItem} >{generalService.id}</td>
            <td className={cls.listItem} >{generalService.name}</td>
            <td className={cls.listItem} >{generalService.price}</td>
            <td className={cls.listItem} >
                <Button
                    className={classNames(cls.listItemBtn, { [cls.disabled]: isEditing }, [cls.listItemEditBtn])}
                    onClick={openEditModal}
                    isLoading={isEditing}
                >
                    <EditIcon />
                </Button>
                <Button
                    className={classNames(cls.listItemBtn, { [cls.disabled]: isDeleting }, [cls.listItemDeleteBtn])}
                    onClick={openDeleteModal}
                    isLoading={isDeleting}
                >
                    <DeleteIcon />
                </Button>
            </td>
        </tr>
    )
}



export default GeneralServiceItem