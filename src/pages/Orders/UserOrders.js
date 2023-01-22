import React, { Fragment, useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from "../../components/UI/Button"
import useDevice from "../../hooks/useDevice"

export default function UserOrders() {

  const [orders, setOrders] = useState([
    {
      id: 1,
      company: {id: 1, name: "Vendor", type: "Wedding Bakey", avatar: "/assets/images/vendor.png"},
      services: [{title: "Service Name", price: 5000}],
      date: "Dec 10, 2022",
      price: 10000,
      status: 4
    },
    {
      id: 2,
      company: {id: 1, name: "Vendor", type: "Wedding Bakey", avatar: "/assets/images/vendor.png"},
      services: [{title: "Service Name", price: 1000}, {title: "Service Name", price: 3000}],
      date: "Dec 10, 2022",
      price: 10000,
      status: 3
    },
    {
      id: 3,
      company: {id: 1, name: "Vendor", type: "Wedding Bakey", avatar: "/assets/images/vendor.png"},
      services: [{title: "Service Name", price: 2000}, {title: "Service Name", price: 8000}, {title: "Service Name", price: 2500}, {title: "Service Name", price: 3000}, {title: "Service Name", price: 5500}, {title: "Service Name", price: 500}, {title: "Service Name", price: 10000}, {title: "Service Name", price: 15000}, {title: "Service Name", price: 6300}, {title: "Service Name", price: 4700}],
      date: "Dec 10, 2022",
      price: 10000,
      status: 3
    },
    {
      id: 4,
      company: {id: 1, name: "Vendor", type: "Wedding Bakey", avatar: "/assets/images/vendor.png"},
      services: [{title: "Service Name", price: 1000}, {title: "Service Name", price: 3000}],
      date: "Dec 10, 2022",
      price: 10000,
      status: 4
    },
    {
      id: 5,
      company: {id: 1, name: "Vendor", type: "Wedding Bakey", avatar: "/assets/images/vendor.png"},
      services: [{title: "Service Name", price: 2000}, {title: "Service Name", price: 500}, {title: "Service Name", price: 800}, {title: "Service Name", price: 7100}],
      date: "Dec 10, 2022",
      price: 10000,
      status: 3
    }
  ])

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
      <h3 className="orders__title">Quotes and Orders</h3>
      <div className="orders__header">
        <div className="orders__btns">
          <Button
            className="btn btn-light"
            onClick={() => navigate("/quotes")}
          >My Quotes</Button>
          <Button
            className="btn btn-light active"
          >My Orders</Button>
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
            orders.map(order => (
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
                        <img src={order.company.avatar} alt={order.company.name} />
                      </div>
                      <div className="cell-company__info">
                        <div className="cell-company__name">{ order.company.name }</div>
                        <div className="cell-company__type">{ order.company.type }</div>
                      </div>
                    </div>
                  </div>
                  <div className="table__cell cell-service">
                    <div className="cell-service__content">{ order.services.length } Services</div>
                  </div>
                  <div className="table__cell cell-date">
                    <div className="cell-date__content">{ order.date }</div>
                  </div>
                  <div className="table__cell cell-price">
                    <div className="cell-price__content">{ order.price }$</div>
                  </div>
                  <div className="table__cell cell-status">
                    <div className="cell-status__content">
                      <span className={ statusData[order.status].class }>{ statusData[order.status].title }</span>
                    </div>
                  </div>
                  <div className="table__cell cell-chat">
                    <div className="cell-chat__content">
                      <i className="icon-chat-outline"></i>
                      <span className="cell-chat__text">Chat</span>
                    </div>
                  </div>
                </div>
                <div className="table__row">
                  <div className="table__cell"></div>
                  <div className="table__cell"></div>
                  <div className="table__cell">
                    {
                      device.isMobile && <div className="cell-service__text">{ order.services.length } Services</div>
                    }
                    {
                      order.services.map((service, idx) => <div className="cell-service__text" key={idx}>{service.title}</div>)
                    }
                  </div>
                  <div className="table__cell">
                    <div className="cell-date__text">
                      {
                        device.isMobile && <div className="cell-date__text">{ order.date }</div>
                      }
                    </div>
                  </div>
                  <div className="table__cell">
                    {
                      device.isMobile && <div className="cell-price__text">{ order.price }$</div>
                    }
                    {
                      order.services.map((service, idx) => <div className="cell-price__text" key={idx}>{service.price}$</div>)
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