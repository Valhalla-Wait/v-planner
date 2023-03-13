import React, { useContext, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ModalContext } from '../../../../context/ModalContext'
import { deleteServiceTypeByIdAction } from '../../../../Store/Actions/Admin/deleteServiceTypeByIdAction'
import Button from '../../UI/Button/Button'
import DeleteModal from '../../Modals/DeleteModal/DeleteModal'
import { ReactComponent as AddIcon } from "../../../../assets/icons/add.svg"
import { ReactComponent as EditIcon } from "../../../../assets/icons/edit.svg"
import { ReactComponent as DeleteIcon } from "../../../../assets/icons/delete.svg"
import { ReactComponent as ArrowIcon } from "../../../../assets/icons/arrow.svg"
import { classNames } from '../../../../utils/classNames'
import cls from "./ServiceTypesItem.module.scss"
import GeneralServiceModal from '../../Modals/GeneralServiceModal/GeneralServiceModal'
import { addGeneralServiceAction } from '../../../../Store/Actions/Admin/addGeneralServiceAction'
import ServiceTypeModal from '../../Modals/ServiceTypeModal/ServiceTypeModal'
import GeneralServicesList from '../GeneralServicesList/GeneralServicesList'
import { editServiceTypeAction } from '../../../../Store/Actions/Admin/editServiceTypeAction'


const ServiceTypesItem = ({ serviceType }) => {
    const modal = useContext(ModalContext)
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [isAdding, setIsAdding] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)
    const [hasExpanded, setHasExpanded] = useState(false)

    const addGeneralService = (generalService) => {
        const token = localStorage.getItem("token")
        setIsAdding(true);
        const newGeneralService = {
            name: generalService.name,
            price: generalService.price,
            description: "",
            serviceTypeId: serviceType.id,
        }
        dispatch(addGeneralServiceAction(token, newGeneralService))
            .finally(() => {
                setIsAdding(false)
            })
    }

    const editServiceType = ({ name }) => {
        const token = localStorage.getItem("token")
        const updatedData = {
            id: serviceType.id,
            name: name,
        }
        setIsEditing(true)
        dispatch(editServiceTypeAction(token, updatedData))
            .finally(() => {
                setIsEditing(false)
            })
    }

    const deleteService = () => {
        const token = localStorage.getItem("token")
        setIsDeleting(true)
        dispatch(deleteServiceTypeByIdAction(token, serviceType.id))
            .finally(() => {
                setIsDeleting(false)
            })
    }

    const openAddModal = () => {
        const headerText = "Add Service"
        const footerText = "Add"
        modal.start()
        modal.setContent(<GeneralServiceModal callback={addGeneralService} header={headerText} footer={footerText} />)
    }

    const openEditModal = () => {
        const headerText = "Edit Service"
        const footerText = "Edit"
        modal.start()
        modal.setContent(<ServiceTypeModal callback={editServiceType} header={headerText} footer={footerText} name={serviceType.name} />)
    }

    const openDeleteModal = () => {
        const headerText = "Delete service type"
        const bodyText = "Are you sure you want to delete service type?"
        modal.start()
        modal.setContent(<DeleteModal callback={deleteService} header={headerText} body={bodyText} id={serviceType.id} />)
    }

    const handleExpand = () => {
        setIsExpanded((prev) => !prev)
        setHasExpanded(true)
    }

    return (
        <>
            <tr>
                <td className={classNames(cls.listItem, { [cls.expanded]: isExpanded }, [cls.listItemArrow])}>
                    <Button
                        className={classNames(cls.listItemBtn, { [cls.expanded]: isExpanded }, [])}
                        onClick={handleExpand}
                        isLoading={isLoading}
                    >
                        <ArrowIcon />
                    </Button>
                </td>
                <td className={classNames(cls.listItem, { [cls.expanded]: isExpanded }, [cls.listItemBold])}>{serviceType.id}</td>
                <td className={classNames(cls.listItem, { [cls.expanded]: isExpanded })}>{serviceType.name}</td>
                <td className={classNames(cls.listItem, { [cls.expanded]: isExpanded })}>
                    <Button
                        className={classNames(cls.listItemBtn, { [cls.disabled]: isAdding }, [cls.listItemAddBtn])}
                        onClick={openAddModal}
                        isLoading={isAdding}
                    >
                        <AddIcon />
                    </Button>
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
            <tr>
                <td className={classNames(cls.listItem, { [cls.expanded]: isExpanded }, [cls.listItemTable])} colSpan="4">
                    {hasExpanded && <GeneralServicesList serviceTypeId={serviceType.id} setIsLoading={setIsLoading} />}
                </td>
            </tr>
        </>
    )
}

export default ServiceTypesItem