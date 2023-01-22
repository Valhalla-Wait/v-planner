import { useState } from "react"
import VendorChat from "../Chat/VendorChat"
import { Link } from "react-router-dom"
import { QuoteBlockInfo } from "../../components/Quote/QuoteInfoBlock"
import { QuoteRequisites } from "../../components/Quote/QuoteRequisites"
import { QuoteComment } from "../../components/Quote/QuoteComment"
import { QuoteLightButton } from "../../components/Quote/QuoteDeclineButton"
import { QuoteBlueButton } from "../../components/Quote/QuoteAcceptButton"
import { QuoteTableOffers } from "../../components/Quote/QuoteTableOffers"
import { numberWithCommas } from "../../utils/numberWithCommas"

export default function Quote () {

    const [total, setTotal] = useState(0)

    const [quoteData, setQuoteData] = useState({
        quoteNumber: 0,
        date: '',
        title: '',
        desc: '',
        comment: '',
        subtotal: 0,
        total: 0
    })

    const [quoteOffers, setQuoteOffers] = useState([
        {
            idOffer: 0,
            count: 0,
            price: 0,
            amount: 0
        },
        {
            idOffer: 1,
            count: 0,
            price: 0,
            amount: 0
        },
    ])

    const offers = [
        {
            id: 1,
            title: 'Brand Design (Logo, Colours & Typography)',
            description: 'Crafting a digital branding presence for developing the website and establishing a digital presence.',
            qty: 1,
            unitPrice: 25000,
        },
        {
            id: 2,
            title: 'Brand Design (Logo, Colours & Typography)',
            description: 'Crafting a digital branding presence for developing the website and establishing a digital presence.',
            qty: 1,
            unitPrice: 25000,
        },
        {
            id: 3,
            title: 'Brand Design (Logo, Colours & Typography)',
            description: 'Crafting a digital branding presence for developing the website and establishing a digital presence.',
            qty: 1,
            unitPrice: 25000,
        },
    ]

    return(
        <div className="quote">
            <div className="quote__content">
                <div className="conteiner-btn">
                    <Link to='/quote-form'>
                        <button className="quote__btn-back">
                            <img className="btn-img" src="./assets/images/icon/arrow-back.svg" />
                            <span className="btn-title">Back</span>
                        </button>
                    </Link>
                </div>
                
                <div className="quote__form">

                    <div className="quote__header">
                        <img className="mark" src="./assets/images/quote-mark.png" />
                        <QuoteRequisites quoteNum={quoteData.quoteNumber} date={quoteData.date} setQuoteData={setQuoteData} />
                    </div>
                    
                    <div className="quote__offer-data">
                        <div className="section-block">
                            <QuoteBlockInfo title={"Title"} description={"When couples start thinking about their wedding plans, one of the details that typically first comes to mind is their wedding cake. While wedding cakes serve as the sweet ending to a celebration, dreaming up epic wedding cake ideas is a fun task to undertake as soon as you've set a date and conceptualized a design vision. Fewer wedding planning tasks are more therapeutic than scrolling through images of decadent tiered masterpieces decked out with sugar flowers—and we're here to help you do just that."}/>

                            <QuoteTableOffers offers={offers} setTotal={setTotal} />

                            <QuoteTableOffers offers={offers} optional setTotal={setTotal} />

                            <div className="offer-data__total">
                                <div className="item-conteiner">
                                    <div className="item-conteiner__item">
                                        <div>Subtotal</div>
                                        <div>${numberWithCommas(total)}</div>
                                    </div>
                                    <hr />
                                    <div className="item-conteiner__item">
                                        <div>Total</div>
                                        <div className="item__count-bold">${numberWithCommas(total)}</div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    
                    <div className="section-block">
                    <QuoteBlockInfo title={"Description"} description={"When couples start thinking about their wedding plans, one of the details that typically first comes to mind is their wedding cake. While wedding cakes serve as the sweet ending to a celebration, dreaming up epic wedding cake ideas is a fun task to undertake as soon as you've set a date and conceptualized a design vision. Fewer wedding planning tasks are more therapeutic than scrolling through images of decadent tiered masterpieces decked out with sugar flowers—and we're here to help you do just that."}/>
                        <QuoteComment comment={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'} />
                        <div className="form_buttons">
                            <QuoteLightButton title="Decline"/>
                            <QuoteBlueButton title="Accept Quoto"/>
                        </div>
                    </div>
                    
                    <div className="page-number-conteiner">
                        <div className="page-number__count-info">
                            Page 1 of 1
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
