import React, { useContext, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ModalContext } from '../../../../context/ModalContext'
import { deleteClientByIdAction } from '../../../../Store/Actions/Admin/deleteClientByIdAction'
import { classNames } from '../../../../utils/classNames'
import DeleteUser from '../../Modals/DeleteUser/DeleteUser'
import Button from '../../UI/Button/Button'
import CheckBox from '../../UI/CheckBox/CheckBox'
import ClientsItem from '../ClientsItem/ClientsItem'

import cls from "./ClientsList.module.scss"

const ClientsList = ({ clients }) => {
    const dispatch = useDispatch()
    const modal = useContext(ModalContext)

    const headers = ["ID", "Name", "Wedding date", "Email"]
    const [isDeletingAll, setisDeletingAll] = useState(false);
    const [selectedIdList, setSelectedIdList] = useState([])

    const handleCheck = (id, checked) => {
        console.log(id, checked)
        if (checked) {
            setSelectedIdList((prev) => prev.filter(item => item !== id));
        } else {
            setSelectedIdList((prev) => [...prev, id]);
        }
    }

    const handleCheckAll = () => {
        if (selectedIdList.length) {
            setSelectedIdList([])
        } else {
            setSelectedIdList(clients.map(vendor => vendor.id))
        }
    }

    const deleteAll = () => {
        const token = localStorage.getItem('token')
        setisDeletingAll(true)
        Promise.all(selectedIdList.map(id => {
            return dispatch(deleteClientByIdAction(token, id))
        })).finally(() => {
            setisDeletingAll(false)
        })
    }

    const openModal = () => {
        modal.start()
        modal.setContent(<DeleteUser callback={deleteAll} plural={true} />)
    }

    return (
        <table className={cls.clientsList}>
            <thead className={cls.clientsListHeader}>
                <tr>
                    <th className={cls.clientsListHeaderItem}>
                        <CheckBox isChecked={selectedIdList.length} handleClick={handleCheckAll} />
                    </th>
                    {headers.map(header =>
                        <th className={cls.clientsListHeaderItem} key={header}>{header}</th>
                    )}
                    <th className={cls.clientsListHeaderItem}>
                        {selectedIdList.length > 0
                            && <Button
                                className={classNames(cls.clientsListDelete, { [cls.disabled]: isDeletingAll })}
                                isLoading={isDeletingAll}
                                onClick={openModal}
                            >
                                Delete
                            </Button>
                        }
                    </th>
                </tr>
            </thead>
            <tbody>
                {clients.map(client =>
                    <ClientsItem
                        client={client}
                        isChecked={selectedIdList.includes(client.id)}
                        handleCheck={handleCheck}
                        isDeletingAll={isDeletingAll}
                        key={client.id} />
                )}

            </tbody>
        </table>
    )
}

export default ClientsList