import { QuoteBlueButton } from "../../components/Quote/QuoteAcceptButton";
import { QuoteLightButton } from "../../components/Quote/QuoteDeclineButton";
import { QuoteFormInput } from "../../components/QuoteForm/QuoteFormInput";
import Input from "../../components/UI/Input";
import { allowerImageType } from "../../utils/allowedFileTypes";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom"
import { useSelector } from "react-redux";
import axios from "axios";
import Button from "../../components/UI/Button";

export default function QuoteForm() {

  const [src, setSrc] = useState(null);

  const service = useSelector(state => state.vendorInfo.vendorData.vendorModel.services)[0].name
  const { token } = useSelector((state) => state.vendorInfo);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    services: [
      {
        name: service,
        price: 0
      }
    ],
    clientId: 2,
    quoteNumber: 228,
    comment: 'some comment',
    createDate: new Date().toLocaleString("sv-SE", {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
  })

  // const [vendorServices, setVendorServices] = useState(services.map(s => ({value: s.name, label: s.name})))

  const sendQuote = async () => {

    try {


      const reqBody = new FormData();

      const json = JSON.stringify(formData)
      const blob = new Blob([json], {
      type: 'application/json'
      });

      reqBody.append("createQuoteModel",blob);
      reqBody.append("logo", src);

      const chatRoomData = await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/quotes/save`,
        data: reqBody,
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
      })
  
      alert(chatRoomData)
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

  const setPrice = (e) => {
    setFormData(prev => ({
      ...prev,
      services: [
        {
          name: service,
          price: e
        }
      ]
    }))
  }

  const setOptionalOffer = (e) => {
    setFormData(prev => ({
      ...prev,
      title: [
        ...prev.optionalOffers,
        {
          id: 2,
          name: 'asd2',
        }
      ]
    }))
  }

  const addPhoto = (e) => {
    if (e.target.files && e.target.files.length) {
      var reader = new FileReader();
      reader.onload = function (e) {
        setSrc(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
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
            <Input
              type="file"
              className="photo-add__input"
              accept={allowerImageType}
              onInput={addPhoto}
            />
          </label>
        </div>
        <QuoteLightButton title="Upload New Logo" />
        <button className="delete-logo-btn" onClick={() => setSrc(null)}>
          Delete
        </button>
      </div>

      {/* <QuoteFormInput on title="Title" /> */}
      <Input label="Title" placeholder="text" onChange={(e) => setTitle(e.currentTarget.value)} />

      {/* <QuoteFormInput title="Description" /> */}
      <Input label="Description" placeholder="text" onChange={(e) => setDesc(e.currentTarget.value)} />

      <div className="section-title">
        Main Offer
      </div>

      <div className="offer-input">
        <QuoteFormInput title="Main Offer" onCallback={setPrice} value={service} isOffer />
      </div>

      {/* <div className="add-btn-conteiner">
                <QuoteLightButton title="Add Offer"/>
            </div> */}


      {/* <div className="section-title">
                Optional
            </div>

            <div className="offer-input">
                <QuoteFormInput title="Optional" isOffer />
            </div>
            
            <div className="add-btn-conteiner">
            <QuoteLightButton title="Add Optional"/>
            </div> */}

<Button onClick={sendQuote}>Отправитьсмету</Button>
      <Link to="/quote">
        <QuoteBlueButton onClick={sendQuote} title="Save" />
      </Link>


      <Link to="/quote">
        <QuoteLightButton title="Preview" />
      </Link>


    </div>
  )
}