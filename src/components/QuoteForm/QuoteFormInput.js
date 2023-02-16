import { useState } from "react"
import { FieldError } from "../UI/FieldError"
import Input from "../UI/Input"
import Select from 'react-select'
import {useSelector} from 'react-redux'

export const QuoteFormInput = ({ title, isOffer, value, offerCallback, selectedServices, ...props }) => {

    const [price, setPrice] = useState(null)
    const [offerData, setOfferData] = useState({
            // id: id,
            // title: e.currentTarget.value,
            // price: 0
    })
    
    const [currentServiceId, setCurrentServiceId] = useState(null)
    const services = useSelector((state) => state.vendorInfo.vendorData.vendorModel.services)

    const setPriceHandler = (e) => {
        setPrice(e.currentTarget.value)
    }

    const isNumber = (n) => {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    const filterServices = () => {
        if (selectedServices) {
            const idsArr = services.map((service) => service.id)
        const selectIds = selectedServices.map((service) => service.id)
        const filter = idsArr.filter(item => !selectIds.includes(item))
        const filteredServices = [...services.filter(service => filter.includes(service.id)).map(s => ({ value: s, label: s.name }))]
        // filteredServices.unshift({value: {name: 'Select service'}, label: 'Select service'})
        return filteredServices
        }else{
            return null
        }
        
      }

    // const filterServices = services.map(s => {
    //     if(selectedServices.find(selectService => selectService.id !== s.id)) return { value: s, label: s.name }         
    // })

    return (
        <div className="text-input">
                <div className="text-input__conteiner">
                    {isOffer ?
                <>
                <div className="text-input__title">
                        {title}
                    </div>
                    <Select
                    {...props}
                    // placeholder="Service"
                    options={filterServices()}
                    isClearable
                    isSearchable={false}
                    // isOptionSelected={(e) => {
                    //     if(e.value.name === 'Select service') offerCallback(prev => [
                    //         ...prev,
                    //         e.value
                    //     ])
                    // }}
                    onChange={(e) => {
                        if(!e) {    
                            const removeService = [...selectedServices]
                            removeService.pop()
                            return offerCallback(prev => {
                                const copy = [...prev]
                                const serviceIndex = copy.findIndex(s => s.id === currentServiceId)
                                copy.splice(serviceIndex, 1)
                                return copy
                            })
                        }
                        // if(e.value.name === 'Select service') return offerCallback([
                        //     {name: 'Select service'}
                        // ])
                        if(e) return offerCallback(prev => {
                            setCurrentServiceId(e.value.id)
                            return [
                                ...prev,
                               { ...e.value,
                                serviceType: title === 'Optional' ? 'OPTIONAL' : 'MAIN'
                                }
                            ]
                        })
                    }}
                />
                </>
                
                :
                <div className="text-input__conteiner">
                    <div className="text-input__title">
                        {title}
                    </div>
                    <div className="text-input__input">
                        <input type="text" value={value} className={isOffer && 'offer-input'} placeholder="text" />
                    </div>
                </div>
            }
                </div>
            {isOffer &&
                <>
                    <div className="text-input__conteiner">
                        <div className="text-input__title">
                            Price
                        </div>
                        <div className="text-input__input">

                            <Input isValid={true} onChange={setPriceHandler} placeholder="number" onBlur={() => {
                                if(price) {
                                    const copy = [...selectedServices]
                                        const findService = copy.find(s => s.id === currentServiceId)
                                        if(findService) {
                                            const serviceIndex = copy.findIndex(s => s.id === findService.id)
                                            copy[serviceIndex].price = Number(price)
                                            return offerCallback(copy)
                                        }
                                    
                                }
                            }} />
                            {/* <input type="text" onChange={setPriceHandler} className="price-input" placeholder="price" /> */}
                        </div>
                        {/* { !isNumber(price) &&  <FieldError text='Only number' /> } */}
                    </div>
                </>}

        </div>
    )
}