import { useState } from "react"
import { FieldError } from "../UI/FieldError"
import Input from "../UI/Input"

export const QuoteFormInput = ({ title, isOffer, value, onCallback }) => {

    const [price, setPrice] = useState(0)

    const setPriceHandler = (e) => {
        setPrice(e.currentTarget.value)
    }

    const isNumber = (n) => {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    return (
        <div className="text-input">
            <div className="text-input__conteiner">
                <div className="text-input__title">
                    {title}
                </div>
                <div className="text-input__input">
                    <input type="text" value={value} className={isOffer && 'offer-input'} placeholder="text" />
                </div>
            </div>

            {isOffer &&
                <>
                    <div className="text-input__conteiner">
                        <div className="text-input__title">
                            Price
                        </div>
                        <div className="text-input__input">

                            <Input isValid={!isNumber(price)} error='Only number' onChange={setPriceHandler} placeholder="number" onBlur={(e) => onCallback(e.currentTarget.value)}/>
                            {/* <input type="text" onChange={setPriceHandler} className="price-input" placeholder="price" /> */}
                        </div>
                        {/* { !isNumber(price) &&  <FieldError text='Only number' /> } */}
                    </div>
                </>}

        </div>
    )
}