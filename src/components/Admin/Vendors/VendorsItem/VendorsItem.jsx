import React, { useContext, useState } from 'react'
import Button from '../../UI/Button/Button'

import { classNames } from '../../../../utils/classNames'
import CheckBox from '../../UI/CheckBox/CheckBox'

import cls from "./VendorsItem.module.scss"
import { ModalContext } from '../../../../context/ModalContext'
import DeleteModal from '../../Modals/DeleteModal/DeleteModal'
import { useDispatch } from 'react-redux'
import { deleteVendorByIdAction } from '../../../../Store/Actions/Admin/deleteVendorByIdAction'

const VendorsItem = ({ vendor, isChecked, handleCheck, isDeletingAll }) => {
    const modal = useContext(ModalContext)
    const dispatch = useDispatch()

    const [isDeleting, setIsDeleting] = useState(false)

    const deleteUser = () => {
        const token = localStorage.getItem("token")
        setIsDeleting(true)
        dispatch(deleteVendorByIdAction(token, vendor.id))
            .finally(() => {
                setIsDeleting(false)
            })
    }

    const openModal = () => {
        const headerText = "Delete vendors"
        const bodyText = "Are you sure you want to delete selected vendors"
        modal.start()
        modal.setContent(<DeleteModal callback={deleteUser} header={headerText} body={bodyText} />)
    }

    const handleClick = () => {
        handleCheck(vendor.id, isChecked)
    }

    return (
        <tr>
            <td className={cls.listItem}>
                <CheckBox isChecked={isChecked} handleClick={handleClick} />
            </td>
            <td className={classNames(cls.listItem, {}, [cls.listItemBold])}>{vendor.id}</td>
            <td className={cls.listItem}>{vendor.firstName} {vendor.surname}</td>
            <td className={cls.listItem}>{vendor.vendorModel.companyName}</td>
            <td className={cls.listItem}>{vendor.email}</td>
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

export default VendorsItem