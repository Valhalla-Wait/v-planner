import { useContext, useEffect } from "react"
import { ModalContext } from "../../context/ModalContext"
import DeleteAccoutForm from "../Forms/DeleteAccountForm"
import Button from "../UI/Button"
import ModalMiddleContent from "../UI/Modal/ModalMiddleContent"
import { Document, Page } from 'react-pdf';
import axios from "axios"
import { useState } from "react"

const CompareModal = ({ quotes }) => {

  const modal = useContext(ModalContext)
  console.log(quotes)

  const [pdf, setPdf] = useState()

  console.log(localStorage.getItem("token"))

  const getPdf = async () => {

    const reqBody1 = new FormData();
    const reqBody2 = new FormData();

    const obj = {
      createDate: quotes[0].createDate,
      description: quotes[0].description,
      generalServiceIds: quotes[0].selectedGeneralServices.map(service => service.id),
      individualServiceIds: quotes[0].selectedIndividualServices.map(service => service.id),
      photoId: quotes[0].logo.id,
      quoteNumber: quotes[0].quoteNumber,
      title: quotes[0].title,
    }

    const json = JSON.stringify(obj)

    const blob = new Blob([json], {
      type: 'application/json'
      });

    reqBody1.append("createPdfModel", blob);

    // reqBody2.append("createPdfModel", {
    //   createDate: quotes[1].createDate,
    //   description: quotes[1].description,
    //   generalServiceIds: quotes[1].selectedGeneralServices.map(service => service.id),
    //   individualServiceIds: quotes[1].selectedIndividualServices.map(service => service.id),
    //   photoId: quotes[1].logo.id,
    //   quoteNumber: quotes[1].quoteNumber,
    //   title: quotes[1].title,
    // });

    const pdf1 = await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/quotes/create-pdf`,
      data: reqBody1,
      headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem("token")}`}
    })

    console.log(pdf1)
    setPdf(pdf1)
  }

  useEffect(() => {
    getPdf()
  }, [])

  return (
    <ModalMiddleContent>
      <div className="compare-conteiner">
        <span className="compare-title">Compare</span>
        <div className="compare-sections">
            {quotes.map(quote => (
              <div className="compare-sections__section">
                <div className="compare-vendors__vendor">
                  <div className="cell-company__content">
                    <div className="cell-company__img">
                      <img src={quote.vendor.vendorModel.photos[0].url} alt={quote.vendor.companyName} />
                    </div>
                    <div className="cell-company__info">
                      <div className="cell-company__name">{quote.vendor.firstName} {quote.vendor.surname}</div>
                      <div className="cell-company__type">{quote.vendor.vendorModel.companyName}</div>
                    </div>
                  </div>
                </div>
                <div className="compare-pdf">
                {/* <Document file="somefile.pdf" onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
          <Document file="somefile.pdf" onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document> */}
                </div>
              </div>
            ))}

        </div>
      </div>

    </ModalMiddleContent>
  )
}

export default CompareModal