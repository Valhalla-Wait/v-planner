import { useState } from "react"

export const QuoteRequisites = ({ quoteNum, date }) => {

    const months = [
        'JAN',
        'FEB',
        'MAR',
        'APR',
        'MAY',
        'JUN',
        'JUL',
        'AUG',
        'SEP',
        'OCT',
        'NOV',
        'DEC',
    ]

    const getDate = () => {
        return `${months[date.getMonth()]} ${date.getDay()}, ${date.getFullYear()}`
    }

    // const newDate = {
    //     day: curDate.getDay(),
    //     month: curDate.getMonth()
    // }
    return (
        <div className="quote__header__data">
            <div className="data_conteiner">
                <div className="data_conteiner__title">QUOTE NUMBER</div>
                {/* <button onClick={setActiveNumberForm(prev => !prev)}> */}
                    {/* {
                        activeNumberForm ?
                        <input type="text" onChange={(e) => {
                           setQuoteData(prev => ({
                            ...prev,
                            quoteNumber: e.currentTarget.value
                           }))
                        }}/>
                    } */}
                    <div className="data_conteiner__value">{quoteNum}</div>
                {/* </button> */}
            </div>
            <div className="data_conteiner">
                <div className="data_conteiner__title">ISSUE DATE</div>
                <div className="data_conteiner__value">{getDate()}</div>
            </div>
        </div>
    )
}