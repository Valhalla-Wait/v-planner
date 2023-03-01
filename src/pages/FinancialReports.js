import React, { Fragment, useContext, useEffect, useState } from "react"
import Button from "../components/UI/Button"
import { ThemeContext } from "../context/ThemeContext"
import { quoteStatuses } from "../Store/Actions/quoteActions"
import { getQuotes } from "../Store/Actions/getAllQuotes"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { FinancialReportsItem } from "../components/FinancialReportsItem"
import { Chart, ArcElement, Legend, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { Doughnut } from "react-chartjs-2"
import { borderColor } from "@mui/system"
Chart.register(ArcElement, Legend, CategoryScale, LinearScale, PointElement, LineElement)

export default function FinancialReports() {

  const token = localStorage.getItem("token")

  const dispatch = useDispatch()

  const navigate = useNavigate()

  useEffect(() => {
    if (token) dispatch(getQuotes(token))
  }, [])

  const acceptedQuotes = useSelector(state => {
    if (state.quotes.quotesList) {
      return state.quotes.quotesList.filter((quote) => quote.status === quoteStatuses.ACCEPTED.value)
    } else {
      return []
    }
  })

  const declinedQuotes = useSelector(state => {
    if (state.quotes.quotesList) {
      return state.quotes.quotesList.filter((quote) => quote.status === quoteStatuses.DECLINED.value)
    } else {
      return []
    }
  })

  const awaitingQuotes = useSelector(state => {
    if (state.quotes.quotesList) {
      return state.quotes.quotesList.filter((quote) => quote.status === quoteStatuses.VIEWED.value)
    } else {
      return []
    }
  })


  // const [quotes, setQuotes] = useState([])

  // if((quotesList && quotesList.length) && !quotes.length) setQuotes(quotesList)

  const theme = useContext(ThemeContext)

  return (
    <section className="financial-reports">
      <div className="charts">
        {/* <div className="charts__item line">
        <Line
          type="line"
          width={444} height={218}
          // options={{ legend: { display: true, position: "left" } }}
          data={{
            labels: ["12:00", "13:00","14:00","15:00","16:00","17:00","18:00"],
            datasets: [
            {
              label: "Awaiting Acceptence",
              fill: true,
              backgroundColor: "#E7EBFF",
              borderColor: "#E7EBFF",
              data: [20, 6]
            },
            {
              label: "Accepted",
              fill: true,
              backgroundColor: "#43E6D2",
              data: [11, 2]
            },
            {
              label: "Declined",
              fill: true,
              backgroundColor: "#3057E1",
              data: [5, 4]
            },
          ]
          }}
        />
        </div> */}
          <div className="charts__item pie">
          <Doughnut width={300} height={300} 
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'left'
              }
            }
          }}
           data={{
          labels: ["Await", "Accepted", "Declined"],
          datasets: [{
            data: [awaitingQuotes.length, acceptedQuotes.length, declinedQuotes.length],
            backgroundColor: ["#E7EBFF", "#43E6D2", "#3057E1"]
          }
        ]
        }} />
          </div>
        

        
      </div>
      <div className="reports-lists">
        <FinancialReportsItem title={"Awaiting Acceptence"} quotes={awaitingQuotes} />
        <FinancialReportsItem title={"Accepted"} quotes={acceptedQuotes} />
        <FinancialReportsItem title={"Declined"} quotes={declinedQuotes} />
      </div>
    </section>
  )
}