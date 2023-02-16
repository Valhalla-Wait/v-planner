import { useEffect, useState } from "react"
import VendorChat from "../Chat/VendorChat"
import { Link, Navigate, useParams } from "react-router-dom"
import { QuoteBlockInfo } from "../../components/Quote/QuoteInfoBlock"
import { QuoteRequisites } from "../../components/Quote/QuoteRequisites"
import { QuoteComment } from "../../components/Quote/QuoteComment"
import { QuoteLightButton } from "../../components/Quote/QuoteDeclineButton"
import { QuoteBlueButton } from "../../components/Quote/QuoteAcceptButton"
import { QuoteTableOffers } from "../../components/Quote/QuoteTableOffers"
import { numberWithCommas } from "../../utils/numberWithCommas"
import { useDispatch, useSelector } from "react-redux"
import { changeStatusQuote, quoteStatuses } from "../../Store/Actions/quoteActions"

export default function Quote() {

    const { id } = useParams()

    // const [total, setTotal] = useState()
    const [mainOfferPrice, setMainOfferPrice] = useState(0)
    const [optionalOffersPrice, setOptionalOffersPrice] = useState(0)

    const dispatch = useDispatch()
    const currentQuote = useSelector(state => state.currentQuote)

    useEffect(() => {
        if(currentQuote?.status === 'NEW') dispatch(changeStatusQuote(currentQuote.id, quoteStatuses[currentQuote.status].value))
    }, [currentQuote])

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

    if (!currentQuote) return <Navigate to={`/chat`}/>

    return (
        
        <div className="quote">
            <div className="quote__content">
                <div className="conteiner-btn">
                    <Link to={`/quote-form/${currentQuote.clientId}`}>
                        <button className="quote__btn-back">
                            <img className="btn-img" src="./assets/images/icon/arrow-back.svg" />
                            <span className="btn-title">Back</span>
                        </button>
                    </Link>
                </div>

                <div className="quote__form">

                    <div className="quote__header">
                        <img className="mark" src={currentQuote.logo?.url || currentQuote?.logo} />
                        <QuoteRequisites quoteNum={currentQuote.quoteNumber} date={new Date(currentQuote.createDate)} />
                    </div>

                    <div className="quote__offer-data">
                        <div className="section-block">
                            <QuoteBlockInfo title={currentQuote.title} description={currentQuote.description} />

                            <QuoteTableOffers offers={
                                currentQuote.services ?
                                    currentQuote.services.filter((s) => s.serviceType === 'MAIN')
                                :
                                currentQuote.selectedServices.filter((s) => s.serviceType === 'MAIN')
                                } optional={false}  setTotal={setMainOfferPrice} />

                            <QuoteTableOffers offers={
                                currentQuote.services ?
                                currentQuote.services.filter((s) => s.serviceType === 'OPTIONAL')
                            :
                            currentQuote.selectedServices.filter((s) => s.serviceType === 'OPTIONAL')
                            } optional setTotal={setOptionalOffersPrice} />

                            <div className="offer-data__total">
                                <div className="item-conteiner">
                                    <div className="item-conteiner__item">
                                        <div>Subtotal</div>
                                        <div>${numberWithCommas(mainOfferPrice + optionalOffersPrice)}</div>
                                    </div>
                                    <hr />
                                    <div className="item-conteiner__item">
                                        <div>Total</div>
                                        <div className="item__count-bold">${numberWithCommas(mainOfferPrice + optionalOffersPrice)}</div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="section-block">
                        {/* <QuoteBlockInfo title={"Description"} description={currentQuote.description}/> */}
                        <QuoteComment comment={currentQuote.comment} />
                        {
                            !currentQuote.isPreview &&
                            <div className="form_buttons">
                                <Link to='/chat' onClick={() => dispatch(changeStatusQuote(currentQuote.id, quoteStatuses['DECLINED'].value))}>
                                    <QuoteLightButton title="Decline" />
                                </Link>
                                
                                <Link to='/chat'  onClick={() => dispatch(changeStatusQuote(currentQuote.id, quoteStatuses['ACCEPTED'].value))}>
                                    <QuoteBlueButton 
                                    title="Accept Quote" />
                                </Link>
                                
                            </div>
                        }

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
