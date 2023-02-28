import React, { Fragment, useContext, useEffect, useState } from "react"
import Button from "../components/UI/Button"
import { ThemeContext } from "../context/ThemeContext"
import { customReactSelectOptions } from "../utils/customReactSelectOptions"
import Select from "react-select"
import { quoteStatuses } from "../Store/Actions/quoteActions"
import { getFormateDate, listMonths } from "../utils/getFormatDate"
import { getQuotes } from "../Store/Actions/getAllQuotes"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export default function ReportsQuote() {

  const token = localStorage.getItem("token")
  const dispatch = useDispatch()

  const navigate = useNavigate()

  useEffect(() => {
    if(token) dispatch(getQuotes(token))
  }, [])

  const quotesList = useSelector(state => {
    if(state.quotes.quotesList) {
      return state.quotes.quotesList
    }else{ 
      return null
    }
  })

  const [quotes, setQuotes] = useState([])

  if((quotesList && quotesList.length) && !quotes.length) setQuotes(quotesList)

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

  const periodsData = {
    'NEW': {
      title: 'Latest',
      value: 'NEW'
    },
    'OLD': {
      title: 'Oldest',
      value: 'OLD'
    }
  }

  const filterReports = (period, status) => {
    if(period) {
      period === periodsData.NEW.value ?
        setQuotes(prev => [...prev].sort((a, b) => new Date(b.createDate) - new Date(a.createDate)))
      :
      setQuotes(prev => [...prev].sort((a, b) => new Date(a.createDate) - new Date(b.createDate)))
    }
    if(status) {
      return setQuotes(prev => [...prev].sort((a,b) => a.status !== status ? 1 : -1))
    }
    
  }

  return (
    <section className="reports shadow">
      <h3 className="reports__title">Reports</h3>
      <div className="reports__header">
        <div className="reports__btns">
          <Button
            className="btn btn-light"
            onClick={() => navigate("/reports")}
          >Sale Reports</Button>
          <Button
            className="btn btn-light active"
            onClick={() => navigate("/quote-reports")}
          >Quotetion reports</Button>
        </div>
        <div className="reports__filter">
          <Select
            placeholder="Period"
            options={[
              { value: periodsData.NEW.value, label: periodsData.NEW.title },
              { value: periodsData.OLD.value, label: periodsData.OLD.title },
            ]}
            isClearable={false}
            isSearchable={false}
            onChange={(e) => filterReports(e.value, null)}
            // {...customReactSelectOptions(theme.get())}
          />
          <Select
            placeholder="Status sorting"
            options={[
              { value: quoteStatuses.NEW.value, label: "New" },
              { value: quoteStatuses.VIEWED.value, label: "Awaiting Acceptance" },
              { value: quoteStatuses.ACCEPTED.value, label: "Accepted" },
              { value: quoteStatuses.DECLINED.value, label: "Declined" },
            ]}
            isClearable={false}
            isSearchable={false}
            onChange={(e) => filterReports(null, e.value)}
            // {...customReactSelectOptions(theme.get())}
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
                        <img src={quote.client.clientModel.photoModel.url} alt={quote.client.firstName} />
                      </div>
                      <div className="cell-company__info">
                        <div className="cell-company__name">{ quote.client.firstName } {quote.client.surname}</div>
                        {/* <div className="cell-company__type">Viewed 13h ago</div> */}
                      </div>
                    </div>
                  </div>
                  <div className="table__cell cell-service">
                    <div className="cell-service__content">{ [...quote.selectedGeneralServices, ...quote.selectedIndividualServices].length } Services</div>
                  </div>
                  <div className="table__cell cell-date">
                    <div className="cell-date__content">
                      <div className="cell-date__text">{ getFormateDate(quote.createDate, listMonths) }</div>
                    </div>
                  </div>
                  <div className="table__cell cell-price">
                    <div className="cell-price__content">{ [...quote.selectedGeneralServices, ...quote.selectedIndividualServices].reduce((sum, service) => sum + service.price, 0) }$</div>
                  </div>
                  <div className="table__cell cell-status">
                    <div className="cell-status__content">
                      <span className={ quote.status === quoteStatuses.VIEWED.value ? "await" : quoteStatuses[quote.status].class }>{ quote.status === quoteStatuses.VIEWED.value ? "Awaiting Acceptance" : quoteStatuses[quote.status].title }</span>
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