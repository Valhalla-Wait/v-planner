import React, { Fragment, useContext, useState } from "react"
import Button from "../components/UI/Button"
import { ThemeContext } from "../context/ThemeContext"
import { customReactSelectOptions } from "../utils/customReactSelectOptions"
import Select from "react-select"

export default function Reports() {

  const [quotes, setQuotes] = useState([
    {
      id: 1,
      company: {id: 1, name: "Vendor", type: "Wedding Bakey", avatar: "/assets/images/vendor.png"},
      services: [{title: "Service Name", price: 5000}],
      date: "Dec 10, 2022",
      price: 10000,
      status: 3
    },
    {
      id: 2,
      company: {id: 1, name: "Vendor", type: "Wedding Bakey", avatar: "/assets/images/vendor.png"},
      services: [{title: "Service Name", price: 1000}, {title: "Service Name", price: 3000}],
      date: "Dec 10, 2022",
      price: 10000,
      status: 4
    },
    {
      id: 3,
      company: {id: 1, name: "Vendor", type: "Wedding Bakey", avatar: "/assets/images/vendor.png"},
      services: [{title: "Service Name", price: 2000}, {title: "Service Name", price: 8000}, {title: "Service Name", price: 2500}, {title: "Service Name", price: 3000}, {title: "Service Name", price: 5500}, {title: "Service Name", price: 500}, {title: "Service Name", price: 10000}, {title: "Service Name", price: 15000}, {title: "Service Name", price: 6300}, {title: "Service Name", price: 4700}],
      date: "Dec 10, 2022",
      price: 10000,
      status: 4
    },
    {
      id: 4,
      company: {id: 1, name: "Vendor", type: "Wedding Bakey", avatar: "/assets/images/vendor.png"},
      services: [{title: "Service Name", price: 1000}, {title: "Service Name", price: 3000}],
      date: "Dec 10, 2022",
      price: 10000,
      status: 3
    },
    {
      id: 5,
      company: {id: 1, name: "Vendor", type: "Wedding Bakey", avatar: "/assets/images/vendor.png"},
      services: [{title: "Service Name", price: 2000}, {title: "Service Name", price: 500}, {title: "Service Name", price: 800}, {title: "Service Name", price: 7100}],
      date: "Dec 10, 2022",
      price: 10000,
      status: 5
    }
  ])

  const theme = useContext(ThemeContext)

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
    },
    5: {
      title: "Awaiting Acceptance",
      class: "await"
    }
  }

  return (
    <section className="reports shadow">
      <h3 className="reports__title">Reports</h3>
      <div className="reports__header">
        <div className="reports__btns">
          <Button
            className="btn btn-light active"
          >Sale Reports</Button>
          <Button
            className="btn btn-accent"
          >Quotetion reports</Button>
        </div>
        <div className="reports__filter">
          <Select
            placeholder="Period"
            options={[]}
            isClearable={false}
            isSearchable={false}
            {...customReactSelectOptions(theme.get())}
          />
          <Select
            placeholder="Status sorting"
            options={[]}
            isClearable={false}
            isSearchable={false}
            {...customReactSelectOptions(theme.get())}
          />
        </div>
      </div>
      <div className="reports__table">
        <div className="table">
          <div className="theader">
            <div className="table__header cell-company">Company Name</div>
            <div className="table__header cell-service">Services</div>
            <div className="table__header cell-date">Date</div>
            <div className="table__header cell-price">Total Price</div>
            <div className="table__header cell-status">Status</div>
          </div>
          {
            quotes.map(quote => (
              <Fragment  key={quote.id}>
                <div className={ quote.open ? "table__row active" : "table__row" }>
                  <div className="table__cell cell-company">
                    <div className="cell-company__content">
                      <div className="cell-company__img">
                        <img src={quote.company.avatar} alt={quote.company.name} />
                      </div>
                      <div className="cell-company__info">
                        <div className="cell-company__name">{ quote.company.name }</div>
                        <div className="cell-company__type">Viewed 13h ago</div>
                      </div>
                    </div>
                  </div>
                  <div className="table__cell cell-service">
                    <div className="cell-service__content">{ quote.services.length } Services</div>
                  </div>
                  <div className="table__cell cell-date">
                    <div className="cell-date__content">
                      <div className="cell-date__text">{ quote.date }</div>
                    </div>
                  </div>
                  <div className="table__cell cell-price">
                    <div className="cell-price__content">{ quote.price }$</div>
                  </div>
                  <div className="table__cell cell-status">
                    <div className="cell-status__content">
                      <span className={ statusData[quote.status].class }>{ statusData[quote.status].title }</span>
                    </div>
                  </div>
                </div>
              </Fragment>
            ))
          }
        </div>
      </div>
    </section>
  )
}