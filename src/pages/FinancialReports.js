import React, { Fragment, useContext, useEffect, useState } from "react"
import Button from "../components/UI/Button"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ThemeContext } from "../context/ThemeContext"
import { quoteStatuses } from "../Store/Actions/quoteActions"
import { getQuotes } from "../Store/Actions/getAllQuotes"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { FinancialReportsItem } from "../components/FinancialReportsItem"
import { Chart, ArcElement, Legend, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { Doughnut } from "react-chartjs-2"
import { borderColor } from "@mui/system"
import { ResponsivePie } from '@nivo/pie'
import { ResponsiveStream } from "@nivo/stream"
import { ResponsiveLine } from "@nivo/line"
import moment from "moment"
import { listMonths } from "../utils/getFormatDate";
Chart.register(ArcElement, Legend, CategoryScale, LinearScale, PointElement, LineElement)

const quoteCategories = {
  Await: {
    title: 'Await',
    color: "#E7EBFF"
  },
  Accepted: {
    title: 'Accepted',
    color: "#43E6D2"
  },
  Declined: {
    title: 'Declined',
    color: "#3057E1"
  }
}

export default function FinancialReports() {

  const token = localStorage.getItem("token")

  const dispatch = useDispatch()

  const navigate = useNavigate()

  useEffect(() => {
    if (token) dispatch(getQuotes(token))
  }, [])

  const allQuotes = useSelector(state => state.quotes.quotesList ? state.quotes.quotesList : [])

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
      return state.quotes.quotesList.filter((quote) => quote.status === quoteStatuses.VIEWED.value || quote.status === quoteStatuses.NEW.value)
    } else {
      return []
    }
  })

  const findQuotesByDate = (quotes, date, sortType) => {

    const formatByType = sortType === 'months' ? "M" : sortType === "years" ? "Y" : "D"

    const findQuotes = quotes.filter(q => {
      if (q.statusChangeDate) return Number(moment(q.statusChangeDate).format(formatByType)) == date

      if (q.statusViewedDate) return Number(moment(q.statusViewedDate).format(formatByType)) == date
    })

    return findQuotes.length
  }

  const getQuotesByCategory = (category) => {
    switch (category) {
      case quoteCategories.Await.title:
        return awaitingQuotes
      case quoteCategories.Accepted.title:
        return acceptedQuotes
      case quoteCategories.Declined.title:
        return declinedQuotes
    }
  }

  console.log(moment(new Date()).format("h:mm"))

  const getDateSortType = () => {

    if(Number(moment(rangeDateFrom).format("Y")) != Number(moment(rangeDateTo).format("Y"))) return 'years'

    if(Number(moment(rangeDateFrom).format("M")) != Number(moment(rangeDateTo).format("M"))) return 'months'

    return 'days'
  } 


  const convertLineQuotesData = (category) => {

    const sortType = getDateSortType()

    const dateFromByType = sortType === 'months' ? Number(moment(rangeDateFrom).format("M")) : 
      sortType === "years" ? Number(moment(rangeDateFrom).format("Y")) :
      Number(moment(rangeDateFrom).format("D"))

    const dateToByType = sortType === 'months' ? Number(moment(rangeDateTo).format("M")) : sortType === "years" ? Number(moment(rangeDateTo).format("Y")) : Number(moment(rangeDateTo).format("D"))

    const datesInRage = []
    
      for (let i = dateFromByType; i <= dateToByType; i++) {
        datesInRage.push({
          label: sortType === 'months' ? listMonths[i-1] : i,
          value: i
        })
      }

    const data = datesInRage.map(date => ({
          "x": date.label,
          "y": findQuotesByDate(getQuotesByCategory(category.title), date.value, sortType)
    }))

    return [{
      "id": category.title,
      "color": category.color,
      "data": data
      
    }]
  }

  const [currentQuotes, setCurrentQuotes] = useState([])
  const [rangeDateFrom, setRangeDateFrom] = useState()
  const [rangeDateTo, setRangeDateTo] = useState()
  

  console.log("currentQuotes",currentQuotes)

  useEffect(() => {
    setCurrentQuotes(convertLineQuotesData(quoteCategories.Await))
  }, [rangeDateFrom, rangeDateTo])

  const setQuotesCategory = (category) => {
    switch (category) {
      case quoteCategories.Await.title:
        return setCurrentQuotes(convertLineQuotesData(quoteCategories.Await))

      case quoteCategories.Accepted.title:
        return setCurrentQuotes(convertLineQuotesData(quoteCategories.Accepted))

      case quoteCategories.Declined.title:
        return setCurrentQuotes(convertLineQuotesData(quoteCategories.Declined))
    }
  }

 

  return (
    <section className="financial-reports">
      <div className="charts">

        {allQuotes.length ?
          <>
            <div className="line-chart">
              {!currentQuotes[0]?.data.length ? 
              <div className="line-chart__err">Quotes not found or incorrect date</div> 
              :
              <ResponsiveLine
              data={currentQuotes}
              //areaBaselineValue={0} //startLine
              margin={{ top: 30, right: 110, bottom: 20, left: 30 }}
              xScale={{ type: 'point' }}
              yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
                stacked: true,
                reverse: false
              }}
              yFormat=" >-.2f"
              curve="monotoneX"
              axisTop={null}
              axisRight={null}
              axisBottom={{
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
              }}
              axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
              }}
              colors={{ datum: 'color' }}


              lineWidth={3}
              enablePoints={false}
              pointSize={10}
              pointColor={{ theme: 'background' }}
              pointBorderWidth={2}
              pointBorderColor={{ from: 'serieColor' }}
              pointLabelYOffset={-12}
              enableArea={true}
              enableGridX={false}
              areaOpacity={1}
              useMesh={true}
              // onClick={(e) => {console.log(e)}}
              legends={[
                {
                  anchor: 'right',
                  direction: 'column',
                  justify: false,
                  translateX: 100,
                  translateY: 0,
                  itemsSpacing: 0,
                  itemDirection: 'left-to-right',
                  itemWidth: 80,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: 'circle',
                  symbolBorderColor: 'rgba(0, 0, 0, .5)',
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        itemBackground: 'rgba(0, 0, 0, .03)',
                        itemOpacity: 1
                      }
                    }
                  ]
                }
              ]}
            />
            }
              
            </div>
            <div className="pie-chart">
              <ResponsivePie
                data={[
                  {
                    id: quoteCategories.Await.title,
                    label: quoteCategories.Await.title,
                    value: awaitingQuotes.length,
                    color: "#E7EBFF"
                  },
                  {
                    id: quoteCategories.Accepted.title,
                    label: quoteCategories.Accepted.title,
                    value: acceptedQuotes.length,
                    color: "#43E6D2"
                  },
                  {
                    id: quoteCategories.Declined.title,
                    label: quoteCategories.Declined.title,
                    value: declinedQuotes.length,
                    color: "#3057E1"
                  },
                ]}
                onClick={(e) => setQuotesCategory(e.label)}
                margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                innerRadius={0.55}
                activeOuterRadiusOffset={8}
                colors={{ datum: 'color' }}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#333333"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{
                  from: 'color',
                  modifiers: [
                    [
                      'darker',
                      2
                    ]
                  ]
                }}
                defs={[
                  {
                    id: quoteCategories.Await.title,
                    type: 'patternDots',
                    background: "#E7EBFF",
                    color: "#E7EBFF",
                    size: 4,
                    padding: 1,
                    stagger: true
                  },
                  {
                    id: quoteCategories.Accepted.title,
                    type: 'patternLines',
                    background: "#43E6D2",
                    color: "#43E6D2",
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                  },
                  {
                    id: quoteCategories.Declined.title,
                    type: 'patternDots',
                    background: "#3057E1",
                    color: "#3057E1",
                    size: 4,
                    padding: 1,
                    stagger: true
                  },
                ]}
                fill={[
                  {
                    match: {
                      id: quoteCategories.Await.title
                    },
                    id: quoteCategories.Await.title
                  },
                  {
                    match: {
                      id: quoteCategories.Accepted.title
                    },
                    id: quoteCategories.Accepted.title
                  },
                  {
                    match: {
                      id: quoteCategories.Declined.title
                    },
                    id: quoteCategories.Declined.title
                  },
                ]}
                enableArcLabels={false}
                enableArcLinkLabels={false}
              />
            </div>



          </>
          :
          "Quotes not found"
        }

      </div>
      <div className="range-celendar">
        <div className="range-celendar__item">
          <DatePicker
            dateFormat="d MMMM yy"
            selected={rangeDateFrom}
            // ref={field.ref}
            onChange={setRangeDateFrom}
            // onBlur={field.onBlur}
            placeholderText="To"
            className="input-control"
          />
        </div>
        <div className="range-celendar__item">
          <DatePicker
            dateFormat="d MMMM yy"
            selected={rangeDateTo}
            // ref={field.ref}
            onChange={setRangeDateTo}
            // onBlur={field.onBlur}
            placeholderText="From"
            className="input-control"
          />
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