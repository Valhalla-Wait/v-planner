export const QuoteRadioButton = ({offer, offerId, offerPrice, offerActive, setOffer, setTotal}) => {
    const btnHandler = () => {
        
        setTotal(offerPrice)
        setOffer(offer)
    }
    return (
        <button onClick={btnHandler}>
            {offerActive === offerId ?
                <img src="./assets/images/icon/radio-active.svg" />
                :
                <img src="./assets/images/icon/radio-disabled.svg" />
            }
        </button>
    )
}