import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PageHeader from '../../../components/Admin/UI/PageHeader/PageHeader'
import PaginationBar from '../../../components/Admin/UI/PaginationBar/PaginationBar'
import VendorsList from '../../../components/Admin/Vendors/VendorsList/VendorsList'
import { getAllVendorsForAdminAction } from '../../../Store/Actions/Admin/getAllVendorsForAdminAction'


import cls from "./Vendors.module.scss"

const Vendors = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const token = localStorage.getItem("token")
    dispatch(getAllVendorsForAdminAction(token))
  }, [])

  const vendors = useSelector(state => state.vendors.vendors)

  return (
    <div className={cls.vendors}>
      <PageHeader>Vendors</PageHeader>
      <VendorsList vendors={vendors} />
      <PaginationBar />
    </div>
  )
}

export default Vendors