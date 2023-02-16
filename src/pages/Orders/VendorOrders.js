import React, { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import Button from "../../components/UI/Button"
import useDevice from "../../hooks/useDevice"
import { getQuotes } from "../../Store/Actions/getAllQuotes"
import { quoteStatuses } from "../../Store/Actions/quoteActions"
import { getFormateDate, listMonths } from "../../utils/getFormatDate"

export default function VendorOrders() {

  const ordersList = useSelector(state => {
    if(state.quotes.quotesList) {
      return state.quotes.quotesList.filter((quote) => quote.status === quoteStatuses.ACCEPTED.value || quote.status === quoteStatuses.DECLINED.value)
    }else{ 
      return null
    }
  })

  const [orders, setOrders] = useState([])

  if((ordersList && ordersList.length) && !orders.length) setOrders(ordersList)

  const dispatch = useDispatch()

  const token = localStorage.getItem("token")

  useEffect(() => {
    if(token) dispatch(getQuotes(token))
  }, [])

  const navigate = useNavigate()
  const device = useDevice()

  const statusData = {
    1: {
      title: "New",
      class: "new"
    },
    2: {
      title: "Viewed",
      class: "viewed"
    },
    3: {
      title: "Accepted",
      class: "accepted"
    },
    4: {
      title: "Declined",
      class: "declined"
    }
  }

  const toggleOpen = id => {
    setOrders(orders.map(order => order.id === id ? {...order, open: !order.open} : order ))
  }

  return (
    <section className="orders shadow">
      <h3 className="orders__title">Orders</h3>
      <div className="orders__header">
        <div className="orders__btns">
          <Button
            className="btn btn-light active"
            onClick={() => navigate("/orders")}
          >All Orders</Button>
          <Button
            className="btn btn-light"
            onClick={() => navigate("/quotes")}
          >All Quotes</Button>
          <Button
            className="btn btn-light"
            onClick={() => navigate("/history")}
          >History</Button>
        </div>
      </div>
      <div className="orders__table">
        <div className="table">
          <div className="theader">
            <div className="table__header cell-arrow"></div>
            <div className="table__header cell-company">Company Name</div>
            <div className="table__header cell-service">Services</div>
            <div className="table__header cell-date">Date</div>
            <div className="table__header">Total Price</div>
            <div className="table__header">Status</div>
            <div className="table__header"></div>
          </div>
          {
            orders && orders.map(order => (
              <Fragment  key={order.id}>
                <div className={ order.open ? "table__row active" : "table__row" }>
                  <div className="table__cell cell-arrow">
                    <div
                      className={ order.open ? "cell-arrow__content active" : "cell-arrow__content" }
                      onClick={() => toggleOpen(order.id)}
                    >
                      <i className="icon-arrow"></i>
                    </div>
                  </div>
                  <div className="table__cell cell-company">
                    <div className="cell-company__content">
                      <div className="cell-company__img">
                        <img src={order.client.clientModel.photoModel.url} alt={order.client.firstName} />
                      </div>
                      <div className="cell-company__info">
                        <div className="cell-company__name">
                          {order.client.firstName} {order.client.surname}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="table__cell cell-service">
                    <div className="cell-service__content">{ order.selectedServices.length } Services</div>
                  </div>
                  <div className="table__cell cell-date">
                    <div className="cell-date__content">{ getFormateDate(order.createDate, listMonths) }</div>
                  </div>
                  <div className="table__cell cell-price">
                    <div className="cell-price__content">{ order.selectedServices.reduce((sum, service) => sum + service.price, 0) }$</div>
                  </div>
                  <div className="table__cell cell-status">
                    <div className="cell-status__content">
                      <span className={ quoteStatuses[order.status].class }>{ quoteStatuses[order.status].title }</span>
                    </div>
                  </div>
                  <div className="table__cell cell-chat">
                  <Link to={`/chat/${order.client.id}`}>
                      <div className="cell-chat__content">
                        <i className="icon-chat-outline"></i>
                        <span className="cell-chat__text">Chat</span>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="table__row">
                  <div className="table__cell"></div>
                  <div className="table__cell"></div>
                  <div className="table__cell">
                    {
                      device.isMobile && <div className="cell-service__text">{ order.selectedServices.length } Services</div>
                    }
                    {
                      order.selectedServices.map((service, idx) => <div className="cell-service__text" key={idx}>{service.name}</div>)
                    }
                  </div>
                  <div className="table__cell">
                    {
                      device.isMobile && <div className="cell-date__text">{ getFormateDate(order.createDate, listMonths) }</div>
                    }
                  </div>
                  <div className="table__cell">
                    {
                      device.isMobile && <div className="cell-price__text">{ order.selectedServices.reduce((sum, service) => sum + service.price, 0) }$</div>
                    }
                    {
                      order.selectedServices.map((service, idx) => <div className="cell-price__text" key={idx}>{service.price}$</div>)
                    }
                  </div>
                  <div className="table__cell"></div>
                  <div className="table__cell"></div>
                </div>
              </Fragment>
            ))
          }
        </div>
      </div>
    </section>
  )
}