import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PageHeader from '../../../components/Admin/UI/PageHeader/PageHeader'
import PaginationBar from '../../../components/Admin/UI/PaginationBar/PaginationBar'
import ClientsList from '../../../components/Admin/Clients/ClientsList/ClientsList'

import { getAllClientsForAdminAction } from '../../../Store/Actions/Admin/getAllClientsForAdminAction'


import cls from "./Clients.module.scss"

const Clients = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const token = localStorage.getItem("token")
    dispatch(getAllClientsForAdminAction(token))
  }, [])

  const clients = useSelector(state => state.clients.clients)
  return (
    <div className={cls.vendors}>
      <PageHeader>Clients</PageHeader>
      <ClientsList clients={clients} />
      <PaginationBar />
    </div>
  )
}

export default Clients