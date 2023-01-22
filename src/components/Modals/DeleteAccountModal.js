import { useContext } from "react"
import { ModalContext } from "../../context/ModalContext"
import DeleteAccoutForm from "../Forms/DeleteAccountForm"
import Button from "../UI/Button"
import ModalSmallContent from "../UI/Modal/ModalSmallContent"

const DeleteAccountModal = () => {

  const modal = useContext(ModalContext)

  return (
    <ModalSmallContent>
      <div className="small-modal__header">
        <div className="small-modal__icon">
          <img src="/assets/images/tears.png" alt="" />
        </div>
        <div className="small-modal__title">Delete Account</div>
        <div className="small-modal__subtitle">You will not be able to restore the account after deleting, all data will be lost</div>
      </div>
      <div className="small-modal__body">
        <DeleteAccoutForm />
        <Button
          className="btn btn-light m-t-8 d-block w-100"
          onClick={modal.destroy}
        >Cancel</Button>
      </div>
    </ModalSmallContent>
  )
}

export default DeleteAccountModal