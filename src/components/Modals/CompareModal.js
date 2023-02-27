import { useContext, useEffect } from "react"
import { ModalContext } from "../../context/ModalContext"
import DeleteAccoutForm from "../Forms/DeleteAccountForm"
import Button from "../UI/Button"
import ModalSmallContent from "../UI/Modal/ModalSmallContent"
import { Document, Page } from 'react-pdf';
import axios from "axios"

const CompareModal = ({quotes}) => {

  const modal = useContext(ModalContext)

  const getPdf = async() => {

    const reqBody = new FormData();
    reqBody.append("createPdfModel", {});

    const pdf = await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/quotes/create-pdf`,
      data: '',
      headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
  }

  useEffect(() => {

  }, [])

  return (
    <ModalSmallContent>
      <div className="compare-modal">
        <h3>compare</h3>
        <div className="compare-pdf">
          {/* <Document file="somefile.pdf" onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
          <Document file="somefile.pdf" onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document> */}
        </div>
        <Button
          className="btn btn-light m-t-8 d-block w-100"
          onClick={modal.destroy}
        >Cancel</Button>
      </div>

    </ModalSmallContent>
  )
}

export default CompareModal