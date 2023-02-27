import { QuoteBlueButton } from "../../components/Quote/QuoteAcceptButton";
import { QuoteLightButton } from "../../components/Quote/QuoteDeclineButton";
import { QuoteFormInput } from "../../components/QuoteForm/QuoteFormInput";
import Input from "../../components/UI/Input";
import { allowerImageType } from "../../utils/allowedFileTypes";
import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select'
import axios from "axios";
import Button from "../../components/UI/Button";
import { setCurrentQuote } from "../../Store/Actions/quoteActions";

export default function QuoteForm() {

  const dispatch = useDispatch()

  const [src, setSrc] = useState(null);

  // const service = useSelector(state => state.vendorInfo.vendorData.vendorModel.services)[0].name
  const { token } = useSelector((state) => state.vendorInfo);
  const generalServices = useSelector((state) => state.vendorInfo.vendorData.vendorModel.generalServices)
  const individualServices = useSelector((state) => state.vendorInfo.vendorData.vendorModel.individualServices)

  const [selectedServices, setSelectedServices] = useState([])
  const { id } = useParams()
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    generalServiceIds: [generalServices[0].serviceType.id],
    individualServices: [],
    logo: null,
    clientId: Number(id),
    quoteNumber: 0,
    comment: '',
    createDate: new Date().toLocaleString("sv-SE", {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
  })

  useEffect(() =>{
    getClientId()
  }, [])

  const getClientId = async () => {
    const user = await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/clients/getById?id=${id}`,
      headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` }
    })
    setFormData(prev => ({
      ...prev,
      clientId: user.data.result.clientModel.id
    }))
  }

  // useEffect(() => {

  // }, [])

  // const getClientId = async () => {
  //   const client = await axios({
  //     method: "get",
  //     url: `${process.env.REACT_APP_API_URL}/clients/getById?id=${id}`,
  //      headers: {Authorization: `Bearer ${token}` },
  //   })
  //   setFormData(prev => ({
  //     ...prev,
  //     clientId: client?.clientModel?.id
  //   }))
  // }
  
  console.log('formdata', formData)

  // const [vendorServices, setVendorServices] = useState(services.map(s => ({value: s.name, label: s.name})))

  const [offerData, setOfferData] = useState([
    ...individualServices,
    {id: individualServices.length ? individualServices.length+1 : 0, name: '', price: 0}
  ])

  useEffect(() => setOffers(), [offerData])

  const sendQuote = async () => {

    try {
      setOffers()
      dispatch(setCurrentQuote({
        ...formData,
        logo: src,
        createDate: new Date(),
        isPreview: true
      }))
      console.log(formData)
      const reqBody = new FormData();

      const json = JSON.stringify(formData)
      const blob = new Blob([json], {
      type: 'application/json'
      });

      reqBody.append("createQuoteModel",blob);
      reqBody.append("logo", formData.logo);

      const createQuote = await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/quotes/save`,
        data: reqBody,
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
      })
  console.log(reqBody)
      // alert(createQuote)
      // console.log(reqBody)
    } catch (e) {
      console.log(e)
    }
    

    // {
    //   "services": [
    //     {
    //       "id": 1,
    //       "name": "branding",
    //       "price": 2500
    //     },
    //     {
    //       "id": 2,
    //       "name": "flowers",
    //       "price": 3000
    //     }
    //   ],
    //     "clientId": 2,
    //       "comment": "some comment",
    //         "title": "Quote",
    //           "description": "some descs  sdfaer ffdgfd",
    //             "quoteNumber": 228,
    //               "createDate": "2023-01-01 00:00:00"
    // }
  }

  const setTitle = (e) => {
    setFormData(prev => ({
      ...prev,
      title: e
    }))
  }

  const setDesc = (e) => {
    setFormData(prev => ({
      ...prev,
      description: e
    }))
  }

  // const setPrice = (e) => {
  //   setFormData(prev => ({
  //     ...prev,
  //     services: [
  //       {
  //         name: service,
  //         price: e
  //       }
  //     ]
  //   }))
  // }

  const setOffers = () => {
    const filterOffers = offerData.filter(offer => offer.name && offer.price)
    setFormData(prev => ({
      ...prev,
      individualServices: [
        ...filterOffers
      ]
    }))
  }

  const setQuoteNumber = (number) => {
    setFormData(prev => ({
      ...prev,
      quoteNumber: Number(number)
    }))
  }

  const setComment = (text) => {
    setFormData(prev => ({
      ...prev,
      comment: text
    }))
  }

  const setOptionalOffer = (offer) => {
    const index = offerData.findIndex(o => o.id === offer.id)
    const copy = [...offerData]
    copy[index].name = offer.name
    copy[index].price = offer.price
    setOfferData(copy)
  }

  // const setMainOffer = (service) => {
  //   setFormData(prev => ({
  //     ...prev,
  //     services: [
  //       ...prev.services,
  //       {
  //         id: service.id,
  //         name:  service.name,
  //         type: 'main'
  //       }
  //     ]
  //   }))
  // }

  // const setOptionalOffer = (service) => {
  //   setFormData(prev => ({
  //     ...prev,
  //     services: [
  //       ...prev.services,
  //       {
  //         id: service.id,
  //         name: service.name,
  //         type: 'optional'
  //       }
  //     ]
  //   }))
  // }

  const addPhoto = (e) => {
    if (e.target.files && e.target.files.length) {
      var reader = new FileReader();
      reader.onload = function (e) {
        setSrc(e.target.result);
      };
      setFormData(prev => ({
        ...prev,
        logo: e.target.files[0]
      }))
      reader.readAsDataURL(e.target.files[0]);
    }
    // debugger
    setSrc(null);
  };

  console.log(src)
  return (
    <div className="quote-form">

      <div className="section-title">
        Offer
      </div>
      <div className="quote-form_logo">
        <div className="photo-add">
          <label className="photo-add__label">
            <div className="photo-add__header">
              {src ? (
                <img className="photo-add__photo" src={src} alt="" />
              ) : (
                <i className="icon-camera"></i>
              )}
            </div>
            <div className="photo-add__title">Add Logotype</div>
            <Input
              type="file"
              className="photo-add__input"
              accept={allowerImageType}
              onInput={(e) => {
                addPhoto(e)
                console.log(e)
              }}
            />
          </label>
        </div>
        {/* <QuoteLightButton title="Upload New Logo" />
        <button className="delete-logo-btn" onClick={() => setSrc(null)}>
          Delete
        </button> */}
      </div>

      <Input label="Quote number" isValid placeholder="number" onChange={(e) => setQuoteNumber(e.currentTarget.value)} />

      {/* <QuoteFormInput on title="Title" /> */}
      <Input label="Title" isValid placeholder="text" onChange={(e) => setTitle(e.currentTarget.value)} />

      {/* <QuoteFormInput title="Description" /> */}
      <Input label="Description" isValid placeholder="text" onChange={(e) => setDesc(e.currentTarget.value)} />

      <Input label="Comment" isValid placeholder="text" onChange={(e) => setComment(e.currentTarget.value)} />

      {/* <div className="section-title">
        Main Offer
      </div>
      {offerData.map(offer => {
              if(offer.type === 'main') {
                return <div key={offer.id} className="offer-input">
                <QuoteFormInput key={offer.id} title="Main Offer" value={service} isOffer offerCallback={setSelectedServices} selectedServices={selectedServices}/>
            </div>
              }
            })} */}
      {/* <div className="offer-input">
        <QuoteFormInput title="Main Offer" onCallback={setPrice} value={service} isOffer />
      </div> */}

      {/* <div className="add-btn-conteiner">
                <QuoteLightButton callback={() => setOfferData(prev => [
          ...prev,
          {id: offerData.length, title: '', price: 0, type: 'main'}
        ])} title="Add Offer"/>
            </div> */}


      <div className="section-title">
                Optional
            </div>

            
            {offerData.map(offer => <div key={offer.id} className="offer-input">
                <QuoteFormInput key={offer.id} title="Optional" isOffer offerData={offer} offerCallback={setOptionalOffer} selectedServices={offerData}/>
            </div>
              )}
            {/* <div className="offer-input">
                <QuoteFormInput title="Optional" isOffer />
            </div> */}
            
            <div className="add-btn-conteiner">
            <QuoteLightButton callback={() => setOfferData(prev => [
          ...prev,
          {id: offerData.length+1, name: '', price: 0}
        ])} title="Add Optional"/>
            </div>

{/* <Button onClick={sendQuote}>Отправитьсмету</Button> */}
      {/* <Link to={`/quote`}> */}
        <QuoteBlueButton onClick={sendQuote} title="Save" />
      {/* </Link> */}


      <Link to={`/quote`} onClick={() =>
        dispatch(setCurrentQuote({
          ...formData,
          logo: src,
          createDate: new Date(),
          isPreview: true
        }))
      }>
        <QuoteLightButton title="Preview" />
      </Link>
    </div>
  )
}