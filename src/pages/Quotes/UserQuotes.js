import React, { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Button from "../../components/UI/Button"
import useDevice from "../../hooks/useDevice"
import { getQuotes } from "../../Store/Actions/getAllQuotes"

export default function UserQuotes() {

  const dispatch = useDispatch()

  const token = useSelector(state => state.userInfo.token)

  useEffect(() => {
    if(token) dispatch(getQuotes(token))
  }, [])

  const quoteList = useSelector(state => state.quotes.quotesList)

  console.log('USER QUOTES', quoteList)

  // const filteredQuotes = quoteList.map(q => )

  const [quotes, setQuotes] = useState([
    {
      id: 1,
      company: {id: 1, name: "Vendor", type: "Wedding Bakey", avatar: "/assets/images/vendor.png"},
      services: [{title: "Service Name", price: 5000}],
      date: "Dec 10, 2022",
      price: 10000,
      status: 1
    },
    {
      id: 2,
      company: {id: 1, name: "Vendor", type: "Wedding Bakey", avatar: "/assets/images/vendor.png"},
      services: [{title: "Service Name", price: 1000}, {title: "Service Name", price: 3000}],
      date: "Dec 10, 2022",
      price: 10000,
      status: 1
    },
    {
      id: 3,
      company: {id: 1, name: "Vendor", type: "Wedding Bakey", avatar: "/assets/images/vendor.png"},
      services: [{title: "Service Name", price: 2000}, {title: "Service Name", price: 8000}, {title: "Service Name", price: 2500}, {title: "Service Name", price: 3000}, {title: "Service Name", price: 5500}, {title: "Service Name", price: 500}, {title: "Service Name", price: 10000}, {title: "Service Name", price: 15000}, {title: "Service Name", price: 6300}, {title: "Service Name", price: 4700}],
      date: "Dec 10, 2022",
      price: 10000,
      status: 2
    },
    {
      id: 4,
      company: {id: 1, name: "Vendor", type: "Wedding Bakey", avatar: "/assets/images/vendor.png"},
      services: [{title: "Service Name", price: 1000}, {title: "Service Name", price: 3000}],
      date: "Dec 10, 2022",
      price: 10000,
      status: 2
    },
    {
      id: 5,
      company: {id: 1, name: "Vendor", type: "Wedding Bakey", avatar: "/assets/images/vendor.png"},
      services: [{title: "Service Name", price: 2000}, {title: "Service Name", price: 500}, {title: "Service Name", price: 800}, {title: "Service Name", price: 7100}],
      date: "Dec 10, 2022",
      price: 10000,
      status: 2
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
    setQuotes(quoteList.map(quote => quote.id === id ? {...quote, open: !quote.open} : quote ))
  }

  useEffect(() => {
    window.addEventListener("scroll", isSticky)
    return () => {
        window.removeEventListener("scroll", isSticky)
    }
  })
    
  const isSticky = (e) => {
    if(device.isMobile){
      const compare = document.querySelector(".quotes__compare")
      const footer = document.querySelector(".footer")
      const scrollTop = window.scrollY
      scrollTop >= (footer.offsetTop - footer.clientHeight - 96) ? compare.classList.add("hidden") : compare.classList.remove("hidden")
    }
  }

  return (
    <section className="quotes shadow">
      <h3 className="quotes__title">Quotes and Orders</h3>
      <div className="quotes__header">
        <div className="quotes__btns">
          <Button
            className="btn btn-light active"
          >My Quotes</Button>
          <Button
            className="btn btn-accent"
            onClick={() => navigate("/orders")}
          >My Orders</Button>
        </div>
        <div className="quotes__compare">
          <Button
            className="btn btn-light btn-compare"
          >Compare <i className="icon-compare"></i></Button>
        </div>
      </div>
      <div className="quotes__table">
        <div className="table">
          <div className="theader">
            <div className="table__header cell-arrow"></div>
            <div className="table__header cell-checkbox"></div>
            <div className="table__header cell-company">Company Name</div>
            <div className="table__header cell-service">Services</div>
            <div className="table__header cell-date">Date</div>
            <div className="table__header cell-price">Total Price</div>
            <div className="table__header cell-status">Status</div>
            <div className="table__header cell-chat"></div>
          </div>
          {
            quoteList.map(quote => (
              <Fragment  key={quote.id}>
                <div className={ quote.open ? "table__row active" : "table__row" }>
                  <div className="table__cell cell-arrow">
                    <div
                      className={ quote.open ? "cell-arrow__content active" : "cell-arrow__content" }
                      onClick={() => toggleOpen(quote.id)}
                    >
                      <i className="icon-arrow"></i>
                    </div>
                  </div>
                  <div className="table__cell cell-checkbox">
                    <div className="cell-checkbox__content">
                      <label className="check option">
                        <input className="check__input" type="checkbox" />
                        <span className="check__box"></span>
                      </label>
                    </div>
                  </div>
                  <div className="table__cell cell-company">
                    <div className="cell-company__content">
                      <div className="cell-company__img">
                        <img src={quote.vendor.photos[0].url} alt={quote.vendor.companyName} />
                      </div>
                      <div className="cell-company__info">
                        <div className="cell-company__name">{ quote.vendor.companyName }</div>
                        <div className="cell-company__type">{ quote.vendor.companyName }</div>
                      </div>
                    </div>
                  </div>
                  <div className="table__cell cell-service">
                    <div className="cell-service__content">{ quote.vendor.services.length } Services</div>
                  </div>
                  <div className="table__cell cell-date">
                    <div className="cell-date__content">
                      {
                        !device.isMobile && <div className="cell-date__text">{ quote.date }</div>
                      }
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
                  <div className="table__cell"></div>
                  <div className="table__cell">
                    {
                      device.isMobile && <div className="cell-service__text">{ quote.services.length } Services</div>
                    }
                    {
                      quote.services.map((service, idx) => <div className="cell-service__text" key={idx}>{service.title}</div>)
                    }
                  </div>
                  <div className="table__cell">
                    <div className="cell-date__text">{ device.isMobile && quote.date }</div>
                  </div>
                  <div className="table__cell">
                    {
                      device.isMobile && <div className="cell-price__text">{ quote.price }$</div>
                    }
                    {
                      quote.services.map((service, idx) => <div className="cell-price__text" key={idx}>{service.price}$</div>)
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