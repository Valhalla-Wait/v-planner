import { useState } from "react"

export const QuoteRequisites = ({ quoteNum, date, setQuoteData }) => {
    const [activeNumberForm, setActiveNumberForm] = useState(false)
    const [activeDateForm, setDateNumberForm] = useState(false)
    return (
        <div className="quote__header__data">
            <div className="data_conteiner">
                <div className="data_conteiner__title">QUOTE NUMBER</div>
                <button onClick={setActiveNumberForm(prev => !prev)}>
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
                </button>
            </div>
            <div className="data_conteiner">
                <div className="data_conteiner__title">ISSUE DATE</div>
                <div className="data_conteiner__value">{date}</div>
            </div>
        </div>
    )
}