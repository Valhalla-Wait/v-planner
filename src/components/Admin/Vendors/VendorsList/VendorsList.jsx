import React, { useState } from 'react'
import Button from '../../UI/Button/Button'
import CheckBox from '../../UI/CheckBox/CheckBox'
import VendorsItem from '../VendorsItem/VendorsItem'

import cls from "./VendorsList.module.scss"
import { classNames } from '../../../../utils/classNames'
import { useDispatch } from 'react-redux'
import { deleteVendorByIdAction } from '../../../../Store/Actions/Admin/deleteVendorByIdAction'

const VendorsList = ({ vendors }) => {
    const dispatch = useDispatch()

    const headers = ["ID", "Name", "Company name", "Email"]
    const [isDeletingAll, setisDeletingAll] = useState(false);
    const [selectedIdList, setSelectedIdList] = useState([])

    const handleCheck = (id, checked) => {
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
            setSelectedIdList(vendors.map(vendor => vendor.id))
        }
    }

    const deleteAll = () => {
        const token = localStorage.getItem('token')
        setisDeletingAll(true)
        Promise.all(selectedIdList.map(id => {
            return dispatch(deleteVendorByIdAction(token, id))
        })).finally(() => {
            setisDeletingAll(false)
        })
    }

    return (
        <table className={cls.vendorsList}>
            <thead className={cls.vendorsListHeader}>
                <tr>
                    <th className={cls.vendorsListHeaderItem}>
                        <CheckBox isChecked={selectedIdList.length} handleClick={handleCheckAll} />
                    </th>
                    {headers.map(header =>
                        <th className={cls.vendorsListHeaderItem}
                            key={header}
                        >
                            {header}
                        </th>
                    )}
                    <th className={cls.vendorsListHeaderItem}>
                        {selectedIdList.length > 0
                            && <Button
                                className={classNames(cls.vendorsListDelete, { [cls.disabled]: isDeletingAll })}
                                isLoading={isDeletingAll}
                                onClick={deleteAll}
                            >
                                Delete
                            </Button>
                        }
                    </th>
                </tr>
            </thead>
            <tbody>
                {vendors.map(vendor =>
                    <VendorsItem
                        vendor={vendor}
                        isChecked={selectedIdList.includes(vendor.id)}
                        handleCheck={handleCheck}
                        isDeletingAll={isDeletingAll}
                        key={vendor.id}
                    />
                )}

            </tbody>
        </table>
    )
}

export default VendorsList