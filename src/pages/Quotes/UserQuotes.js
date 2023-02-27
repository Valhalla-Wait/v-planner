import React, { Fragment, useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import CompareModal from "../../components/Modals/CompareModal"
import Button from "../../components/UI/Button"
import { ModalContext } from "../../context/ModalContext"
import useDevice from "../../hooks/useDevice"
import { getQuotes } from "../../Store/Actions/getAllQuotes"
import { quoteStatuses } from "../../Store/Actions/quoteActions"
import { getFormateDate, listMonths } from "../../utils/getFormatDate"

export default function UserQuotes() {

  const dispatch = useDispatch()

  const token = localStorage.getItem("token")

  const modal = useContext(ModalContext);

  const [compareQuotes, setCompareQuotes] = useState([])

  useEffect(() => {
    if(token) dispatch(getQuotes(token))
  }, [])

  const quoteList = useSelector(state => {
    if(state.quotes.quotesList.length) {
      const filteredQuotes = state.quotes.quotesList.filter((quote) => quote.status === 'NEW' || quote.status === 'VIEWED')
      if (filteredQuotes.length) return filteredQuotes
      else return []
    }
    return state.quotes.quotesList
  })

  const [quotes, setQuotes] = useState([])

  if((quoteList && quoteList.length) && !quotes.length) setQuotes(quoteList)

  const navigate = useNavigate()
  const device = useDevice()

  const statusData = {
    1: {
      title: "NEW",
      class: "new"
    },
    2: {
      title: "VIEWED",
      class: "viewed"
    },
    3: {
      title: "ACCEPTED",
      class: "accepted"
    },
    4: {
      title: "DECLINED",
      class: "declined"
    }
  }

  const toggleOpen = id => {
    setQuotes(quotes.map(quote => quote.id === id ? {...quote, open: !quote.open} : quote ))
    // debugger
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

  debugger

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
          onClick={()=>{
            modal.start();
            modal.setContent(<CompareModal quotes={compareQuotes}/>);
          }}
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
            quotes.map(quote => (
              <Fragment  key={quote.id}>
                <div className={ quotes.find(q => q.id === quote.id)?.open ? "table__row active" : "table__row" }>
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
                        <input onClick={
                          () => {
                          // const find = compareQuotes.find(q => q.id === quote.id)                          
                          // if(find && compareQuotes.length < 2) return setCompareQuotes(prev => [...prev, quote.id]) 
                          // else{
                          //   const index = compareQuotes.findIndex(q => q.id === quote.id)
                          //   const copy = [...compareQuotes]
                          //   copy.splice(index, 1)
                          //   setCompareQuotes(copy)
                          // }
                        }
                        } className="check__input" type="checkbox" />
                        <span className="check__box"></span>
                      </label>
                    </div>
                  </div>
                  <div className="table__cell cell-company">
                    <div className="cell-company__content">
                      <div className="cell-company__img">
                        <img src={quote.vendor.vendorModel.photos[0].url} alt={quote.vendor.companyName} />
                      </div>
                      <div className="cell-company__info">
                        <div className="cell-company__name">{quote.vendor.firstName} {quote.vendor.surname}</div>
                        <div className="cell-company__type">{ quote.vendor.vendorModel.companyName }</div>
                      </div>
                    </div>
                  </div>
                  <div className="table__cell cell-service">
                    <div className="cell-service__content">{ [...quote.selectedGeneralServices, ...quote.selectedIndividualServices].length } Services</div>
                  </div>
                  <div className="table__cell cell-date">
                    <div className="cell-date__content">
                      {
                        !device.isMobile && <div className="cell-date__text">{ getFormateDate(quote.createDate, listMonths) }</div>
                      }
                    </div>
                  </div>
                  <div className="table__cell cell-price">
                    <div className="cell-price__content">{ [...quote.selectedGeneralServices, ...quote.selectedIndividualServices].reduce((sum, service) => sum + service.price, 0) }$</div>
                  </div>
                  <div className="table__cell cell-status">
                    <div className="cell-status__content">
                      <span className={ quoteStatuses[quote.status].class }>{ quoteStatuses[quote.status].title }</span>
                    </div>
                  </div>
                  <div className="table__cell cell-chat">
                    <Link to={`/chat/${quote.vendor.id}`}>
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
                  <div className="table__cell"></div>
                  <div className="table__cell">
                    {
                      device.isMobile && <div className="cell-service__text">{ [...quote.selectedGeneralServices, ...quote.selectedIndividualServices].length } Services</div>
                    }
                    {
                      
                      [...quote.selectedGeneralServices, ...quote.selectedIndividualServices].map((service, idx) => <div className="cell-service__text" key={idx}>{service.name}</div>)
                    }
                  </div>
                  <div className="table__cell">
                    <div className="cell-date__text">{ device.isMobile && getFormateDate(quote.createDate, listMonths) }</div>
                  </div>
                  <div className="table__cell">
                    {
                      device.isMobile && <div className="cell-price__text">{ quote.price }$</div>
                    }
                    {
                     [...quote.selectedGeneralServices, ...quote.selectedIndividualServices].map((service, idx) => <div className="cell-price__text" key={idx}>{service.price}$</div>)
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