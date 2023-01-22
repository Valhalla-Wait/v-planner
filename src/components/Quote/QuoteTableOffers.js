import { useState } from "react"
import { numberWithCommas } from "../../utils/numberWithCommas"
import { QuoteCheckBox } from "./QuoteCheckBox"
import { QuoteRadioButton } from "./QuoteRadioButton"

export const QuoteTableOffers = ({ optional, offers, setTotal }) => {
    const [mainOfferActive, setMainOfferActive] = useState(1)
    const [checkBoxToggle, setCheckBoxToggle] = useState([])

    console.log(checkBoxToggle)
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
            {offers.map(offer =>
                <tr key={offer.id} className="inside-light-line">
                    <td className="first">
                            {optional ?
                                <QuoteCheckBox offerId={offer.id} offerPrice={offer.unitPrice} offersActive={checkBoxToggle} setOffer={setCheckBoxToggle} setTotal={setTotal} />
                            :
                                <QuoteRadioButton offerId={offer.id} offerPrice={offer.unitPrice} offerActive={mainOfferActive} setOffer={setMainOfferActive} setTotal={setTotal} />
                            }
                    </td>
                    <td className="grid-table__content second">
                        <div className="grid-table__content-title">{offer.title}</div>
                        <div className="grid-table__content-desc">{offer.description}</div>
                    </td>
                    <td className="third">
                        {offer.qty}
                    </td>
                    <td className="fourth price">
                        ${numberWithCommas(offer.unitPrice)}
                    </td>
                    <td className="fifth price amount">
                        ${numberWithCommas(offer.qty * offer.unitPrice)}
                    </td>
                </tr>
            )}
        </table>
    )
}