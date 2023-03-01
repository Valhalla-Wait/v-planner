import { useEffect, useState } from "react"
import { numberWithCommas } from "../../utils/numberWithCommas"
import { QuoteCheckBox } from "./QuoteCheckBox"
import { QuoteRadioButton } from "./QuoteRadioButton"

export const QuoteTableOffers = ({ setOffer, optional, offers, setTotal }) => {

    console.log(offers)
    // debugger

    const [mainOfferActive, setMainOfferActive] = useState( offers.length && !optional ? offers[0].id : 0)
    const [checkBoxToggle, setCheckBoxToggle] = useState([])

    useEffect(() => {
        // console.log(offers.find(offer => offer.id === mainOfferActive))
        // debugger
        setTotal((prev) => {
            const findMainOffer = offers ? offers.find(offer => offer.id === mainOfferActive) : false
            if(findMainOffer) {
                return findMainOffer.price
            }else{
                return prev
            }
        })
    }, [mainOfferActive])

    useEffect(() => {
        setOffer(checkBoxToggle)
    }, [checkBoxToggle])

    useEffect(() => {
        setOffer(mainOfferActive)
    }, [mainOfferActive])

    console.log(checkBoxToggle, mainOfferActive)
    
    return (
        <table className="grid-table">
            <tr className="grid-table__title">
                <td className="grid-table__title__item first">
                    {optional ? 'OPTIONAL' : 'MAIN OFFERS'}
                </td>
                <td className="grid-table__title__item second">
                </td>
                <td className="grid-table__title__item third">
                    QTY
                </td>
                <td className="grid-table__title__item fourth">
                    UNIT PRICE
                </td>
                <td className="grid-table__title__item fifth">
                    AMOUNT
                </td>
            </tr>
            {offers && offers.map(offer =>
                <tr key={offer.id} className="inside-light-line">
                    <td className="first">
                            {optional ?
                                <QuoteCheckBox offerId={offer.id} offerPrice={offer.price} offer={offer} offersActive={checkBoxToggle} setOffer={setCheckBoxToggle} setTotal={setTotal} />
                            :
                                <QuoteRadioButton offer={offer} offerId={offer.id} offerPrice={offer.price} offerActive={mainOfferActive} setOffer={setMainOfferActive} setTotal={setTotal} />
                            }
                    </td>
                    <td className="grid-table__content second">
                        <div className="grid-table__content-title">{offer.name}</div>
                        {/* <div className="grid-table__content-desc">{offer.description}</div> */}
                    </td>
                    <td className="third">
                        {/* {offer.qty} */}
                        1
                    </td>
                    <td className="fourth price">
                        ${numberWithCommas(offer.price)}
                    </td>
                    <td className="fifth price amount">
                        {/* ${numberWithCommas(offer.qty * offer.price)} */}
                        ${numberWithCommas(offer.price)}
                    </td>
                </tr>
            )}
        </table>
    )
}