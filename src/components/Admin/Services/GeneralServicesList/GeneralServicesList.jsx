import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGeneralServicesByServiceTypeAction } from '../../../../Store/Actions/Admin/getGeneralServicesByServiceTypeAction'
import GeneralServiceItem from '../GeneralServiceItem/GeneralServiceItem'

import cls from "./GeneralServicesList.module.scss"

const GeneralServicesList = ({ serviceTypeId, setIsLoading }) => {
    const headers = ["ID", "Title", "Price"]
    const dispatch = useDispatch()

    useEffect(() => {
        setIsLoading(true)
        const token = localStorage.getItem('token')
        dispatch(getGeneralServicesByServiceTypeAction(token, serviceTypeId))
        .finally(() => setIsLoading(false))
    }, [])

    const generalServices = useSelector((state) => {
        const serviceType = state.services.serviceTypes.find(serviceType => serviceType.id === serviceTypeId)
        return serviceType.generalServices || []
    })

    return (
        <table className={cls.table}>
            <thead>
                <tr>
                    {headers.map(header =>
                        <th className={cls.tableItem} key={header}>{header}</th>
                    )}
                </tr>
            </thead>
            <tbody>
                {generalServices.map(generalService =>
                    <GeneralServiceItem generalService={generalService} key={generalService.id} />
                )}
            </tbody>
        </table>
    )
}

export default GeneralServicesList