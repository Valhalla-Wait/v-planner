import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ServiceTypesList from '../../../components/Admin/Services/ServiceTypesList/ServiceTypesList'
import PageHeader from '../../../components/Admin/UI/PageHeader/PageHeader'
import PaginationBar from '../../../components/Admin/UI/PaginationBar/PaginationBar'
import { ReactComponent as AddIcon } from "../../../assets/icons/add.svg"
import { getAllServiceTypesAction } from '../../../Store/Actions/Admin/getAllServiceTypesAction'


import cls from "./Services.module.scss"
import Button from '../../../components/Admin/UI/Button/Button'
import { ModalContext } from '../../../context/ModalContext'
import ServiceTypeModal from '../../../components/Admin/Modals/ServiceTypeModal/ServiceTypeModal'
import { addServiceTypeAction } from '../../../Store/Actions/Admin/addServiceTypeAction'

const Services = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const token = localStorage.getItem("token")
    dispatch(getAllServiceTypesAction(token))
  }, [])
  const modal = useContext(ModalContext)
  const [isAdding, setIsAdding] = useState(false)
  const serviceTypes = useSelector(state => state.services.serviceTypes)

  const addServiceType = (generalService) => {
    setIsAdding(true);
    const token = localStorage.getItem("token")
    const newGeneralService = {
      name: generalService.name,
    }
    dispatch(addServiceTypeAction(token, newGeneralService))
      .finally(() => {
        setIsAdding(false)
      })
  }

  const openAddModal = () => {
    const headerText = "Add Type of Service"
    const footerText = "Add"
    modal.start()
    modal.setContent(<ServiceTypeModal callback={addServiceType} header={headerText} footer={footerText} />)
  }

  return (
    <div className={cls.services}>
      <PageHeader className={cls.servicesHeader}>
        Services
        <Button
          className={cls.servicesAddBtn}
          isLoading={isAdding}
          onClick={openAddModal}
        ><AddIcon /></Button>
      </PageHeader>
      <ServiceTypesList serviceTypes={serviceTypes} />
      <PaginationBar />
    </div>
  )
}

export default Services