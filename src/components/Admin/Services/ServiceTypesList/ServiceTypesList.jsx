import React from 'react'
import ServiceTypesItem from '../ServiceTypesItem/ServiceTypesItem'

import cls from "./ServiceTypesList.module.scss"

const ServiceTypesList = ({ serviceTypes }) => {
    const headers = ["", "ID", "Title", ""]

    return (
        <table className={cls.serviceTypesList}>
            <thead className={cls.serviceTypesListHeader}>
                <tr>
                    {headers.map((header, i) =>
                        <th className={cls.serviceTypesListHeaderItem} key={i}>{header}</th>
                    )}
                </tr>
            </thead>
            <tbody>
                {serviceTypes.map(serviceType =>
                    <ServiceTypesItem
                        serviceType={serviceType}
                        key={serviceType.id} />
                )}
            </tbody>
        </table>
    )
}

export default ServiceTypesList