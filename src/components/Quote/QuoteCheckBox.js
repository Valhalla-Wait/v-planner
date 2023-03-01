export const QuoteCheckBox = ({offer, offerId, offerPrice, offersActive, setOffer, setTotal}) => {

    console.log(offersActive, offerId)
    const toggleHandler = () => {
        if(offersActive.find(offer => offer === offerId)) {
            setTotal(prev => prev - offerPrice)
            setOffer(prev => [...prev].filter(offer => offer !== offerId))
        }else{
            setTotal(prev => prev + offerPrice)
            setOffer(prev => [...prev, offerId])
        }
    }
    

    return (
        <button onClick={toggleHandler}>
            {offersActive.find(offer => offer === offerId) ?
                <img src="./assets/images/icon/check-active.svg" />
                :
                <img src="./assets/images/icon/check-disabled.svg" />
            }
        </button>
    )
}