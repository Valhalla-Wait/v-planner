import { useContext } from "react"
import { ModalContext } from "../../context/ModalContext"
import DeleteAccoutForm from "../Forms/DeleteAccountForm"
import Button from "../UI/Button"
import ModalSmallContent from "../UI/Modal/ModalSmallContent"

const CompareModal = () => {

  const modal = useContext(ModalContext)

  return (
    <ModalSmallContent>
      <div className="compare-modal">
        <h1>compare</h1>
        <Button
          className="btn btn-light m-t-8 d-block w-100"
          onClick={modal.destroy}
        >Cancel</Button>
      </div>

    </ModalSmallContent>
  )
}

export default CompareModal