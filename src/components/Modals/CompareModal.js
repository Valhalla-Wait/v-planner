import { useContext, useEffect } from "react"
import { ModalContext } from "../../context/ModalContext"
import DeleteAccoutForm from "../Forms/DeleteAccountForm"
import Button from "../UI/Button"
import ModalCompareContent from "../UI/Modal/ModalCompareContent"
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import axios from "axios"
import { useState } from "react"

const CompareModal = ({ quotes }) => {

  const modal = useContext(ModalContext)
  console.log(quotes)

  const [pdf, setPdf] = useState([])

  console.log(localStorage.getItem("token"))

  const getPdf = async () => {

    const obj1 = {
      createDate: quotes[0].createDate,
      description: quotes[0].description,
      generalServiceIds: quotes[0].selectedGeneralServices.map(service => service.id),
      individualServiceIds: quotes[0].selectedIndividualServices.map(service => service.id),
      photoId: 47, //quotes[0].logo.id
      quoteNumber: quotes[0].quoteNumber,
      title: quotes[0].title,
    }

    const json1 = JSON.stringify(obj1)
    const obj2 = {
      createDate: quotes[1].createDate,
      description: quotes[1].description,
      generalServiceIds: quotes[1].selectedGeneralServices.map(service => service.id),
      individualServiceIds: quotes[1].selectedIndividualServices.map(service => service.id),
      photoId: 47,
      quoteNumber: quotes[1].quoteNumber,
      title: quotes[1].title,
    }

    const json2 = JSON.stringify(obj2)

    const pdf1 = await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/quotes/create-pdf`,
      data: json1,
      responseType: 'arraybuffer',
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` }
    })

    const pdf2 = await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/quotes/create-pdf`,
      data: json2,
      responseType: 'arraybuffer',
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` }
    })

    console.log(pdf1)
    setPdf([{file: {data: pdf1.data}}, {file: {data: pdf2.data}}])
  }

  useEffect(() => {
    getPdf()
  }, [quotes])

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offSet) {
    setPageNumber(prevPageNumber => prevPageNumber + offSet);
  }

  function changePageBack() {
    changePage(-1)
  }

  function changePageNext() {
    changePage(+1)
  }

  return (
    <ModalCompareContent>
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
                {pdf.length && <Document file={pdf[quotes.findIndex(q => q.id === quote.id)].file} onLoadSuccess={onDocumentLoadSuccess}>
                  <Page height="472" width="433" pageNumber={pageNumber} />
                </Document>}
                
              </div>
            </div>
          ))}

        </div>
      </div>
            
    </ModalCompareContent>
  )
}

export default CompareModal