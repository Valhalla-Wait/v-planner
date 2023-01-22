import { useContext } from "react"
import { ModalContext } from "../../context/ModalContext"
import RequestResetPasswordForm from "../Forms/RequestResetPasswordForm"
import Button from "../UI/Button"
import Logo from "../UI/Logo"
import ModalMiddleContent from "../UI/Modal/ModalMiddleContent"
import SignUpUserModal from "./SignUpUserModal"

const RequestResetPasswordModal = ({ goBackCallback }) => {

  const modal = useContext(ModalContext)

  const signUpUser = () => modal.setContent(<SignUpUserModal />)

  return (
    <ModalMiddleContent>
      <div className="middle-modal__header">
        <Logo className="middle-modal__logo"/>
        <h4 className="middle-modal__title">Reset Password</h4>
      </div>
      <div className="middle-modal__body">
        <RequestResetPasswordForm />
        <Button
          className="btn btn-light m-t-8 d-block w-100"
          onClick={goBackCallback}
        >Back to login</Button>
      </div>
      <div className="middle-modal__footer">
        <div>Not a member yet? <span className="middle-modal__link" onClick={signUpUser}>Join now</span></div>
      </div>
    </ModalMiddleContent>
  )
}

export default RequestResetPasswordModal