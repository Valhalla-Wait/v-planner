import { useContext } from "react"
import { ModalContext } from "../../context/ModalContext"
import ChangePasswordForm from "../Forms/ChangePasswordForm"
import Button from "../UI/Button"
import ModalSmallContent from "../UI/Modal/ModalSmallContent"

const ChangePasswordModal = () => {

  const modal = useContext(ModalContext)

  return (
    <ModalSmallContent>
      <div className="small-modal__header">
        <div className="small-modal__icon">
          <img src="/assets/images/lock.png" alt="" />
        </div>
        <div className="small-modal__title">Change Password</div>
      </div>
      <div className="small-modal__body">
        <ChangePasswordForm />
        <Button
          className="btn btn-light m-t-8 d-block w-100"
          onClick={modal.destroy}
        >Cancel</Button>
      </div>
    </ModalSmallContent>
  )
}

export default ChangePasswordModal